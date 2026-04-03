import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site-config";
import { ShopClient } from "./shop-client";

const shopDescription =
  "Gluten-free cookies, baking mixes, and snacks from friendly flour. Filter by category and add to cart.";

export const metadata: Metadata = {
  title: "Shop",
  description: shopDescription,
  alternates: { canonical: "/shop" },
  openGraph: {
    url: absoluteUrl("/shop"),
    title: "Shop | friendly flour",
    description: shopDescription,
  },
};

export default function ShopPage() {
  return <ShopClient />;
}
