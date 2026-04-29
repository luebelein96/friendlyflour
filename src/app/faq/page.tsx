import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { faqItems } from "@/lib/data/faqs";
import { absoluteUrl } from "@/lib/site-config";

const faqDescription =
  "Common questions about friendly flour (Austin, Texas) gluten-free baked goods—plus dairy-free and vegan options, shipping, and baking.";

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
    <div className="mx-auto max-w-3xl px-4 py-16 font-dm-sans sm:px-6 sm:py-24 lg:px-8">
      <JsonLd data={faqStructuredData} />
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-red)]/75 sm:text-xs">
        Support
      </p>
      <h1 className="mt-4 max-w-[min(100%,28rem)] text-[clamp(1.625rem,4.2vw,2.5rem)] font-bold leading-[1.18] tracking-tight text-[var(--color-brand-red)] sm:max-w-2xl">
        Frequently Asked Questions
      </h1>
      {/* <p className="mt-5 text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-lg">
        Straightforward answers, no fine-print fog.
      </p> */}
      <dl className="mt-12 space-y-8">
        {faqItems.map((item) => (
          <div
            key={item.q}
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_1px_0_rgba(12,12,12,0.04)]"
          >
            <dt className="text-base font-bold leading-snug tracking-tight text-[var(--color-brand-red)] sm:text-[1.05rem]">
              {item.q}
            </dt>
            <dd className="mt-3 text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-lg">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
