import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site-config";

const aboutDescription =
  "The friendly flour story—gluten-free baking with heart, humor, and great texture.";

export const metadata: Metadata = {
  title: "About",
  description: aboutDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    url: absoluteUrl("/about"),
    title: "About | friendly flour",
    description: aboutDescription,
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <p className="eyebrow">About</p>
      <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-[var(--color-ink)] sm:text-5xl">
        We believe in second helpings
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-[var(--color-ink-muted)]">
        friendly flour started around a too-small counter, a stack of failed batches,
        and a stubborn idea: gluten-free should still feel like a celebration.
        We wanted cookies with chew, brownies with swagger, and mixes that make
        your kitchen smell like you hired a pastry chef for the afternoon.
      </p>
      <div className="relative mt-12 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-card)]">
        <div className="aspect-[16/10] bg-gradient-to-br from-[var(--color-tan)] via-[var(--color-surface)] to-[var(--color-sage)]/30" />
        <p className="absolute bottom-4 left-4 right-4 rounded-[var(--radius-sm)] border border-white/30 bg-[var(--color-surface)]/90 px-4 py-3 text-sm text-[var(--color-ink-muted)] backdrop-blur-md">
          Image placeholder — team photo, bakery shelf, or flour-dusted hands
          welcome here.
        </p>
      </div>
      <h2 className="mt-14 font-display text-2xl font-medium tracking-tight text-[var(--color-ink)]">
        Our mission
      </h2>
      <p className="mt-3 leading-relaxed text-[var(--color-ink-muted)]">
        Make gluten-free food that feels generous—generous with flavor, texture,
        and joy. We obsess over the small things (salt, vanilla, bake time) so
        you can focus on the big ones: who gets the last cookie, and whether
        anyone is judging if you eat brownie batter from the bowl.
      </p>
      <p className="mt-4 leading-relaxed text-[var(--color-ink-muted)]">
        We&apos;re not here to lecture; we&apos;re here to pass the plate.
      </p>
      <Link
        href="/shop"
        className="mt-10 inline-flex rounded-[var(--radius-sm)] bg-[var(--color-ink)] px-8 py-3 text-sm font-semibold text-[var(--color-surface)] transition hover:opacity-90"
      >
        Shop the pantry
      </Link>
    </div>
  );
}
