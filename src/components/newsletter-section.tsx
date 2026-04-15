"use client";

import { useState } from "react";

export function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 sm:pb-12 sm:pt-16 lg:px-8 lg:pb-14 lg:pt-20">
      <div className="relative isolate overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-14 shadow-[var(--shadow-card)] sm:px-12 sm:py-16">
        {/* Radial wash only — avoid filter: blur() so hover transforms elsewhere don’t recomposite this layer oddly */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-[22rem] w-[22rem] bg-[radial-gradient(circle_at_center,rgba(221,42,27,0.2)_0%,rgba(221,42,27,0.06)_42%,transparent_68%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-xl text-center">
          <p className="eyebrow">Newsletter</p>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-[var(--color-ink)] sm:text-3xl">
            Stay updated
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
            Weekly drops, seasonal menu updates, baking tips, and more!
          </p>
          {submitted ? (
            <p className="mt-10 text-sm font-semibold text-[var(--color-brand-red)]">
              You&apos;re in. Watch your inbox for something sweet.
            </p>
          ) : (
            <form
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-stretch"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="min-h-12 flex-1 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cream)] px-4 text-sm text-[var(--color-ink)] outline-none ring-[var(--color-brand-red)] transition placeholder:text-[var(--color-ink-muted)] focus:border-transparent focus:ring-2"
              />
              <button
                type="submit"
                className="min-h-12 cursor-pointer rounded-full bg-[var(--color-brand-red)] px-8 text-sm font-medium tracking-[0.04em] text-white transition hover:bg-[var(--color-brand-red-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-red)]"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
