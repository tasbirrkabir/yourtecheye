import type { Metadata, Viewport } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { site } from "@/lib/site";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Your Tech Eye | 24/7 Surveillance & Monitoring Solutions",
    template: "%s — Your Tech Eye",
  },
  description: site.description,
  keywords: [
    "Your Tech Eye",
    "CCTV monitoring",
    "24/7 monitoring",
    "surveillance solutions",
    "live audio intervention",
    "remote video monitoring",
    "emergency response",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "Your Tech Eye | 24/7 Surveillance & Monitoring Solutions",
    description: site.description,
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Your Tech Eye — Detect Early. Prevent Instantly.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Tech Eye | 24/7 Surveillance & Monitoring Solutions",
    description: site.description,
    images: ["/brand/og-image.png"],
  },
  icons: {
    icon: [{ url: "/brand/icon.png", type: "image/png" }],
    apple: [{ url: "/brand/icon.png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1b2e",
  width: "device-width",
  initialScale: 1,
};

/** Organization JSON-LD — only verified facts (no address, ratings, or invented fields). */
function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/yourtecheye-logo.png`,
    slogan: site.tagline,
    description: site.description,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.contact.phone,
        email: site.contact.email,
        contactType: "sales",
        availableLanguage: ["English", "Bengali"],
      },
    ],
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${geistMono.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          // Structured data: verified organisation facts only.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
