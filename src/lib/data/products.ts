/**
 * @deprecated Prefer `useProductCatalog()` or `loadProductCatalog()` for the live catalog.
 */
export {
  defaultFeaturedProductIds,
  localCategoryLabels,
  localProducts,
  staticFilterCategories,
} from "@/lib/data/products.local";

/** @deprecated Use `useProductCatalog().featuredProductIds` */
export { defaultFeaturedProductIds as featuredProductIds } from "@/lib/data/products.local";

import { localProducts } from "@/lib/data/products.local";

/** @deprecated Use catalog from context */
export const products = localProducts;
