import Image from "next/image";
import Link from "next/link";

export function GfBakingSection() {
  return (
    <section className="bg-[var(--color-brand-red)] font-dm-sans text-white selection:bg-[var(--color-sky)] selection:text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid gap-10 sm:grid-cols-2 sm:items-center sm:gap-8 md:gap-10 lg:gap-14 xl:gap-20">
          <div className="max-w-xl sm:min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white">
              100% GF
            </p>
            <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.12] tracking-tight">
              Great baking was never about the gluten anyway
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
              Everything here is gluten-free. None of it tastes like it.
              Friendly Flour is a micro bakery dedicated to the craft of gluten-free baking.
              We bake everything fresh, in small batches, with real ingredients.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium tracking-[0.04em] text-[var(--color-brand-red)] transition hover:bg-[var(--color-cream)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Shop Now
            </Link>
          </div>

          <div className="relative hidden w-full sm:flex sm:justify-end">
            <div className="relative aspect-square w-full max-w-[min(100%,16rem)] sm:max-w-[min(100%,14rem)] md:max-w-[16rem] lg:max-w-[20rem] xl:max-w-[22rem]">
              <Image
                src="/product-imgs/cookieBun.png"
                alt="Spiraled cookie bun with powdered sugar"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1023px) 14rem, 22rem"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
