"use client";

import { useMemo, useState } from "react";
import { categories, products } from "@/lib/data/products";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product-card";
import { ProductQuickView } from "@/components/product-quick-view";
import { useCart } from "@/context/cart-context";

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

/** Curated order for “Featured”; anything else sorts after by array order in products.ts */
const FEATURED_ORDER = [
  "p-cc-cookies",
  "p-blueberry-cheesecake-bun",
  "p-blueberry-cheesecake-bar",
  "p-pizza-dough-mix",
  "p-vanilla-cake-mix",
  "p-strawberry-muffin-mix",
  "p-plain-bagel",
  "p-sesame-bagel",
  "p-cheddar-bagel",
  "p-jalapeno-cheddar-bagel",
  "p-pizza",
  "p-cinnamon-rolls",
  "p-cookie-dough-rolls",
  "p-brownie-cookies",
  "p-hamburger-buns",
  "p-ciabatta-rolls",
  "p-white-bread",
  "p-biscuits",
] as const;

function featuredRank(id: string): number {
  const i = FEATURED_ORDER.indexOf(id as (typeof FEATURED_ORDER)[number]);
  return i === -1 ? 10_000 : i;
}

export function ShopClient() {
  const { itemCount, openCart } = useCart();
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [quick, setQuick] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const list =
      category === "all"
        ? [...products]
        : products.filter((p) => p.category === category);

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
  }, [category, sort]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <header className="max-w-2xl border-b border-[var(--color-border)] pb-10">
          <p className="eyebrow">Current Items</p>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-[var(--color-ink)] sm:text-5xl">
            The shop
          </h1>
          <p className="mt-4 text-base text-[var(--color-ink-muted)] sm:text-lg">
            Mixes, cookies, and snacks—each one gluten-free and made to make you
            smile mid-bite.
          </p>
        </header>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
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
          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-muted)]">
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
