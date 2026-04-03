export type ProductBadge = "bestseller" | "new";

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  priceCents: number;
  category: "cookies" | "mixes" | "snacks";
  imageUrl: string;
  imageAlt: string;
  badge?: ProductBadge;
};

export type CartLine = {
  productId: string;
  quantity: number;
};
