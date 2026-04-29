import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p
              className="text-lg font-normal lowercase tracking-tighter text-[var(--color-brand-red)] [font-family:var(--font-lilita-one)]"
            >
              friendly flour
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-ink-muted)]">
              Gluten-free baked goods and mixes—simple ingredients, done right.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
              Explore
            </p>
            <ul className="mt-4 space-y-3 text-sm font-semibold">
              <li>
                <Link href="/shop" className="footer-nav-link">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-nav-link">
                  About
                </Link>
              </li>
              <li>
                <Link href="/faq" className="footer-nav-link">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
              Orders
            </p>
            <ul className="mt-4 space-y-3 text-sm font-semibold">
              <li>
                <Link href="/checkout" className="footer-nav-link">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
              Contact
            </p>
            <p className="mt-4 text-sm font-medium text-[var(--color-ink-muted)]">
              hello@friendlyflouratx.com
            </p>
          </div>
        </div>
        <p className="mt-14 border-t border-[var(--color-border)] pt-8 text-center text-xs text-[var(--color-ink-muted)]">
          © {new Date().getFullYear()} friendly flour. Baked with ❤️
        </p>
      </div>
    </footer>
  );
}
