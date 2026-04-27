type Props = {
  /** Tighter type for cart / checkout thumbnails */
  compact?: boolean;
  /** Use inside `relative` aspect boxes (same role as `Image` with `fill`) */
  absoluteFill?: boolean;
};

export function ProductImagePlaceholder({
  compact = false,
  absoluteFill = false,
}: Props) {
  return (
    <div
      className={`flex items-center justify-center p-1 ${
        absoluteFill ? "absolute inset-0" : "h-full w-full"
      }`}
    >
      <span
        className={`text-center font-medium leading-snug text-[var(--color-ink-muted)] ${
          compact ? "text-[8px] leading-tight" : "text-[10px] sm:text-xs md:text-sm"
        }`}
      >
        Photo coming soon
      </span>
    </div>
  );
}
