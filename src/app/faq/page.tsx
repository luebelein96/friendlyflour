import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about friendly flour gluten-free products, shipping, and baking.",
};

const faqs = [
  {
    q: "Are your products certified gluten-free?",
    a: "Our recipes are formulated without gluten-containing ingredients, and we work with suppliers who follow strict allergen protocols. Full certification details will live here as we scale—sign up for updates if you want the paper trail as soon as it's posted.",
  },
  {
    q: "How long do baked goods last?",
    a: "Cookies are happiest within about a week at room temperature (if they survive that long). Mixes list best-by guidance on each pack—generally plenty of time to forget them in the pantry and then happily rediscover them.",
  },
  {
    q: "Do you ship?",
    a: "We’re building out nationwide shipping. For now, think of this site as the delicious preview—checkout is mocked, but your appetite is real.",
  },
  {
    q: "Are mixes easy to make?",
    a: "Very. If you can measure, stir, and set a timer, you’re overqualified. Each mix includes simple steps and a few cheerful tips so your bake turns out bakery-proud.",
  },
  {
    q: "Do you offer seasonal flavors?",
    a: "Yes—small runs, big flavors. When strawberries are loud and lemons are bright, we lean in. Join the newsletter to hear about drops before they’re gone.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <p className="eyebrow">Support</p>
      <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-[var(--color-ink)] sm:text-5xl">
        Frequently Asked Questions
      </h1>
      {/* <p className="mt-3 text-lg text-[var(--color-ink-muted)]">
        Straightforward answers, no fine-print fog.
      </p> */}
      <dl className="mt-12 space-y-8">
        {faqs.map((item) => (
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
