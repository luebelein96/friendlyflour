"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product-card";
import { ProductQuickView } from "@/components/product-quick-view";
import { useProductCatalog } from "@/context/product-catalog-context";

export function FeaturedProductsHome() {
  const { products, featuredProductIds } = useProductCatalog();
  const [quick, setQuick] = useState<Product | null>(null);

  const featured = useMemo(() => {
    return featuredProductIds
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, [products, featuredProductIds]);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-[var(--color-border)] pb-10 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Shop</p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-[var(--color-ink)] sm:text-4xl lg:text-[2.75rem]">
              Fan favorites
            </h2>
            <p className="mt-3 max-w-lg text-base text-[var(--color-ink-muted)]">
              Crowd-pleasers that sell out first—start here, then explore
              everything in the pantry.
            </p>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-1 text-sm font-bold text-[var(--color-ink)] transition hover:text-[var(--color-accent)]"
          >
            View all
            <span
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>
        <div className="mt-12 flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-6">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuick}
            />
          ))}
        </div>
      </section>
      <ProductQuickView product={quick} onClose={() => setQuick(null)} />
    </>
  );
}
