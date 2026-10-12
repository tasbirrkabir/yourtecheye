import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { site } from "@/lib/site";
import { Toaster } from "@/components/ui/toaster";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-brand",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Your Tech Eye | Live CCTV Monitoring by Trained Operators",
    template: "%s | Your Tech Eye",
  },
  description: site.description,
  keywords: [
    "Your Tech Eye",
    "CCTV monitoring",
    "live video monitoring",
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
    title: "Your Tech Eye | Live CCTV Monitoring by Trained Operators",
    description: site.description,
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Your Tech Eye: live CCTV monitoring with human response",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Tech Eye | Live CCTV Monitoring by Trained Operators",
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
  themeColor: "#161512",
  width: "device-width",
  initialScale: 1,
};

/** Organization JSON-LD: verified facts only. */
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
        className={`${archivo.variable} ${mono.variable} flex min-h-screen flex-col font-sans antialiased`}
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
