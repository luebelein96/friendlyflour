import type { CSSProperties } from "react";

/** Inline so borders survive Tailwind v4 layer order + disabled button quirks. */
export const soldOutCtaInlineStyle: CSSProperties = {
  boxSizing: "border-box",
  WebkitAppearance: "none",
  appearance: "none",
  border: "1px solid rgba(80, 53, 48, 0.35)",
  borderRadius: "9999px",
  backgroundColor: "var(--color-surface)",
  color: "var(--color-ink-muted)",
  boxShadow: "inset 0 0 0 1px rgba(80, 53, 48, 0.06)",
  opacity: 1,
};
