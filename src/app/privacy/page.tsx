import type { Metadata } from "next";
import { LegalPage, type LegalPageProps } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Your Tech Eye collects, uses, stores, and protects personal data submitted through this website, and the rights you have over that data.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "12 October 2026";

const pageProps: LegalPageProps = {
  title: "Privacy Policy",
  standfirst:
    "This policy explains what personal data this website collects, why we collect it, how long we keep it, and the control you have over it. It covers the website and enquiry process; client site data is governed separately by each service agreement.",
  updated: UPDATED,
  sections: [
    {
      id: "who-we-are",
      heading: "Who we are",
      body: [
        "Your Tech Eye is a live CCTV monitoring and response company based in Dhanmondi, Dhaka, Bangladesh. For the data described in this policy, Your Tech Eye is the data controller.",
        "If you have any privacy question or request, contact us first: privacy enquiries are answered by a person, not a bot.",
      ],
      details: [
        { term: "Company", description: "Your Tech Eye" },
        { term: "Address", description: "Dhanmondi, Dhaka, Bangladesh" },
        { term: "Email", description: "yourtecheye@gmail.com" },
        { term: "Phone", description: "+8801780145132" },
      ],
    },
    {
      id: "what-we-collect",
      heading: "What we collect",
      body: [
        "When you submit the enquiry form we collect only what is needed to answer you. Which fields are required is marked on the form itself; everything else is optional.",
      ],
      details: [
        {
          term: "Enquiry fields",
          description:
            "Name, organisation (optional), email address and/or phone number, service of interest (optional), number of cameras (optional), how soon you want monitoring (optional), preferred contact method (optional), site or project location (optional), and your message.",
        },
        {
          term: "Technical records",
          description:
            "With each submission we store the date and time, a one-way hashed value derived from your IP address for spam prevention, and your browser user agent string. We never store your raw IP address.",
        },
        {
          term: "What we do not collect",
          description:
            "No advertising identifiers, no analytics trackers, no behavioural profiles, no data from third-party ad networks. This website runs no third-party tracking scripts.",
        },
      ],
    },
    {
      id: "why-we-use-it",
      heading: "Why we use your data",
      body: [
        "Your enquiry details are used for one primary purpose: to respond to your enquiry and, if you decide to proceed, to prepare a quotation and service agreement. The lawful basis is your consent, given when you tick the consent box, and our legitimate interest in answering potential customers.",
        "We do not add you to marketing lists, we do not sell your data, and we do not share it with third parties for their own marketing.",
        "> If you ask us not to contact you again, we will stop. Tell us by email or phone and we will action it immediately.",
      ],
    },
    {
      id: "cookies",
      heading: "Cookies and tracking",
      body: [
        "This website uses no advertising cookies, no analytics cookies, and no cross-site trackers. Any cookies or local storage used are strictly necessary for the website to function and are listed in our Cookie Policy.",
        "Videos on this site are self-hosted, so no third-party video cookies are set when you watch them.",
      ],
    },
    {
      id: "storage-retention",
      heading: "Storage and retention",
      body: [
        "Enquiries are stored in the website's secured database and, where email delivery is configured, forwarded to the company inbox so the team can reply. Access to the enquiry database is restricted to the Your Tech Eye team.",
        "We keep enquiry records for as long as needed to handle your request and for a reasonable period afterwards to maintain a record of the contact. Enquiry data that has not led to a client relationship is reviewed and deleted on a rolling basis; when you ask us to delete your enquiry, we do so without delay.",
        "Security measures include access controls on the database, validation and sanitisation of all form input, rate limiting, honeypot spam traps, and hashed IP handling.",
      ],
    },
    {
      id: "sharing",
      heading: "Sharing and processors",
      body: [
        "We do not sell or rent personal data. Your enquiry data is processed by us and, only where strictly necessary, by the following categories of processor:",
      ],
      details: [
        {
          term: "Hosting",
          description:
            "The website and its database run on managed infrastructure operated on our behalf.",
        },
        {
          term: "Email delivery",
          description:
            "If email forwarding is enabled, enquiry content is transmitted through a transactional email provider solely to deliver your enquiry to our inbox.",
        },
        {
          term: "Legal disclosures",
          description:
            "Where the law requires it, we may disclose information to law enforcement or a court. We disclose the minimum necessary.",
        },
      ],
    },
    {
      id: "your-rights",
      heading: "Your rights",
      body: [
        "You can ask us at any time to: tell you what we hold about you, give you a copy, correct anything wrong, delete your enquiry, or stop contacting you.",
        `To exercise any of these, email ${"yourtecheye@gmail.com"} or call +8801780145132. We respond to genuine requests promptly and always within a reasonable period.`,
        "> You are never required to provide optional fields. Leaving them blank has no effect on how we answer your enquiry.",
      ],
    },
    {
      id: "monitoring-context",
      heading: "A note on surveillance data",
      body: [
        "This policy covers the website. Camera footage and monitoring records for client sites are handled under each client's service agreement and applicable law: those systems are controlled by the client, and we act as the monitoring operator under contract.",
        "We only accept cameras for monitoring that the client confirms are installed lawfully and do not violate the privacy of people on or near the monitored premises.",
      ],
    },
    {
      id: "children",
      heading: "Children",
      body: [
        "This website is aimed at business and property owners. We do not knowingly collect data from children. If you believe a child has submitted an enquiry, contact us and we will delete it.",
      ],
    },
    {
      id: "media-credits",
      heading: "Photography and media credits",
      body: [
        "Photography and video on this site is licensed stock or public-archive material used illustratively; it does not depict Your Tech Eye staff, clients, or customer sites unless stated. Full source, creator, and licence records are maintained in the project's MEDIA_CREDITS.md file, and images requiring attribution are credited there in accordance with their licences.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      body: [
        "If this policy changes materially, the updated version is published on this page with a new \u201clast updated\u201d date before it takes effect.",
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      body: [
        "Questions about anything above? Email yourtecheye@gmail.com or call +8801780145132.",
      ],
    },
  ],
};

export default function PrivacyPage() {
  return <LegalPage {...pageProps} />;
}
