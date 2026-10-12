import type { Metadata } from "next";
import { LegalPage, type LegalPageProps } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern the use of the Your Tech Eye website and the framework under which our monitoring services are provided.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "12 October 2026";

const pageProps: LegalPageProps = {
  title: "Terms of Service",
  standfirst:
    "These terms govern your use of this website and set out the framework under which Your Tech Eye provides live monitoring and response services. Specific commercial terms for every client are always confirmed in a written service agreement.",
  updated: UPDATED,
  sections: [
    {
      id: "about-these-terms",
      heading: "About these terms",
      body: [
        "This website is operated by Your Tech Eye, a monitoring and technology company based in Dhanmondi, Dhaka, Bangladesh. References to \u201cwe\u201d, \u201cus\u201d and \u201cour\u201d mean Your Tech Eye.",
        "By accessing this website, browsing its pages, or submitting an enquiry through it, you agree to these terms. If you do not agree, please stop using the website.",
        "> These terms govern the website itself. Monitoring services are supplied under a separate written service agreement signed with each client. If a service agreement conflicts with these terms, the service agreement prevails for that client.",
      ],
    },
    {
      id: "our-services",
      heading: "Our services",
      body: [
        "Your Tech Eye provides live surveillance camera monitoring, live audio intervention, emergency response coordination, and playback footage analysis for businesses, properties, and families.",
        "The description of services on this website is provided for general information. The exact scope, response procedures, coverage hours, equipment requirements, and fees that apply to you are defined in your individual service agreement.",
        "We continuously develop how we work. We may improve, change, or discontinue non-core features of the website or of a service, provided any change material to a paying client is handled through their service agreement.",
      ],
    },
    {
      id: "enquiries-quotes",
      heading: "Enquiries, quotations and contracts",
      body: [
        "Submitting the website enquiry form, calling us, or emailing us does not create a client relationship or a contract. A contract is formed only when we both sign a written service agreement, or when we confirm a booking in writing.",
        "Indicative information shared before a signed agreement, including any budget ranges or timelines, is an estimate. Binding prices, service levels, and start dates are those stated in your service agreement.",
        "We may decline any enquiry or proposed engagement at our discretion, for example where a site does not meet the minimum camera, network, or access requirements for effective monitoring.",
      ],
      details: [
        {
          term: "No obligation",
          description:
            "Enquiries and consultations through this website are free and carry no obligation to subscribe to any service.",
        },
        {
          term: "Written agreement",
          description:
            "Fees, billing cycles, notice periods, and response commitments are fixed in the signed service agreement for each client site.",
        },
      ],
    },
    {
      id: "client-responsibilities",
      heading: "Client responsibilities",
      body: [
        "Effective monitoring depends on the condition of the site being monitored. Under a service agreement, clients are responsible for maintaining working cameras, adequate network connectivity, and lawful access to the premises being monitored.",
        "Clients warrant that all cameras connected to our monitoring are installed lawfully, that cameras do not intrude on areas where people have a reasonable expectation of privacy, and that recordings are handled in line with applicable law.",
        "> Cameras must never be positioned in private spaces such as bathrooms, changing rooms, or neighbouring private property. We reserve the right to decline or suspend monitoring of any camera feed that appears to breach privacy or the law.",
      ],
    },
    {
      id: "limitation-of-liability",
      heading: "Limitation of liability",
      body: [
        "Our monitoring services are a deterrent and a rapid human response layer. No monitoring service, including ours, can guarantee that incidents, loss, or damage will be prevented or detected in every case.",
        "To the fullest extent permitted by law, Your Tech Eye is not liable for indirect or consequential losses, including loss of profit, loss of business, theft, vandalism, or property damage arising from events at a monitored or unmonitored site, except where a signed service agreement expressly states otherwise.",
        "Nothing in these terms limits liability that cannot be limited by law. Commercial liability caps and any service credits are defined in the relevant service agreement.",
        "> We are a private monitoring company. We are not the police, a fire service, or an emergency medical provider. In any emergency you must always contact the national emergency services first.",
      ],
    },
    {
      id: "acceptable-use",
      heading: "Acceptable use of this website",
      body: [
        "You agree not to misuse this website. This includes attempting to gain unauthorised access to our systems, submitting false or misleading enquiries, using automated tools to spam the enquiry form, scraping content at disruptive volumes, or interfering with the availability of the site.",
        "We enforce rate limits and spam protection on the enquiry form and may block traffic or report abuse to the relevant authorities where necessary.",
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual property",
      body: [
        "The Your Tech Eye name, wordmark, website design, written content, and page structure are the property of Your Tech Eye and may not be copied, republished, or used commercially without our written permission.",
        "Photography and video on this website is licensed stock or public-archive material used illustratively; respective licences are recorded in the project media credits register. You may share links to our pages freely.",
      ],
    },
    {
      id: "third-party-links",
      heading: "Third-party links",
      body: [
        "Where this website links to external sites or services, those links are provided for convenience. We do not control third-party websites and are not responsible for their content, policies, or availability.",
      ],
    },
    {
      id: "termination",
      heading: "Suspension and termination",
      body: [
        "We may suspend or terminate website access for any user who breaches these terms. For paying clients, suspension or termination of monitoring services follows the notice and cure process set out in the service agreement.",
      ],
    },
    {
      id: "governing-law",
      heading: "Governing law and disputes",
      body: [
        "These terms are governed by the laws of the People's Republic of Bangladesh. The courts of Dhaka, Bangladesh have exclusive jurisdiction over any dispute arising from these terms or from the use of this website, subject to any dispute-resolution process agreed in a service agreement.",
        "Before starting formal proceedings we ask you to contact us first: most issues can be resolved directly and quickly.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to these terms",
      body: [
        "We may update these terms from time to time. The updated version is published on this page with a new \u201clast updated\u201d date and takes effect when published. Continued use of the website after publication means you accept the updated terms.",
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      body: [
        "Questions about these terms: email yourtecheye@gmail.com or call +8801780145132. You can also write to us at Dhanmondi, Dhaka, Bangladesh.",
      ],
    },
  ],
};

export default function TermsPage() {
  return <LegalPage {...pageProps} />;
}
