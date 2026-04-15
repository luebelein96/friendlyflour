import type { Product } from "@/types/product";

const UNLIMITED = Number.MAX_SAFE_INTEGER;

/** Upper bound on how many units can be in the cart for this product (stock-limited or sold out). */
export function maxPurchasableQuantity(product: Product): number {
  if (product.soldOut || product.locationSoldOut) return 0;
  if (product.tracksInventory && typeof product.stockQuantity === "number") {
    return Math.max(0, product.stockQuantity);
  }
  return UNLIMITED;
}

export function canAddMore(product: Product, inCart: number): boolean {
  return inCart < maxPurchasableQuantity(product);
}
