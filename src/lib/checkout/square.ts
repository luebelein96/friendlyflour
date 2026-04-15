import type { CheckoutDraft } from "./order-types";

/** Safe to expose in the browser — used by Square Web Payments SDK. */
export function getSquarePublicConfig(): {
  applicationId: string;
  locationId: string;
} {
  return {
    applicationId: process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID ?? "",
    locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID ?? "",
  };
}

/**
 * Server-side charge after the client obtains a payment `sourceId` (card nonce).
 * Replace this stub with `POST https://connect.squareup.com/v2/payments` using
 * `SQUARE_ACCESS_TOKEN` (sandbox or production).
 */
export async function createSquareOrder(
  _draft: CheckoutDraft
): Promise<{ ok: true; paymentId: string } | { error: string }> {
  void _draft;
  return {
    error:
      "Square Payments API not configured. Add SQUARE_ACCESS_TOKEN, tokenize the card with the Web Payments SDK, then call the Payments API from a Route Handler.",
  };
}
