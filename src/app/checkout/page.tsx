import type { Metadata } from "next";
import { CheckoutForm } from "./checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your friendly flour order—shipping, contact, and payment preview.",
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
