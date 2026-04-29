"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const PHRASE = "GLUTEN FREE HAS NEVER TASTED BETTER";
const PHRASE_REPEAT = 8;

function AnnouncementStrip({ "aria-hidden": ariaHidden }: { "aria-hidden"?: boolean }) {
  return (
    <div className="hero-announce-strip" aria-hidden={ariaHidden}>
      {Array.from({ length: PHRASE_REPEAT }, (_, i) => (
        <span key={i} className="hero-announce-phrase whitespace-nowrap">
          {PHRASE}
        </span>
      ))}
    </div>
  );
}

export function HeroHome() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    let resetTimer: number | null = null;
    let raf: number | null = null;

    const ramp = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Faster while actively scrolling; eases back quickly.
        el.style.setProperty("--marquee-duration", "34s");
        if (resetTimer) window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => {
          el.style.setProperty("--marquee-duration", "52s");
        }, 160);
      });
    };

    window.addEventListener("scroll", ramp, { passive: true });
    return () => {
      window.removeEventListener("scroll", ramp);
      if (resetTimer) window.clearTimeout(resetTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative flex min-h-[calc(100svh-var(--site-header-height))] w-screen max-w-[100vw] flex-col overflow-x-clip overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-cream)]">
      <div className="flex h-[30px] shrink-0 items-center bg-[var(--color-sky)] text-white">
        <div className="min-h-0 w-full overflow-hidden">
          <div
            ref={marqueeRef}
            className="hero-announce-marquee font-dm-sans text-[12px] font-normal uppercase"
          >
            <AnnouncementStrip />
            <AnnouncementStrip aria-hidden />
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center px-5 py-8 sm:px-8 md:px-8 lg:px-12">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
          <div className="relative mx-auto w-full max-w-[min(88vw,22rem)] animate-fade-up md:max-w-[min(100%,42rem)]">
            <Image
              src="/text-logo-dark.png"
              alt="friendly flour bakery"
              width={1200}
              height={600}
              priority
              className="h-auto w-full object-contain"
              sizes="(max-width: 767px) 88vw, (max-width: 2000px) min(100vw, 42rem), 672px"
            />
          </div>
          {/* <Link
            href="/shop"
            className="font-mono mt-12 inline-flex items-center justify-center rounded-full bg-[var(--color-sky)] px-10 py-4 text-sm font-medium tracking-[0.04em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--color-sky-hover)] hover:shadow-[var(--shadow-cta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)] sm:mt-14 lg:mt-16 lg:px-12 lg:py-5 lg:text-base"
          >
            Order Now
          </Link> */}
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-center gap-5 border-t border-[var(--color-border)] px-5 py-6 font-dm-sans sm:gap-10 sm:py-8">
        <span className="text-sm font-medium lowercase tracking-tight text-[var(--color-brand-red)] sm:text-base">
          all gluten-free
        </span>
        <Image
          src="/smile.png"
          alt=""
          width={56}
          height={56}
          className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12"
          aria-hidden
        />
        <span className="text-sm font-medium lowercase tracking-tight text-[var(--color-brand-red)] sm:text-base">
          all delicious
        </span>
      </div>
    </section>
  );
}
