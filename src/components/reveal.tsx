"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** IntersectionObserver threshold. */
  threshold?: number;
  /** Root margin, e.g. `"0px 0px -10% 0px"`. */
  rootMargin?: string;
};

export function Reveal({
  children,
  className,
  threshold = 0.18,
  rootMargin = "0px 0px -10% 0px",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (revealed) return;

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [revealed, threshold, rootMargin]);

  return (
    <div
      ref={ref}
      data-reveal
      data-revealed={revealed ? "true" : "false"}
      className={className}
    >
      {children}
    </div>
  );
}

