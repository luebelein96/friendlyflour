import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { CartProvider } from "@/context/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "friendly flour | Gluten-free baked goods & mixes",
    template: "%s | friendly flour",
  },
  description:
    "Gluten-free cookies, pastries, baking mixes—small batch, thoughtfully made, ridiculously delicious.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full scroll-smooth antialiased`}>
      <body className="flex min-h-full flex-col bg-[var(--color-cream)] font-dm-sans text-[var(--color-ink)] selection:bg-[var(--color-accent-soft)] selection:text-[var(--color-ink)]">
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
