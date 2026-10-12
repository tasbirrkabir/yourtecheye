import type { Metadata } from "next";
import { ServiceDetail } from "@/components/site/service-detail";
import { getService } from "@/content/services";

const service = getService("surveillance-cctv-monitoring")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: { canonical: "/surveillance-cctv-monitoring" },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: "/surveillance-cctv-monitoring",
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <ServiceDetail slug="surveillance-cctv-monitoring" />;
}
