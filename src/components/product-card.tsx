"use client";

import Image from "next/image";
import type { Product } from "@/types/product";
import { ProductImagePlaceholder } from "@/components/product-image-placeholder";
import { useCart } from "@/context/cart-context";
import { track } from "@/lib/analytics";
import { formatUsd } from "@/lib/format";
import { hasProductImage } from "@/lib/product-image";
import { soldOutCtaInlineStyle } from "@/lib/cta-sold-out-style";
import { canAddMore, maxPurchasableQuantity } from "@/lib/product-stock";

type Props = {
  product: Product;
  onQuickView: (product: Product) => void;
};

export function ProductCard({ product, onQuickView }: Props) {
  const { addProduct, lines } = useCart();
  const inCart =
    lines.find((l) => l.productId === product.id)?.quantity ?? 0;
  const maxQty = maxPurchasableQuantity(product);
  const soldOut = maxQty <= 0;
  const atStockLimit = !soldOut && !canAddMore(product, inCart);
  const unavailable = soldOut || atStockLimit;

  const openQuickView = () => onQuickView(product);
  const showImage = hasProductImage(product.imageUrl);
  const price = product.priceCents / 100;

  return (
    <article className="group flex flex-row items-center gap-3 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-[0_1px_0_rgba(12,12,12,0.04)] transition duration-300 md:flex-col md:items-stretch md:gap-0 md:p-0 md:hover:-translate-y-0.5 md:hover:shadow-[var(--shadow-card-hover)]">
      <button
        type="button"
        onClick={() => {
          void track("select_item", {
            item_list_id: "shop",
            item_list_name: "Shop",
            items: [
              {
                item_id: product.id,
                item_name: product.name,
                item_category: product.category,
                price,
              },
            ],
          });
          void track("view_item", {
            currency: "USD",
            value: price,
            items: [
              {
                item_id: product.id,
                item_name: product.name,
                item_category: product.category,
                price,
              },
            ],
          });
          openQuickView();
        }}
        className="flex min-w-0 flex-1 flex-row gap-3 rounded-xl text-left outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[var(--color-brand-red)] md:w-full md:flex-col md:gap-0 md:rounded-none md:ring-offset-0"
      >
        <div className="relative h-[5.25rem] w-[5.25rem] shrink-0 overflow-hidden rounded-xl bg-[var(--color-tan)] md:aspect-square md:h-auto md:w-full md:rounded-none">
          {showImage ? (
            <Image
              src={product.imageUrl}
              alt={product.imageAlt}
              fill
              className="object-cover transition duration-500 md:group-hover:scale-[1.03]"
              sizes="(max-width: 767px) 84px, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <ProductImagePlaceholder />
          )}
          {soldOut ? (
            <span className="absolute left-1 top-1 rounded-[var(--radius-sm)] bg-[var(--color-ink)]/85 px-1 py-0.5 text-[7px] font-bold uppercase tracking-wide text-white ring-1 ring-black/10 backdrop-blur-sm md:left-2 md:top-2 md:px-2 md:py-1 md:text-[10px] md:tracking-wider">
              Sold out
            </span>
          ) : product.badge ? (
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

      <div className="flex shrink-0 flex-col gap-2 self-stretch max-md:ml-auto max-md:w-auto max-md:items-end max-md:justify-center md:ml-0 md:min-w-0 md:w-full md:flex-row md:flex-nowrap md:items-stretch md:justify-start md:gap-3 md:px-5 md:pb-5">
        <button
          type="button"
          disabled={unavailable}
          style={unavailable ? soldOutCtaInlineStyle : undefined}
          onClick={(e) => {
            e.stopPropagation();
            if (unavailable) return;
            addProduct(product.id, 1);
            void track("add_to_cart", {
              currency: "USD",
              value: price,
              items: [
                {
                  item_id: product.id,
                  item_name: product.name,
                  item_category: product.category,
                  price,
                  quantity: 1,
                },
              ],
            });
          }}
          className={
            unavailable
              ? "box-border flex h-auto min-h-9 w-auto max-w-[9rem] shrink-0 cursor-not-allowed items-center justify-center rounded-full px-2.5 py-1.5 text-center text-[9px] font-semibold leading-tight md:h-auto md:min-h-[3.25rem] md:max-w-none md:min-w-0 md:flex-1 md:px-5 md:py-4 md:text-sm"
              : "box-border flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-transparent bg-[var(--color-brand-red)] p-0 text-white transition hover:bg-[var(--color-brand-red-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-red)] active:scale-[0.98] md:h-auto md:min-h-[3.25rem] md:w-auto md:min-w-0 md:flex-1 md:px-5 md:py-4"
          }
          aria-label={
            soldOut
              ? `${product.name} is sold out`
              : atStockLimit
                ? `Maximum stock reached for ${product.name}`
                : `Add ${product.name} to cart`
          }
        >
          {soldOut ? (
            <span className="whitespace-nowrap text-[9px] md:text-sm">
              Sold out
            </span>
          ) : atStockLimit ? (
            <>
              <span className="whitespace-nowrap md:hidden">Max</span>
              <span className="max-md:hidden whitespace-nowrap">Max in cart</span>
            </>
          ) : (
            <>
              <span
                className="font-mono text-lg leading-none md:hidden"
                aria-hidden
              >
                +
              </span>
              <span className="max-md:hidden whitespace-nowrap font-medium">
                Add to cart
              </span>
            </>
          )}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openQuickView();
          }}
          className="hidden min-h-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-transparent px-2.5 py-2 text-center text-[11px] font-semibold leading-tight text-[var(--color-ink)] transition hover:border-[var(--color-ink)]/25 hover:bg-black/[0.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-red)] sm:px-3 sm:text-xs md:flex md:min-h-[3.25rem] md:w-auto md:max-w-[8.5rem] md:shrink-0 md:px-3 md:py-4"
        >
          <span className="whitespace-nowrap">Quick view</span>
        </button>
      </div>
    </article>
  );
}
