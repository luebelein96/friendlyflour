import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { CartProvider } from "@/context/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteUrl } from "@/lib/site-config";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const siteUrl = getSiteUrl();
const defaultDescription =
  "Gluten-free cookies, pastries, and baking mixes from friendly flour—small batch, thoughtfully made, ridiculously delicious. Shop GF treats and pantry mixes online.";

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "friendly flour",
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
  title: {
    default: "friendly flour | Gluten-free baked goods & mixes",
    template: "%s | friendly flour",
  },
  description: defaultDescription,
  keywords: [
    "gluten-free bakery",
    "gluten-free cookies",
    "gluten-free baking mixes",
    "GF baked goods",
    "friendly flour",
    "gluten-free online shop",
  ],
  authors: [{ name: "friendly flour" }],
  creator: "friendly flour",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "friendly flour",
    title: "friendly flour | Gluten-free baked goods & mixes",
    description: defaultDescription,
    images: [
      {
        url: "/product-imgs/loaf.jpeg",
        width: 1200,
        height: 1200,
        alt: "Gluten-free bread and baked goods from friendly flour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "friendly flour | Gluten-free baked goods & mixes",
    description: defaultDescription,
    images: ["/product-imgs/loaf.jpeg"],
  },
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
