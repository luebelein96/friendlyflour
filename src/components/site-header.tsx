"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/cart-context";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  const { itemCount, toggleCart } = useCart();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 h-[var(--site-header-height)] border-b border-[var(--color-border)] bg-[var(--color-cream)]/95 backdrop-blur-md">
      <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-6 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="shrink-0 transition-opacity hover:opacity-80"
        >
          <Image
            src="/text-logo-dark.png"
            alt="friendly flour"
            width={160}
            height={40}
            className="h-8 w-auto object-contain object-left"
            priority
          />
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-[13px] font-normal uppercase tracking-[0.06em] text-black transition-colors ${
                  active ? "" : "hover:opacity-75"
                }`}
              >
                {item.label}
                {active ? (
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-[var(--color-sky)]" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/shop"
            className="rounded-full px-3 py-2 text-[13px] font-normal uppercase tracking-[0.06em] text-black transition-colors hover:bg-black/[0.04] hover:opacity-80 md:hidden"
          >
            Shop
          </Link>
          <button
            type="button"
            onClick={toggleCart}
            className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[var(--color-brand-red)] text-white transition hover:bg-[var(--color-brand-red-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
            aria-label={`Open cart, ${itemCount} items`}
          >
            <svg
              className="h-[1.15rem] w-[1.15rem]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 11H6L5 9z"
              />
            </svg>
            {itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-[var(--color-ink)] px-0.5 text-[10px] font-bold text-[var(--color-cream)]">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
}
