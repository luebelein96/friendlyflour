/**
 * Set `SQUARE_DEBUG=1` to log Square API responses (or run `next dev` — on unless `SQUARE_DEBUG=0`).
 * BigInt values (e.g. price_money.amount) are stringified for JSON safety.
 */
export function logSquareResponse(tag: string, payload: unknown): void {
  const off = process.env.SQUARE_DEBUG === "0";
  const on =
    !off &&
    (process.env.SQUARE_DEBUG === "1" || process.env.NODE_ENV === "development");
  if (!on) return;

  try {
    const serialized = JSON.stringify(
      payload,
      (_, v) => (typeof v === "bigint" ? v.toString() : v),
      2
    );
    console.log(`[square] ${tag}\n${serialized}`);
  } catch {
    console.log(`[square] ${tag}`, payload);
  }
}
