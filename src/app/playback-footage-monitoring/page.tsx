import type { Metadata } from "next";
import { ServiceDetail } from "@/components/site/service-detail";
import { getService } from "@/content/services";

const service = getService("playback-footage-monitoring")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: { canonical: "/playback-footage-monitoring" },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: "/playback-footage-monitoring",
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <ServiceDetail slug="playback-footage-monitoring" />;
}
