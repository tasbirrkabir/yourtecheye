import type { Metadata } from "next";
import { ServiceDetail } from "@/components/site/service-detail";
import { getService } from "@/content/services";

const service = getService("emergency-response")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: { canonical: "/emergency-response" },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: "/emergency-response",
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <ServiceDetail slug="emergency-response" />;
}
