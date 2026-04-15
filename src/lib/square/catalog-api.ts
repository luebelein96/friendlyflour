import { logSquareResponse } from "./debug-log";
import { getSquareApiBaseUrl } from "./env";

/** Square Catalog API — list items with related variations, categories, images. */
const SQUARE_VERSION = "2024-10-17";

export type CatalogObject = {
  type?: string;
  id?: string;
  is_deleted?: boolean;
  item_data?: {
    name?: string;
    description?: string;
    /** Square may return full `CatalogObject` entries here, not only `{ id }` refs. */
    variations?: CatalogObject[];
    categories?: { id?: string }[];
    image_ids?: string[];
  };
  item_variation_data?: {
    item_id?: string;
    name?: string;
    track_inventory?: boolean;
    location_overrides?: {
      location_id?: string;
      sold_out?: boolean;
      track_inventory?: boolean;
    }[];
    price_money?: { amount?: bigint | number; currency?: string };
  };
  category_data?: {
    name?: string;
  };
  image_data?: {
    url?: string;
    caption?: string;
  };
};

type SearchResponse = {
  objects?: CatalogObject[];
  related_objects?: CatalogObject[];
  cursor?: string;
};

function toAmountCents(amount: bigint | number | string | undefined): number | null {
  if (amount === undefined || amount === null) return null;
  const n =
    typeof amount === "bigint"
      ? Number(amount)
      : typeof amount === "string"
        ? Number(amount)
        : amount;
  if (!Number.isFinite(n)) return null;
  return Math.round(n);
}

/** Flatten paginated catalog search into a single id → object map. */
export async function fetchSquareCatalogObjects(): Promise<Map<string, CatalogObject>> {
  const token = process.env.SQUARE_ACCESS_TOKEN?.trim();
  if (!token) throw new Error("SQUARE_ACCESS_TOKEN is not set");

  const base = getSquareApiBaseUrl();
  const map = new Map<string, CatalogObject>();
  let cursor: string | undefined;
  let page = 0;

  do {
    /** Request all types needed for shop rows: items, sellable variations, categories, images. */
    const body: Record<string, unknown> = {
      object_types: ["ITEM", "ITEM_VARIATION", "CATEGORY", "IMAGE"],
      include_related_objects: true,
    };
    if (cursor) body.cursor = cursor;

    const res = await fetch(`${base}/v2/catalog/search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Square-Version": SQUARE_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Square catalog/search ${res.status}: ${errText}`);
    }

    const data = (await res.json()) as SearchResponse;
    page += 1;
    logSquareResponse(`catalog/search page ${page} (response)`, {
      requestCursor: cursor ?? null,
      responseCursor: data.cursor ?? null,
      objectsCount: data.objects?.length ?? 0,
      relatedObjectsCount: data.related_objects?.length ?? 0,
      body: data,
    });
    for (const obj of data.objects ?? []) {
      if (obj.id) map.set(obj.id, obj);
    }
    for (const obj of data.related_objects ?? []) {
      if (obj.id) map.set(obj.id, obj);
    }
    cursor = data.cursor;
  } while (cursor);

  return map;
}

export type SquareCatalogMaps = {
  byId: Map<string, CatalogObject>;
  /** Resolved sellable rows: one per item variation with price. */
  variations: {
    variationId: string;
    itemId: string;
    name: string;
    shortDescription: string;
    description: string;
    priceCents: number;
    categoryId: string | null;
    imageUrl: string | null;
    imageAlt: string;
    /** Square: variation tracks stock at locations */
    trackInventory: boolean;
    /** Sold out for the configured location (from location_overrides). */
    locationSoldOut: boolean;
  }[];
  /** Square category id → display name */
  categoryNames: Map<string, string>;
};

/** Square often nests full ITEM_VARIATION objects under `item_data.variations` without duplicating them in `related_objects`. */
function mergeEmbeddedVariations(byId: Map<string, CatalogObject>): void {
  for (const [, obj] of byId) {
    if (obj.type !== "ITEM" || !obj.item_data?.variations?.length) continue;
    for (const v of obj.item_data.variations) {
      if (!v?.id) continue;
      const hasData =
        v.type === "ITEM_VARIATION" ||
        Boolean(v.item_variation_data);
      if (!hasData) continue;
      const existing = byId.get(v.id);
      if (!existing || (!existing.item_variation_data && v.item_variation_data)) {
        byId.set(v.id, v);
      }
    }
  }
}

function getConfiguredSquareLocationId(): string | undefined {
  return (
    process.env.SQUARE_LOCATION_ID?.trim() ||
    process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID?.trim() ||
    undefined
  );
}

/** Square location ids are case-insensitive; catalog and env may differ in casing. */
export function normalizeSquareLocationId(id: string | undefined): string {
  return (id ?? "").trim().toUpperCase();
}

type LocationOverride = NonNullable<
  NonNullable<CatalogObject["item_variation_data"]>["location_overrides"]
>[number];

function soldOutFromLocationOverrides(
  overrides: LocationOverride[] | undefined,
  configuredLocationId: string | undefined
): boolean {
  const list = overrides ?? [];
  if (list.length === 0) return false;

  const configured = normalizeSquareLocationId(configuredLocationId);
  if (configured) {
    const match = list.find(
      (o) => normalizeSquareLocationId(o?.location_id) === configured
    );
    return match?.sold_out === true;
  }

  /* No location in env: if Square only sent one override, use it (single-location setups). */
  if (list.length === 1 && list[0]?.sold_out === true) return true;

  return false;
}

export function buildCatalogMaps(byId: Map<string, CatalogObject>): SquareCatalogMaps {
  mergeEmbeddedVariations(byId);

  const configuredLocationId = getConfiguredSquareLocationId();

  const categoryNames = new Map<string, string>();
  for (const [, obj] of byId) {
    if (obj.type === "CATEGORY" && obj.id && obj.category_data?.name) {
      categoryNames.set(obj.id, obj.category_data.name);
    }
  }

  const variations: SquareCatalogMaps["variations"] = [];

  for (const [, obj] of byId) {
    if (obj.is_deleted) continue;
    if (obj.type !== "ITEM" || !obj.id || !obj.item_data) continue;
    const itemId = obj.id;
    const itemName = obj.item_data.name?.trim() || "Item";
    const description = (obj.item_data.description ?? "").trim();
    const shortDescription =
      description.length > 160 ? `${description.slice(0, 157)}…` : description || itemName;

    const variationRefs = obj.item_data.variations ?? [];
    for (const ref of variationRefs) {
      const vid = ref.id;
      if (!vid) continue;
      let vObj = byId.get(vid);
      if (
        (!vObj || vObj.type !== "ITEM_VARIATION") &&
        ref.type === "ITEM_VARIATION" &&
        ref.item_variation_data
      ) {
        vObj = ref;
      }
      if (!vObj || vObj.type !== "ITEM_VARIATION" || vObj.is_deleted) continue;
      const vd = vObj.item_variation_data;
      const priceCents = toAmountCents(vd?.price_money?.amount);
      if (priceCents === null) continue;

      const varLabel = vd?.name?.trim();
      const displayName =
        variationRefs.length > 1 && varLabel
          ? `${itemName} — ${varLabel}`
          : itemName;

      const catIds = obj.item_data.categories ?? [];
      const categoryId = catIds[0]?.id ?? null;

      let imageUrl: string | null = null;
      const imageIds = obj.item_data.image_ids ?? [];
      for (const imgId of imageIds) {
        const img = imgId ? byId.get(imgId) : undefined;
        const url = img?.image_data?.url;
        if (url) {
          imageUrl = url;
          break;
        }
      }

      const trackInventory = vd?.track_inventory === true;
      const locationSoldOut = soldOutFromLocationOverrides(
        vd?.location_overrides,
        configuredLocationId
      );

      variations.push({
        variationId: vid,
        itemId,
        name: displayName,
        shortDescription,
        description: description || shortDescription,
        priceCents,
        categoryId,
        imageUrl,
        imageAlt: displayName,
        trackInventory,
        locationSoldOut,
      });
    }
  }

  return { byId, variations, categoryNames };
}
