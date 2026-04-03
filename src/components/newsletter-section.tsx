"use client";

import { useState } from "react";

export function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-14 shadow-[var(--shadow-card)] sm:px-12 sm:py-16">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[rgba(221,42,27,0.14)] blur-3xl"
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
