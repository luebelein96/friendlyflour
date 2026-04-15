import type { Product } from "@/types/product";
import type { SquareCatalogMaps } from "./catalog-api";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80";

function slugify(name: string, id: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  const tail = id.replace(/[^a-z0-9]/gi, "").slice(-8);
  return `${base || "item"}-${tail || id.slice(0, 8)}`;
}

export function mapsToProducts(maps: SquareCatalogMaps): {
  products: Product[];
  categoryLabels: Map<string, string>;
} {
  const { variations, categoryNames } = maps;
  const categoryLabels = new Map(categoryNames);

  const products: Product[] = variations.map((v) => {
    const categoryKey = v.categoryId ?? "uncategorized";
    if (!categoryLabels.has(categoryKey)) {
      categoryLabels.set(categoryKey, "Other");
    }

    return {
      id: v.variationId,
      slug: slugify(v.name, v.variationId),
      name: v.name,
      shortDescription: v.shortDescription,
      description: v.description,
      priceCents: v.priceCents,
      category: categoryKey,
      imageUrl: v.imageUrl ?? PLACEHOLDER_IMAGE,
      imageAlt: v.imageAlt,
      tracksInventory: v.trackInventory,
      locationSoldOut: v.locationSoldOut,
      soldOut: v.locationSoldOut,
    };
  });

  return { products, categoryLabels };
}

export function buildFilterCategories(
  products: Product[],
  categoryLabels: Map<string, string>
): { id: string; label: string }[] {
  const seen = new Set<string>();
  const rest: { id: string; label: string }[] = [];
  for (const p of products) {
    if (seen.has(p.category)) continue;
    seen.add(p.category);
    rest.push({
      id: p.category,
      label: categoryLabels.get(p.category) ?? p.category,
    });
  }
  rest.sort((a, b) => a.label.localeCompare(b.label));
  return [{ id: "all", label: "All" }, ...rest];
}
