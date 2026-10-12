import type { Metadata } from "next";
import { ServiceDetail } from "@/components/site/service-detail";
import { getService } from "@/content/services";

const service = getService("live-audio-intervention")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: { canonical: "/live-audio-intervention" },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: "/live-audio-intervention",
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <ServiceDetail slug="live-audio-intervention" />;
}
