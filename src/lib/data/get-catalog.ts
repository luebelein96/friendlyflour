import { cache } from "react";
import {
  MENU_FAVORITES_COLUMNS,
  type MenuFavoriteColumn,
} from "@/lib/data/menu-favorites";
import type { Product } from "@/types/product";
import {
  buildCatalogMaps,
  fetchSquareCatalogObjects,
  type SquareCatalogMaps,
} from "@/lib/square/catalog-api";
import { hasSquareCredentials } from "@/lib/square/env";
import { applyInventoryToProducts } from "@/lib/square/inventory";
import { buildFilterCategories, mapsToProducts } from "@/lib/square/map-to-products";
import {
  defaultFeaturedProductIds,
  localProducts,
  staticFilterCategories,
} from "@/lib/data/products.local";

export type ProductCatalogPayload = {
  products: Product[];
  categories: { id: string; label: string }[];
  /** Always the hardcoded homepage menu (`MENU_FAVORITES_COLUMNS`). */
  menuFavorites: MenuFavoriteColumn[];
  featuredProductIds: string[];
  source: "square" | "local";
};

function resolveFeaturedIds(products: Product[]): string[] {
  const raw = process.env.NEXT_PUBLIC_FEATURED_CATALOG_IDS?.trim();
  if (raw) {
    const ids = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const valid = ids.filter((id) => products.some((p) => p.id === id));
    if (valid.length > 0) return valid;
  }
  const fromDefault = defaultFeaturedProductIds.filter((id) =>
    products.some((p) => p.id === id)
  );
  if (fromDefault.length > 0) return fromDefault;
  return products.slice(0, 4).map((p) => p.id);
}

function fromLocal(): ProductCatalogPayload {
  return {
    products: localProducts,
    categories: staticFilterCategories,
    menuFavorites: MENU_FAVORITES_COLUMNS,
    featuredProductIds: resolveFeaturedIds(localProducts),
    source: "local",
  };
}

async function payloadFromSquareMaps(
  maps: SquareCatalogMaps
): Promise<ProductCatalogPayload> {
  const { products: mapped, categoryLabels } = mapsToProducts(maps);
  const products = await applyInventoryToProducts(mapped);
  return {
    products,
    categories: buildFilterCategories(products, categoryLabels),
    menuFavorites: MENU_FAVORITES_COLUMNS,
    featuredProductIds: resolveFeaturedIds(products),
    source: "square",
  };
}

/** Server-only: load catalog from Square when `SQUARE_ACCESS_TOKEN` is set, else local mock data. */
export const loadProductCatalog = cache(async function loadProductCatalog(): Promise<ProductCatalogPayload> {
  if (!hasSquareCredentials()) {
    return fromLocal();
  }
  try {
    const byId = await fetchSquareCatalogObjects();
    const maps = buildCatalogMaps(byId);
    if (maps.variations.length === 0) {
      console.warn(
        "[catalog] Square returned no priced item variations — falling back to local data."
      );
      return fromLocal();
    }
    return await payloadFromSquareMaps(maps);
  } catch (err) {
    console.error("[catalog] Square catalog fetch failed:", err);
    return fromLocal();
  }
});
