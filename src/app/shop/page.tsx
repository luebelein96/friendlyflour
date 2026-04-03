import type { Metadata } from "next";
import { ShopClient } from "./shop-client";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Gluten-free cookies, baking mixes, and snacks from friendly flour. Filter by category and add to cart.",
};

export default function ShopPage() {
  return <ShopClient />;
}
