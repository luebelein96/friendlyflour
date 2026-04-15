export type ProductBadge = "bestseller" | "new";

/** `category` is a Square category id, or a legacy slug when using local fallback data. */
export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  priceCents: number;
  category: string;
  imageUrl: string;
  imageAlt: string;
  badge?: ProductBadge;
  /** Square: variation uses inventory tracking */
  tracksInventory?: boolean;
  /** On-hand count at the configured location when tracking inventory (from Square IN_STOCK counts) */
  stockQuantity?: number;
  /**
   * Square catalog `item_variation_data.location_overrides[].sold_out` for this shop’s location.
   * Kept separate so inventory counts never override this flag.
   */
  locationSoldOut?: boolean;
  /** True when out of stock / sold out (Square overrides + inventory counts) */
  soldOut?: boolean;
};

export type CartLine = {
  productId: string;
  quantity: number;
};
