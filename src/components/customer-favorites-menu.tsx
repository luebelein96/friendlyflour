"use client";

import Link from "next/link";
import { MENU_FAVORITES_COLUMNS } from "@/lib/data/menu-favorites";
import { track } from "@/lib/analytics";
import { Reveal } from "@/components/reveal";

export function CustomerFavoritesMenu() {
  return (
    <section className="bg-[var(--color-cream)] px-6 py-14 font-dm-sans sm:px-8 sm:py-[4.5rem] lg:px-12 lg:pb-20">
      <Reveal className="mx-auto max-w-[1000px]">
        <div className="text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-red)]/75 sm:text-xs">
            Customer favorites
          </p>
          <h2 className="mt-4 max-w-[min(100%,28rem)] text-[clamp(1.625rem,4.2vw,2.5rem)] font-bold leading-[1.18] tracking-tight text-[var(--color-brand-red)] sm:max-w-2xl">
            Don&apos;t know where to start? Try our best-sellers.
          </h2>
        </div>

        <div className="mt-4 grid gap-6 md:grid-cols-2 md:gap-6 lg:mt-14">
          {MENU_FAVORITES_COLUMNS.map((col) => (
            <div
              key={col.title}
              className="rounded-[12px] bg-white px-7 pb-5 pt-8 ring-1 ring-black/[0.06] shadow-[0_1px_0_rgba(80,53,48,0.04)]"
            >
              <h3 className="text-center text-[22px] font-bold leading-tight text-[var(--color-brand-red)]">
                {col.title}
              </h3>
              <ul className="mt-7">
                {col.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between gap-3 border-b border-dashed border-[#b0a898] py-3.5 font-mono text-[15px] text-[var(--color-brand-red)] first:pt-0 max-[560px]:text-[13px]"
                  >
                    <span className="min-w-0 font-normal">{item.name}</span>
                    <span className="shrink-0 whitespace-nowrap font-normal">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/shop"
            onClick={() =>
              void track("full_menu_landing_clicked", {
                source: "landing",
                cta_location: "customer_favorites_menu",
                href: "/shop",
              })
            }
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-brand-red)] px-8 text-sm font-medium tracking-[0.04em] text-white transition hover:bg-[var(--color-brand-red-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-red)]"
          >
            Full Menu
          </Link>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-[var(--color-ink-muted)]">
          Prefer our pantry picks?{" "}
          <Link
            href="/shop"
            onClick={() =>
              void track("shop_mixes_landing_clicked", {
                source: "landing",
                cta_location: "customer_favorites_menu",
                href: "/shop",
              })
            }
            className="underline-draw font-mono font-medium text-[var(--color-brand-red)]"
          >
            Shop mixes
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
