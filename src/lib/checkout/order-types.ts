/**
 * Shapes for a future Stripe Checkout / PaymentIntent flow.
 * Keep UI forms aligned with these fields when integrating.
 */
export type CheckoutContact = {
  email: string;
  phone?: string;
};

export type CheckoutAddress = {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type CheckoutLineItem = {
  productId: string;
  quantity: number;
  unitAmountCents: number;
  name: string;
};

export type CheckoutDraft = {
  contact: CheckoutContact;
  shipping: CheckoutAddress;
  lineItems: CheckoutLineItem[];
  promoCode?: string;
};

/** Placeholder: server action or API route will create a Stripe Checkout Session. */
export async function createStripeCheckoutSession(
  draft: CheckoutDraft
): Promise<{ url: string } | { error: string }> {
  void draft;
  return { error: "Stripe not configured — UI mock only." };
}
