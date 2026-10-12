import type { Metadata } from "next";
import { LegalPage, type LegalPageProps } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "What cookies and local storage the Your Tech Eye website uses. No advertising, no analytics trackers, no third-party scripts.",
  alternates: { canonical: "/cookies" },
};

const UPDATED = "12 October 2026";

const pageProps: LegalPageProps = {
  title: "Cookie Policy",
  standfirst:
    "Short version: this website runs no advertising cookies, no analytics trackers, and no third-party tracking scripts. Here is exactly what does run on your device and why.",
  updated: UPDATED,
  sections: [
    {
      id: "what-cookies-are",
      heading: "What cookies are",
      body: [
        "Cookies are small text files a website stores on your device to remember something about your visit, such as a preference or a login session. Local storage is a similar browser feature that lets a page save data on your device.",
        "Cookies can be strictly necessary (the site needs them to work), functional (remember your preferences), or tracking (follow you across sites for advertising). Tracking cookies are the kind people rightly distrust.",
      ],
    },
    {
      id: "what-we-use",
      heading: "What this website uses",
      body: [
        "This website is intentionally minimal on device storage. We set no advertising cookies, no analytics cookies, and no social media cookies. We embed no third-party videos, fonts trackers, or comment widgets.",
        "The only things the website may store on your device are strictly necessary technical values: for example, a security or session token if one becomes needed to protect forms against abuse, and browser-level caching that makes repeat visits faster.",
      ],
      details: [
        {
          term: "Advertising cookies",
          description: "None. We run no ad network scripts at all.",
        },
        {
          term: "Analytics cookies",
          description:
            "None. We do not use Google Analytics or any other third-party analytics tracker.",
        },
        {
          term: "Third-party embeds",
          description:
            "None. All photography and video is served from this website's own domain.",
        },
        {
          term: "Strictly necessary storage",
          description:
            "Only where needed for security, spam prevention, or core functionality.",
        },
      ],
    },
    {
      id: "your-control",
      heading: "Your control",
      body: [
        "Because we run no tracking cookies, there is nothing to opt out of on this site. You can still clear or block all cookies in your browser settings at any time; the website will continue to work.",
        "Every major browser (Chrome, Firefox, Safari, Edge) lets you view and delete stored cookies per site, usually under Privacy and Security settings.",
      ],
    },
    {
      id: "enquiry-data",
      heading: "Enquiry data is not a cookie",
      body: [
        "The details you type into the enquiry form are submitted to our server over an encrypted connection and handled as described in the Privacy Policy. They are not stored as cookies and are not used to profile you.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      body: [
        "If we ever introduce a cookie that is not strictly necessary, we will update this policy with a new \u201clast updated\u201d date before it takes effect and, where required, ask for consent first.",
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      body: [
        "Questions about cookies or storage on this site: email yourtecheye@gmail.com.",
      ],
    },
  ],
};

export default function CookiesPage() {
  return <LegalPage {...pageProps} />;
}
