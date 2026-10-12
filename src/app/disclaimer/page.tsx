import type { Metadata } from "next";
import { LegalPage, type LegalPageProps } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Important information about the limits of website information and monitoring services: no guarantee of incident prevention, illustrative media, and external links.",
  alternates: { canonical: "/disclaimer" },
};

const UPDATED = "12 October 2026";

const pageProps: LegalPageProps = {
  title: "Disclaimer",
  standfirst:
    "Plain-spoken limits: what this website's information is, what monitoring can and cannot do, and how the images on this site should be read.",
  updated: UPDATED,
  sections: [
    {
      id: "general-information",
      heading: "General information only",
      body: [
        "Content on this website is provided for general information about Your Tech Eye and our services. It is not technical, legal, or insurance advice, and it should not be relied on as a substitute for a site-specific assessment.",
        "Service descriptions, response steps, and examples are illustrative. The binding description of what you receive is always your signed service agreement.",
      ],
    },
    {
      id: "no-guarantee",
      heading: "No guarantee of incident prevention",
      body: [
        "Live monitoring, audio intervention, and response coordination materially improve detection and reaction times, but no security measure can guarantee that crime, loss, or damage will be prevented, detected, or resolved in every case.",
        "> If you are experiencing an emergency right now, stop and contact the national emergency services (999 in Bangladesh) before doing anything else. We are a private monitoring company, not an emergency service.",
      ],
    },
    {
      id: "service-dependence",
      heading: "What monitoring depends on",
      body: [
        "The effectiveness of monitoring depends on factors outside our control, including camera quality and placement, lighting, network reliability, site access for responders, and the accuracy of information provided by the client.",
        "Outages of electricity, internet connectivity, camera hardware, or telecommunications can interrupt monitoring unless redundancy is agreed in the service agreement.",
      ],
    },
    {
      id: "media",
      heading: "Photography and video on this site",
      body: [
        "Images and footage on this website are licensed stock or public-archive material, used to illustrate the kind of environments we monitor. They do not depict Your Tech Eye staff, clients, monitoring operators, or customer sites unless explicitly stated.",
        "Scene depictions, interface illustrations, and statistics presented as design elements are illustrative of our working method and do not represent any single real event or customer. Full licence and attribution records are kept in the project's media credits register.",
      ],
    },
    {
      id: "external-links",
      heading: "External links",
      body: [
        "Links to third-party websites are provided for convenience only. We do not endorse, control, or take responsibility for the content, accuracy, or policies of external sites.",
      ],
    },
    {
      id: "availability",
      heading: "Website availability",
      body: [
        "We aim to keep this website available and accurate at all times, but we do not guarantee uninterrupted access, and we may change or withdraw content without notice. Maintenance windows, hosting issues, and events beyond our control can temporarily affect availability.",
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      body: [
        "If anything in this disclaimer is unclear, or you want to verify a claim before making a decision, contact us: yourtecheye@gmail.com or +8801780145132.",
      ],
    },
  ],
};

export default function DisclaimerPage() {
  return <LegalPage {...pageProps} />;
}
