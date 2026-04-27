/** True when `imageUrl` should be rendered with `<Image>` (non-empty after trim). */
export function hasProductImage(imageUrl: string | null | undefined): boolean {
  return Boolean(imageUrl?.trim());
}
