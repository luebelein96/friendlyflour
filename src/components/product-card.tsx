"use client";

import Image from "next/image";
import type { Product } from "@/types/product";
import { useCart } from "@/context/cart-context";
import { formatUsd } from "@/lib/format";

type Props = {
  product: Product;
  onQuickView?: (product: Product) => void;
};

export function ProductCard({ product, onQuickView }: Props) {
  const { addProduct } = useCart();

  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_1px_0_rgba(12,12,12,0.04)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]">
      <button
        type="button"
        onClick={() => onQuickView?.(product)}
        className="relative aspect-square w-full cursor-pointer overflow-hidden bg-[var(--color-tan)] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-red)]"
        aria-label={`Quick view ${product.name}`}
      >
        <Image
          src={product.imageUrl}
          alt={product.imageAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.badge ? (
          <span className="absolute left-2 top-2 rounded-[var(--radius-sm)] bg-[var(--color-surface)]/95 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-[var(--color-ink)] ring-1 ring-black/[0.06] backdrop-blur-sm sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px] sm:tracking-wider">
            {product.badge === "bestseller" ? "Best seller" : "New"}
          </span>
        ) : null}
      </button>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="text-xs font-semibold leading-snug tracking-tight text-[var(--color-ink)] sm:text-[0.95rem]">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-[var(--color-ink-muted)] sm:mt-2 sm:text-sm sm:leading-relaxed">
          {product.shortDescription}
        </p>
        <div className="mt-2 flex flex-wrap items-baseline gap-2 sm:mt-4">
          <span className="text-sm font-bold tabular-nums text-[var(--color-ink)] sm:text-base">
            {formatUsd(product.priceCents)}
          </span>
        </div>
        <div className="mt-3 flex flex-col gap-1.5 sm:mt-4 sm:flex-row sm:gap-2">
          <button
            type="button"
            onClick={() => addProduct(product.id, 1)}
            className="flex-1 cursor-pointer rounded-full bg-[var(--color-brand-red)] py-2 font-mono text-[11px] font-medium tracking-wide text-white transition hover:bg-[var(--color-brand-red-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-red)] sm:py-2.5 sm:text-sm"
          >
            Add to cart
          </button>
          {onQuickView ? (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="cursor-pointer rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-transparent px-2 py-2 text-[11px] font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-ink)]/25 hover:bg-black/[0.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-red)] sm:px-4 sm:py-2.5 sm:text-sm"
            >
              Quick view
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
