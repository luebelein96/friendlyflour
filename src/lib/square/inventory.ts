import { logSquareResponse } from "./debug-log";
import { getSquareApiBaseUrl } from "./env";

const SQUARE_VERSION = "2024-10-17";

type InventoryCount = {
  catalog_object_id?: string;
  state?: string;
  quantity?: string;
};

type BatchRetrieveResponse = {
  counts?: InventoryCount[];
  errors?: unknown[];
};

function getSquareLocationId(): string | undefined {
  return (
    process.env.SQUARE_LOCATION_ID?.trim() ||
    process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID?.trim() ||
    undefined
  );
}

/** Sum IN_STOCK quantities per catalog variation id at the given location(s). */
export async function fetchInStockQuantities(
  catalogObjectIds: string[],
  locationIds: string[]
): Promise<Map<string, number>> {
  const token = process.env.SQUARE_ACCESS_TOKEN?.trim();
  if (!token || catalogObjectIds.length === 0 || locationIds.length === 0) {
    return new Map();
  }

  const base = getSquareApiBaseUrl();
  const totals = new Map<string, number>();

  const chunkSize = 100;
  for (let i = 0; i < catalogObjectIds.length; i += chunkSize) {
    const chunk = catalogObjectIds.slice(i, i + chunkSize);
    const chunkIndex = Math.floor(i / chunkSize) + 1;
    const res = await fetch(`${base}/v2/inventory/counts/batch-retrieve`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Square-Version": SQUARE_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location_ids: locationIds,
        catalog_object_ids: chunk,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn(
        `[inventory] batch-retrieve ${res.status}:`,
        errText.slice(0, 200)
      );
      logSquareResponse(
        `inventory/counts/batch-retrieve chunk ${chunkIndex} (error response)`,
        { status: res.status, bodyText: errText }
      );
      continue;
    }

    const data = (await res.json()) as BatchRetrieveResponse;
    logSquareResponse(
      `inventory/counts/batch-retrieve chunk ${chunkIndex} (response)`,
      {
        locationIds,
        catalogObjectIds: chunk,
        body: data,
      }
    );
    for (const row of data.counts ?? []) {
      const id = row.catalog_object_id;
      if (!id || row.state !== "IN_STOCK") continue;
      const q = Number.parseInt(String(row.quantity ?? "0"), 10);
      if (!Number.isFinite(q)) continue;
      totals.set(id, (totals.get(id) ?? 0) + q);
    }
  }

  return totals;
}

/**
 * For Square products that track inventory: set `stockQuantity` from IN_STOCK counts
 * and `soldOut` when quantity is 0 (or missing). Location sold-out overrides get
 * `stockQuantity: 0` without an extra API call.
 * Requires `SQUARE_LOCATION_ID` or `NEXT_PUBLIC_SQUARE_LOCATION_ID`.
 */
export async function applyInventoryToProducts<
  T extends {
    id: string;
    tracksInventory?: boolean;
    soldOut?: boolean;
    stockQuantity?: number;
    locationSoldOut?: boolean;
  },
>(products: T[]): Promise<T[]> {
  const locationId = getSquareLocationId();
  if (!locationId) return products;

  /** Catalog `location_overrides.sold_out` wins over raw inventory counts. */
  const toFetch = products.filter(
    (p) => p.tracksInventory === true && !p.locationSoldOut
  );
  const ids = toFetch.map((p) => p.id);
  const qtyById =
    ids.length > 0 ? await fetchInStockQuantities(ids, [locationId]) : new Map();

  return products.map((p) => {
    if (!p.tracksInventory) {
      return p.locationSoldOut
        ? { ...p, soldOut: true, stockQuantity: 0 }
        : p;
    }
    if (p.locationSoldOut) {
      return { ...p, stockQuantity: 0, soldOut: true };
    }
    const qty = qtyById.get(p.id) ?? 0;
    return {
      ...p,
      stockQuantity: qty,
      soldOut: qty <= 0,
    };
  });
}

export { getSquareLocationId };
