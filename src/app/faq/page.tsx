import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { faqItems } from "@/lib/data/faqs";
import { absoluteUrl } from "@/lib/site-config";

const faqDescription =
  "Common questions about friendly flour gluten-free products, shipping, and baking.";

export const metadata: Metadata = {
  title: "FAQ",
  description: faqDescription,
  alternates: { canonical: "/faq" },
  openGraph: {
    url: absoluteUrl("/faq"),
    title: "FAQ | friendly flour",
    description: faqDescription,
  },
};

export default function FaqPage() {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <JsonLd data={faqStructuredData} />
      <p className="eyebrow">Support</p>
      <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-[var(--color-ink)] sm:text-5xl">
        Frequently Asked Questions
      </h1>
      {/* <p className="mt-3 text-lg text-[var(--color-ink-muted)]">
        Straightforward answers, no fine-print fog.
      </p> */}
      <dl className="mt-12 space-y-8">
        {faqItems.map((item) => (
          <div
            key={item.q}
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_1px_0_rgba(12,12,12,0.04)]"
          >
            <dt className="text-base font-bold tracking-tight text-[var(--color-ink)]">
              {item.q}
            </dt>
            <dd className="mt-3 leading-relaxed text-[var(--color-ink-muted)]">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
