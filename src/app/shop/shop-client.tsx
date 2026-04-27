"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product-card";
import { ProductQuickView } from "@/components/product-quick-view";
import { useCart } from "@/context/cart-context";
import { useProductCatalog } from "@/context/product-catalog-context";

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

export function ShopClient() {
  const { products, featuredProductIds } = useProductCatalog();
  const { itemCount, openCart } = useCart();
  const [sort, setSort] = useState<SortKey>("featured");
  const [quick, setQuick] = useState<Product | null>(null);

  const featuredRank = useMemo(() => {
    const order: string[] = [];
    for (const id of featuredProductIds) {
      if (!order.includes(id)) order.push(id);
    }
    for (const p of products) {
      if (!order.includes(p.id)) order.push(p.id);
    }
    const rank = new Map(order.map((id, i) => [id, i]));
    return (id: string) => rank.get(id) ?? 10_000;
  }, [featuredProductIds, products]);

  const filtered = useMemo(() => {
    const list = [...products];

    if (sort === "price-asc") {
      list.sort((a, b) => a.priceCents - b.priceCents);
    } else if (sort === "price-desc") {
      list.sort((a, b) => b.priceCents - a.priceCents);
    } else if (sort === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list.sort((a, b) => featuredRank(a.id) - featuredRank(b.id));
    }
    return list;
  }, [sort, products, featuredRank]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-12 font-dm-sans sm:px-6 sm:py-16 lg:px-8">
        <header className="max-w-2xl border-b border-[var(--color-border)] pb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-red)]/75 sm:text-xs">
            Current Items
          </p>
          <h1 className="mt-4 max-w-[min(100%,28rem)] text-[clamp(1.625rem,4.2vw,2.5rem)] font-bold leading-[1.18] tracking-tight text-[var(--color-brand-red)] sm:max-w-2xl">
            The shop
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-lg">
            This is what gluten-free baking is supposed to taste like.
          </p>
        </header>

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-end">
          {/* Category filters (categoryLabels) — hidden for now
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter by category"
          >
            {categories.map((c) => {
              const active = category === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={`cursor-pointer rounded-[var(--radius-sm)] px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.06em] transition ${
                    active
                      ? "bg-[var(--color-brand-red)] text-white"
                      : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-brand-red)]/35"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
          */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="sort"
              className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-red)]/75 sm:text-xs"
            >
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm font-semibold text-[var(--color-ink)] outline-none ring-[var(--color-brand-red)] focus:ring-2"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 pb-24 md:grid md:grid-cols-2 md:gap-5 md:pb-12 lg:grid-cols-3 lg:gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuick}
            />
          ))}
        </div>
      </div>
      {itemCount > 0 ? (
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-[var(--color-border)] bg-[var(--color-surface)]/95 p-3 backdrop-blur-xl sm:hidden">
          <button
            type="button"
            onClick={openCart}
            className="font-mono flex w-full items-center justify-center rounded-full bg-[var(--color-brand-red)] py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-[var(--color-brand-red-hover)] active:scale-[0.99]"
          >
            View cart · {itemCount} {itemCount === 1 ? "item" : "items"}
          </button>
        </div>
      ) : null}
      <ProductQuickView product={quick} onClose={() => setQuick(null)} />
    </>
  );
}
