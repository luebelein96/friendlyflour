import Image from "next/image";

const PHOTOS = [
  {
    src: "/product-imgs/bread.jpeg",
    alt: "Fresh baked bread",
    tilt: "rotate-[2.5deg]",
  },
  {
    src: "/product-imgs/loaf.jpeg",
    alt: "Gluten-free sandwich loaf",
    tilt: "-rotate-[2deg]",
  },
  {
    src: "/product-imgs/bb-cheesecake-bar.jpeg",
    alt: "Blueberry cheesecake bar with streusel",
    tilt: "rotate-[3deg]",
  },
] as const;

export function BakedGoodsTrio() {
  return (
    <section className="overflow-x-clip border-t border-[var(--color-border)] bg-[var(--color-cream)] px-5 py-14 font-dm-sans sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto w-full max-w-[min(100%,24rem)] py-1 sm:max-w-3xl sm:py-0 md:max-w-4xl lg:max-w-5xl">
        <div className="grid grid-cols-3 items-center gap-2 sm:gap-5 md:gap-7 lg:gap-9">
          {PHOTOS.map((item) => (
            <div
              key={item.src}
              className={`min-w-0 w-full origin-center transition duration-300 ease-out will-change-transform hover:scale-[1.03] ${item.tilt}`}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[0.875rem] shadow-[var(--shadow-card)] ring-1 ring-black/[0.06] sm:rounded-[1.25rem]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 639px) 30vw, (max-width: 1023px) 24vw, 280px"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
