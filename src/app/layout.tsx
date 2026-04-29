import type { Metadata } from "next";
import { DM_Sans, Lilita_One } from "next/font/google";
import { CartProvider } from "@/context/cart-context";
import { ProductCatalogProvider } from "@/context/product-catalog-context";
import { CartDrawer } from "@/components/cart-drawer";
import { AnalyticsListener } from "@/components/analytics-listener";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { loadProductCatalog } from "@/lib/data/get-catalog";
import { getSiteUrl } from "@/lib/site-config";
import "./globals.css";

/** Fresh Square catalog each request — avoids baking a stale/fallback catalog at build time. */
export const dynamic = "force-dynamic";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const lilitaOne = Lilita_One({
  variable: "--font-lilita-one",
  subsets: ["latin"],
  weight: "400",
});

const siteUrl = getSiteUrl();
const defaultDescription =
  "friendly flour is a gluten-free bakery in Austin, Texas — cookies, pastries, and baking mixes made in small batches. We also offer dairy-free and vegan options.";

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
    "gluten-free bakery austin",
    "austin texas bakery",
    "vegan bakery austin",
    "dairy-free bakery austin",
    "gluten-free cookies",
    "gluten-free baking mixes",
    "dairy-free baked goods",
    "vegan baked goods",
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
    url: siteUrl,
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const catalog = await loadProductCatalog();
  const base = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: "friendly flour",
        url: base,
        description: defaultDescription,
        logo: {
          "@type": "ImageObject",
          url: `${base}/text-logo.png`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: "friendly flour",
        description: defaultDescription,
        inLanguage: "en-US",
        publisher: { "@id": `${base}/#organization` },
      },
      {
        "@type": ["LocalBusiness", "Bakery"],
        "@id": `${base}/#bakery`,
        name: "friendly flour",
        url: base,
        description: defaultDescription,
        image: [`${base}/product-imgs/loaf.jpeg`],
        servesCuisine: ["Gluten Free", "Vegan", "Dairy Free"],
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Austin",
          addressRegion: "TX",
          addressCountry: "US",
        },
        areaServed: {
          "@type": "City",
          name: "Austin",
          sameAs: "https://en.wikipedia.org/wiki/Austin,_Texas",
        },
        knowsAbout: [
          "gluten-free baking",
          "dairy-free baking",
          "vegan baking",
          "gluten-free cookies",
          "gluten-free pastries",
          "gluten-free baking mixes",
        ],
        parentOrganization: { "@id": `${base}/#organization` },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${lilitaOne.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--color-cream)] font-dm-sans text-[var(--color-ink)] selection:bg-[var(--color-brand-red)] selection:text-white">
        <JsonLd data={structuredData} />
        <ProductCatalogProvider value={catalog}>
          <CartProvider>
            <AnalyticsListener />
            <SiteHeader />
            <main className="flex-1 pb-16 md:pb-20 lg:pb-24">{children}</main>
            <SiteFooter />
            <CartDrawer />
          </CartProvider>
        </ProductCatalogProvider>
      </body>
    </html>
  );
}
