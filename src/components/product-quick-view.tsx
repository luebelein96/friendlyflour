"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/cart-context";
import { formatUsd } from "@/lib/format";

type Props = {
  product: Product | null;
  onClose: () => void;
};

export function ProductQuickView({ product, onClose }: Props) {
  const { addProduct } = useCart();

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  useEffect(() => {
    document.body.style.overflow = product ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-[var(--color-ink)]/50 backdrop-blur-sm"
        aria-label="Close quick view"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl sm:max-h-[85vh] sm:rounded-[var(--radius-lg)]"
      >
        <div className="relative aspect-[5/4] w-full shrink-0 bg-[var(--color-tan)] sm:aspect-[16/10]">
          <Image
            src={product.imageUrl}
            alt={product.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 512px"
            priority
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-[var(--radius-sm)] bg-[var(--color-surface)]/95 p-2 text-[var(--color-ink)] shadow-md ring-1 ring-black/[0.06] transition hover:bg-[var(--color-surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-red)]"
            aria-label="Close"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto p-6">
          {product.badge ? (
            <span className="mb-2 inline-flex w-fit rounded-[var(--radius-sm)] bg-[var(--color-cream)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-ink)] ring-1 ring-[var(--color-border)]">
              {product.badge === "bestseller" ? "Best seller" : "New"}
            </span>
          ) : null}
          <h2
            id="quick-view-title"
            className="font-display text-2xl font-medium tracking-tight text-[var(--color-ink)]"
          >
            {product.name}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">
            {product.description}
          </p>
          <p className="mt-5 text-xl font-bold tabular-nums text-[var(--color-ink)]">
            {formatUsd(product.priceCents)}
          </p>
        </div>
        <div className="sticky bottom-0 border-t border-[var(--color-border)] bg-[var(--color-surface)]/95 p-4 backdrop-blur-md sm:static sm:border-0 sm:bg-transparent sm:p-6 sm:pt-0">
          <button
            type="button"
            onClick={() => {
              addProduct(product.id, 1);
              onClose();
            }}
            className="w-full cursor-pointer rounded-full bg-[var(--color-brand-red)] py-3.5 font-mono text-sm font-medium tracking-wide text-white transition hover:bg-[var(--color-brand-red-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-red)]"
          >
            Add to cart — {formatUsd(product.priceCents)}
          </button>
        </div>
      </div>
    </div>
  );
}
