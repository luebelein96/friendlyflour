import type { Metadata } from "next";
import { BakedGoodsTrio } from "@/components/baked-goods-trio";
import { CustomOrdersSection } from "@/components/custom-orders-section";
import { CustomerFavoritesMenu } from "@/components/customer-favorites-menu";
import { GfBakingSection } from "@/components/gf-baking-section";
import { HeroHome } from "@/components/hero-home";
import { NewsletterSection } from "@/components/newsletter-section";
import { absoluteUrl } from "@/lib/site-config";

const homeDescription =
  "friendly flour is a gluten-free bakery in Austin, Texas — cookies, pastries, and baking mixes made in small batches. We also offer dairy-free and vegan options.";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    url: absoluteUrl("/"),
    title: "friendly flour | Gluten-free baked goods & mixes",
    description: homeDescription,
  },
};

export default function HomePage() {
  return (
    <>
      <HeroHome />
      <GfBakingSection />
      <CustomerFavoritesMenu />
      <CustomOrdersSection />

      {/* Our beginning + studio placeholder
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]">
            <div className="aspect-[5/4] bg-gradient-to-br from-[var(--color-tan)] via-[var(--color-cream)] to-[var(--color-sage)]/25" />
            <div className="absolute inset-0 flex items-end p-8">
              <div className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-cream)]/95 p-6 shadow-lg backdrop-blur-md">
                <p className="eyebrow text-[var(--color-ink)]">Studio</p>
                <p className="mt-2 font-display text-xl font-bold text-[var(--color-ink)]">
                  From our kitchen to your counter
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                  Photography placeholder—golden cookies, floured hands, morning
                  light.
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="eyebrow">Our beginning</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
              friendly flour began with one question
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-lg">
              Why shouldn&apos;t gluten-free feel like a treat—not a compromise?
              We started in a tiny kitchen, testing batches until the room smelled
              like butter and laughter. Today we&apos;re still chasing that same
              feeling: warm, playful, a little fancy, never fussy.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-lg">
              Every box is a promise—joyful gluten-free baked goods made with care,
              ready for your table.
            </p>
          </div>
        </div>
      </section>
      */}

      {/* <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow">Why us</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
              Why friendly flour
            </h2>
            <p className="mt-3 text-base text-[var(--color-ink-muted)] sm:text-lg">
              We care about crumbs. Here are four reasons that actually matter.
            </p>
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {values.map((v) => (
              <li
                key={v.title}
                className="flex flex-col rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-cream)] p-6 transition hover:border-[var(--color-sky)]/25 hover:shadow-[var(--shadow-card)]"
              >
                <span className="h-px w-8 bg-[var(--color-sky)]" aria-hidden />
                <h3 className="mt-4 text-[0.95rem] font-bold tracking-tight text-[var(--color-ink)]">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                  {v.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section> */}

      <section className="border-t border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[var(--radius-lg)] bg-[#6B4F4F] px-8 py-14 text-[var(--color-cream)] sm:px-14 sm:py-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
              Kind Words
            </p>
            <blockquote className="mt-6 font-display text-2xl font-bold leading-snug tracking-tight sm:text-3xl lg:text-[2.15rem]">
              &ldquo;Finally, a gluten-free cookie my wife and I fight over. I am simply obsessed.&rdquo;
            </blockquote>
            <p className="mt-8 text-sm font-semibold text-white/55">
              — Zane Witcher
            </p>
          </div>
        </div>
      </section>

      <BakedGoodsTrio />

      <NewsletterSection />
    </>
  );
}
