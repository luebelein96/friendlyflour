/**
 * Checkout payload shapes for Square Payments + Web Payments SDK.
 * Collect shipping/contact in the app, tokenize the card on the client, charge on the server.
 *
 * @see https://developer.squareup.com/docs/web-payments/overview
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
