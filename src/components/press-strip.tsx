const labels = [
  "The Gluten-Free Table",
  "Bake & Gather",
  "Morning Ritual",
  "Artisan Pantry",
];

export function PressStrip() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-ink)] py-10 text-[var(--color-surface)]">
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
        As seen &amp; loved
      </p>
      <div className="mx-auto mt-6 flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-5 px-4 sm:px-8">
        {labels.map((name) => (
          <span
            key={name}
            className="text-sm font-semibold tracking-tight text-white/70 sm:text-base"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
