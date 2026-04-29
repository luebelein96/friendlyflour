"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/cart-context";
import { useProductCatalog } from "@/context/product-catalog-context";
import { ProductImagePlaceholder } from "@/components/product-image-placeholder";
import { track } from "@/lib/analytics";
import { formatUsd } from "@/lib/format";
import { hasProductImage } from "@/lib/product-image";

export function CheckoutForm() {
  const { getProductById } = useProductCatalog();
  const { lines, clearCart } = useCart();
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    void track("begin_checkout", {
      currency: "USD",
      items: lines.map((l) => ({ item_id: l.productId, quantity: l.quantity })),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lineDetails = useMemo(() => {
    return lines
      .map((line) => {
        const p = getProductById(line.productId);
        if (!p) return null;
        return { line, product: p };
      })
      .filter(Boolean) as { line: (typeof lines)[0]; product: NonNullable<ReturnType<typeof getProductById>> }[];
  }, [getProductById, lines]);

  const subtotalCents = lineDetails.reduce(
    (sum, { line, product }) => sum + product.priceCents * line.quantity,
    0
  );

  const discountCents = promoApplied ? Math.round(subtotalCents * 0.1) : 0;
  const totalCents = Math.max(0, subtotalCents - discountCents);

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <p className="font-display text-3xl text-[var(--color-ink)]">
          Order received (demo)
        </p>
        <p className="mt-3 text-[var(--color-ink-muted)]">
          Thanks for playing along. When Square is wired up, this becomes a real
          confirmation page.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex rounded-[var(--radius-sm)] bg-[var(--color-brand-red)] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-red-hover)]"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  if (lineDetails.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <p className="font-display text-2xl text-[var(--color-ink)]">
          Your cart is empty
        </p>
        <p className="mt-2 text-[var(--color-ink-muted)]">
          Add something delicious before checking out.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex rounded-[var(--radius-sm)] bg-[var(--color-ink)] px-8 py-3 text-sm font-semibold text-[var(--color-surface)] transition hover:opacity-90"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <p className="eyebrow">Secure checkout</p>
      <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-[var(--color-ink)] sm:text-4xl">
        Checkout
      </h1>
      <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
        Front-end preview — call{" "}
        <code className="rounded-[var(--radius-sm)] bg-[var(--color-surface)] px-1.5 py-0.5 text-xs ring-1 ring-[var(--color-border)]">
          createSquareOrder
        </code>{" "}
        from a server action after tokenizing the card with Square&apos;s Web Payments SDK.
      </p>

      <form
        className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]"
        onSubmit={(e) => {
          e.preventDefault();
          void track("purchase", {
            currency: "USD",
            value: subtotalCents / 100,
            items: lineDetails.map(({ line, product }) => ({
              item_id: product.id,
              item_name: product.name,
              item_category: product.category,
              price: product.priceCents / 100,
              quantity: line.quantity,
            })),
          });
          clearCart();
          setPlaced(true);
        }}
      >
        <div className="space-y-10">
          <fieldset className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_1px_0_rgba(12,12,12,0.04)]">
            <legend className="px-1 font-display text-lg text-[var(--color-ink)]">
              Contact
            </legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="email" className="text-sm font-medium text-[var(--color-ink)]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-1 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none ring-[var(--color-brand-red)] focus:ring-2"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone" className="text-sm font-medium text-[var(--color-ink)]">
                  Phone <span className="font-normal text-[var(--color-ink-muted)]">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="mt-1 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none ring-[var(--color-brand-red)] focus:ring-2"
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_1px_0_rgba(12,12,12,0.04)]">
            <legend className="px-1 font-display text-lg text-[var(--color-ink)]">
              Shipping address
            </legend>
            <div className="mt-4 grid gap-4">
              <div>
                <label htmlFor="fullName" className="text-sm font-medium text-[var(--color-ink)]">
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  required
                  autoComplete="name"
                  className="mt-1 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none ring-[var(--color-brand-red)] focus:ring-2"
                />
              </div>
              <div>
                <label htmlFor="line1" className="text-sm font-medium text-[var(--color-ink)]">
                  Address line 1
                </label>
                <input
                  id="line1"
                  name="line1"
                  required
                  autoComplete="address-line1"
                  className="mt-1 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none ring-[var(--color-brand-red)] focus:ring-2"
                />
              </div>
              <div>
                <label htmlFor="line2" className="text-sm font-medium text-[var(--color-ink)]">
                  Apartment, suite, etc. <span className="font-normal text-[var(--color-ink-muted)]">(optional)</span>
                </label>
                <input
                  id="line2"
                  name="line2"
                  autoComplete="address-line2"
                  className="mt-1 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none ring-[var(--color-brand-red)] focus:ring-2"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="city" className="text-sm font-medium text-[var(--color-ink)]">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    required
                    autoComplete="address-level2"
                    className="mt-1 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none ring-[var(--color-brand-red)] focus:ring-2"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="text-sm font-medium text-[var(--color-ink)]">
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    required
                    autoComplete="address-level1"
                    className="mt-1 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none ring-[var(--color-brand-red)] focus:ring-2"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="postal" className="text-sm font-medium text-[var(--color-ink)]">
                    ZIP / Postal code
                  </label>
                  <input
                    id="postal"
                    name="postal"
                    required
                    autoComplete="postal-code"
                    className="mt-1 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none ring-[var(--color-brand-red)] focus:ring-2"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="text-sm font-medium text-[var(--color-ink)]">
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    required
                    autoComplete="country-name"
                    defaultValue="United States"
                    className="mt-1 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none ring-[var(--color-brand-red)] focus:ring-2"
                  />
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_1px_0_rgba(12,12,12,0.04)]">
            <legend className="px-1 font-display text-lg text-[var(--color-ink)]">
              Payment <span className="text-sm font-normal text-[var(--color-ink-muted)]">(mock)</span>
            </legend>
            <p className="mt-2 text-xs text-[var(--color-ink-muted)]">
              Production: replace this block with Square&apos;s{" "}
              <a
                href="https://developer.squareup.com/docs/web-payments/overview"
                className="font-medium text-[var(--color-brand-red)] underline decoration-[var(--color-brand-red)]/30 underline-offset-2 hover:decoration-[var(--color-brand-red)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                Web Payments SDK
              </a>{" "}
              to tokenize the card, then charge on the server with the Payments API.
            </p>
            <div className="mt-4 grid gap-4">
              <div>
                <label htmlFor="cardName" className="text-sm font-medium text-[var(--color-ink)]">
                  Name on card
                </label>
                <input
                  id="cardName"
                  name="cardName"
                  autoComplete="cc-name"
                  className="mt-1 w-full rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] bg-[var(--color-cream)]/60 px-3 py-2.5 text-sm outline-none"
                  placeholder="As shown on card"
                />
              </div>
              <div>
                <label htmlFor="cardNumber" className="text-sm font-medium text-[var(--color-ink)]">
                  Card number
                </label>
                <input
                  id="cardNumber"
                  name="cardNumber"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  className="mt-1 w-full rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] bg-[var(--color-cream)]/60 px-3 py-2.5 text-sm outline-none"
                  placeholder="4242 4242 4242 4242"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="exp" className="text-sm font-medium text-[var(--color-ink)]">
                    Expiry
                  </label>
                  <input
                    id="exp"
                    name="exp"
                    autoComplete="cc-exp"
                    className="mt-1 w-full rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] bg-[var(--color-cream)]/60 px-3 py-2.5 text-sm outline-none"
                    placeholder="MM / YY"
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="text-sm font-medium text-[var(--color-ink)]">
                    CVC
                  </label>
                  <input
                    id="cvc"
                    name="cvc"
                    autoComplete="cc-csc"
                    className="mt-1 w-full rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] bg-[var(--color-cream)]/60 px-3 py-2.5 text-sm outline-none"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit space-y-6">
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
            <h2 className="font-display text-lg font-medium text-[var(--color-ink)]">
              Order summary
            </h2>
            <ul className="mt-4 space-y-4">
              {lineDetails.map(({ line, product }) => (
                <li key={line.productId} className="flex gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-[var(--color-tan)]">
                    {hasProductImage(product.imageUrl) ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.imageAlt}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <ProductImagePlaceholder compact />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug text-[var(--color-ink)]">
                      {product.name}
                    </p>
                    <p className="text-xs text-[var(--color-ink-muted)]">
                      Qty {line.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-[var(--color-ink)]">
                    {formatUsd(product.priceCents * line.quantity)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-[var(--color-border)] pt-4">
              <label htmlFor="promo" className="text-sm font-medium text-[var(--color-ink)]">
                Promo code
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="promo"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  className="min-w-0 flex-1 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-2 text-sm outline-none ring-[var(--color-brand-red)] focus:ring-2"
                  placeholder="TRYKINDSTATE"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (promo.trim().toUpperCase() === "TRYKINDSTATE") {
                      setPromoApplied(true);
                    }
                  }}
                  className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-cream)]"
                >
                  Apply
                </button>
              </div>
              {promoApplied ? (
                <p className="mt-2 text-xs font-medium text-[var(--color-sage-dark)]">
                  10% off applied (demo code)
                </p>
              ) : null}
            </div>
            <dl className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between text-[var(--color-ink-muted)]">
                <dt>Subtotal</dt>
                <dd>{formatUsd(subtotalCents)}</dd>
              </div>
              {promoApplied ? (
                <div className="flex justify-between text-[var(--color-sage-dark)]">
                  <dt>Discount</dt>
                  <dd>−{formatUsd(discountCents)}</dd>
                </div>
              ) : null}
              <div className="flex justify-between border-t border-[var(--color-border)] pt-3 text-base font-semibold text-[var(--color-ink)]">
                <dt>Total</dt>
                <dd>{formatUsd(totalCents)}</dd>
              </div>
            </dl>
            <button
              type="submit"
              className="mt-6 w-full rounded-[var(--radius-sm)] bg-[var(--color-brand-red)] py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-red-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-red)]"
            >
              Place order
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}
