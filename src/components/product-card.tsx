"use client";

import Image from "next/image";
import type { Product } from "@/types/product";
import { useCart } from "@/context/cart-context";
import { formatUsd } from "@/lib/format";

type Props = {
  product: Product;
  onQuickView: (product: Product) => void;
};

export function ProductCard({ product, onQuickView }: Props) {
  const { addProduct } = useCart();

  const openQuickView = () => onQuickView(product);

  return (
    <article className="group flex flex-row items-stretch gap-3 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-[0_1px_0_rgba(12,12,12,0.04)] transition duration-300 md:flex-col md:gap-0 md:p-0 md:hover:-translate-y-0.5 md:hover:shadow-[var(--shadow-card-hover)]">
      <button
        type="button"
        onClick={openQuickView}
        className="flex min-w-0 flex-1 cursor-pointer gap-3 rounded-xl text-left outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[var(--color-brand-red)] md:w-full md:flex-col md:gap-0 md:rounded-none md:ring-offset-0"
      >
        <div className="relative h-[5.25rem] w-[5.25rem] shrink-0 overflow-hidden rounded-xl bg-[var(--color-tan)] md:aspect-square md:h-auto md:w-full md:rounded-none">
          <Image
            src={product.imageUrl}
            alt={product.imageAlt}
            fill
            className="object-cover transition duration-500 md:group-hover:scale-[1.03]"
            sizes="(max-width: 767px) 84px, (max-width: 1024px) 50vw, 25vw"
          />
          {product.badge ? (
            <span className="absolute left-1 top-1 rounded-[var(--radius-sm)] bg-[var(--color-surface)]/95 px-1 py-0.5 text-[7px] font-bold uppercase tracking-wide text-[var(--color-ink)] ring-1 ring-black/[0.06] backdrop-blur-sm md:left-2 md:top-2 md:px-2 md:py-1 md:text-[10px] md:tracking-wider">
              {product.badge === "bestseller" ? "Best seller" : "New"}
            </span>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 py-0.5 md:gap-0 md:p-5 md:pt-4">
          <div className="min-w-0">
            <h3 className="text-[0.8125rem] font-semibold leading-snug tracking-tight text-[var(--color-ink)] sm:text-sm md:text-[0.95rem]">
              {product.name}
            </h3>
            <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-[var(--color-ink-muted)] md:mt-2 md:text-sm md:leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          <span className="text-sm font-bold tabular-nums text-[var(--color-gold)] md:mt-4 md:text-base md:text-[var(--color-ink)]">
            {formatUsd(product.priceCents)}
          </span>
        </div>
      </button>

      <div className="flex w-[2.25rem] shrink-0 flex-col justify-end gap-2 md:w-full md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-3 md:px-5 md:pb-5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            addProduct(product.id, 1);
          }}
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full md:rounded-full bg-[var(--color-brand-red)] text-white transition hover:bg-[var(--color-brand-red-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-red)] active:scale-[0.98] md:h-auto md:min-h-[3.25rem] md:w-full md:justify-center md:rounded-full md:px-5 md:py-4"
          aria-label={`Add ${product.name} to cart`}
        >
          <span className="font-mono text-lg leading-none md:hidden" aria-hidden>
            +
          </span>
          <span className="hidden font-mono text-base font-medium tracking-wide md:inline">
            Add to cart
          </span>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openQuickView();
          }}
          className="hidden min-h-12 cursor-pointer items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-transparent text-[var(--color-ink)] transition hover:border-[var(--color-ink)]/25 hover:bg-black/[0.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-red)] md:inline-flex md:min-h-[3.25rem] md:max-w-[8.5rem] md:shrink-0 md:px-3 md:py-4 md:text-xs md:font-semibold md:leading-tight"
        >
          Quick view
        </button>
      </div>
    </article>
  );
}
