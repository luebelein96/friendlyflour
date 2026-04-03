"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/context/cart-context";
import { getProductById } from "@/lib/data/products";
import { formatUsd } from "@/lib/format";

export function CartDrawer() {
  const {
    lines,
    isOpen,
    closeCart,
    setQuantity,
    removeLine,
    itemCount,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const subtotalCents = lines.reduce((sum, line) => {
    const p = getProductById(line.productId);
    if (!p) return sum;
    return sum + p.priceCents * line.quantity;
  }, 0);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-[var(--color-ink)]/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
        onClick={closeCart}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-5">
          <h2 className="font-display text-lg font-medium text-[var(--color-ink)]">
            Cart
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-[var(--radius-sm)] p-2 text-[var(--color-ink-muted)] transition hover:bg-black/[0.04] hover:text-[var(--color-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            aria-label="Close cart"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {itemCount === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-sm text-[var(--color-ink-muted)]">
                Your cart is empty. Add something delicious.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="font-mono mt-6 rounded-full bg-[var(--color-sky)] px-6 py-2.5 text-sm font-medium tracking-wide text-white transition hover:bg-[var(--color-sky-hover)]"
              >
                Browse the shop
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map((line) => {
                const product = getProductById(line.productId);
                if (!product) return null;
                return (
                  <li
                    key={line.productId}
                    className="flex gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-cream)]/50 p-3"
                  >
                    <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-[var(--color-tan)]">
                      <Image
                        src={product.imageUrl}
                        alt={product.imageAlt}
                        fill
                        className="object-cover"
                        sizes="72px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-snug text-[var(--color-ink)]">
                        {product.name}
                      </p>
                      <p className="mt-0.5 text-sm tabular-nums text-[var(--color-ink-muted)]">
                        {formatUsd(product.priceCents)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)]">
                          <button
                            type="button"
                            className="px-2.5 py-1 text-lg leading-none text-[var(--color-ink)] transition hover:bg-black/[0.04]"
                            onClick={() =>
                              setQuantity(line.productId, line.quantity - 1)
                            }
                            aria-label={`Decrease ${product.name}`}
                          >
                            −
                          </button>
                          <span className="min-w-[1.5rem] text-center text-xs font-bold tabular-nums">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            className="px-2.5 py-1 text-lg leading-none text-[var(--color-ink)] transition hover:bg-black/[0.04]"
                            onClick={() =>
                              setQuantity(line.productId, line.quantity + 1)
                            }
                            aria-label={`Increase ${product.name}`}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLine(line.productId)}
                          className="text-xs font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {itemCount > 0 ? (
          <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-ink-muted)]">Subtotal</span>
              <span className="text-base font-bold tabular-nums text-[var(--color-ink)]">
                {formatUsd(subtotalCents)}
              </span>
            </div>
            <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
              Shipping &amp; tax calculated at checkout.
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="font-mono mt-4 flex w-full items-center justify-center rounded-full bg-[var(--color-sky)] py-3 text-sm font-medium tracking-wide text-white transition hover:bg-[var(--color-sky-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
            >
              Checkout
            </Link>
          </div>
        ) : null}
      </aside>
    </>
  );
}
