"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";
import { prefersReducedMotion } from "@/lib/motion";
import { Reveal } from "@/components/reveal";

export function CustomOrdersSection() {
  const photoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = (rect.top + rect.height * 0.4) / vh;
      const clamped = Math.max(-0.2, Math.min(1.2, p));
      const y = (clamped - 0.5) * 24;
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="bg-[var(--color-brand-red)] font-dm-sans text-white selection:bg-[var(--color-sky)] selection:text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <Reveal className="grid gap-10 sm:grid-cols-2 sm:items-center sm:gap-8 md:gap-10 lg:gap-14 xl:gap-20">
          <div className="relative hidden w-full sm:flex sm:justify-start">
            <div
              ref={photoRef}
              className="relative aspect-square w-full max-w-[min(100%,16rem)] sm:max-w-[min(100%,14rem)] md:max-w-[16rem] lg:max-w-[20rem] xl:max-w-[22rem] will-change-transform"
            >
              <Image
                src="/product-imgs/blueberry-bun.png"
                alt="Blueberry cheesecake bun"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1023px) 14rem, 22rem"
              />
            </div>
          </div>

          <div className="max-w-xl sm:min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white">
              Custom orders
            </p>
            <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.12] tracking-tight">
              Celebrations &amp; special occasions.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
              For larger orders, events, or something one-of-a-kind. Reach out and
              we&apos;ll work with you on timing, quantities, and dietary needs.
            </p>
            <Link
              href="mailto:hello@friendlyflouratx.com?subject=Custom%20order%20inquiry"
              onClick={() =>
                void track("get_in_touch_landing_clicked", {
                  source: "landing",
                  cta_location: "custom_orders_section",
                  href: "mailto:hello@friendlyflouratx.com",
                })
              }
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium tracking-[0.04em] text-[var(--color-brand-red)] transition hover:bg-[var(--color-cream)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get in touch
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
