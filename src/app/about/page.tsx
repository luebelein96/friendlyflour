import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site-config";

const aboutDescription =
  "The friendly flour story—Austin, Texas gluten-free baking with heart, humor, and great texture. Dairy-free and vegan options too.";

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
    <div className="mx-auto max-w-3xl px-4 py-16 font-dm-sans sm:px-6 sm:py-24 lg:px-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-red)]/75 sm:text-xs">
        About
      </p>
      <h1 className="mt-4 max-w-[min(100%,28rem)] text-[clamp(1.625rem,4.2vw,2.5rem)] font-bold leading-[1.18] tracking-tight text-[var(--color-brand-red)] sm:max-w-2xl">
        Gluten-free baking is hard to do well. We do it anyway.
      </h1>
      <p className="mt-5 text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-lg">
        We started Friendly Flour because we believed the bar could be higher.
        We&apos;ve spent years obsessing over what gluten-free baking can actually be, and we&apos;re not done yet.
      </p>
      <div className="relative mt-12 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-card)]">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src="/about.jpeg"
            alt="friendly flour bakery"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 48rem"
            priority
          />
        </div>
      </div>
      <Link
        href="/shop"
        className="mt-10 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-brand-red)] px-8 text-sm font-medium tracking-[0.04em] text-white transition hover:bg-[var(--color-brand-red-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-red)]"
      >
        Shop Now
      </Link>
    </div>
  );
}
