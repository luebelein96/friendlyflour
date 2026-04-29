import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site-config";
import { ShopClient } from "./shop-client";

const shopDescription =
  "Shop friendly flour in Austin, Texas: gluten-free cookies, baking mixes, and snacks. Dairy-free and vegan options available.";

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
