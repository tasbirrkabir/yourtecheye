/**
 * Service content for Your Tech Eye.
 *
 * SOURCES: every service entry below is derived from the official live pages on
 * yourtecheye.com (captured 2026-10-12). Copy that could not be verified from an
 * official source is either omitted or wrapped in `ownerReview` notes.
 *
 * Each entry follows the technical spec: slug, title, summary, detail, image,
 * imageAlt, ctaLabel, sourceUrl, verification fields.
 */

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  slug: string; // legacy URL slug, routes are served at root level to preserve them
  title: string;
  navTitle: string;
  summary: string; // card copy, verified from official service listing
  tagline: string; // short benefit line shown on cards (from official copy)
  hero: string; // service-detail hero paragraph
  metaTitle: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  features: { title: string; detail: string }[];
  howItWorks?: { step: string; detail: string }[];
  scopeNote?: string; // operational boundaries, phrased honestly
  faqs: ServiceFaq[];
  sourceUrl: string; // official page the content was verified against
  verifiedAt: string;
  verificationStatus: "verified-official";
}

export const services: Service[] = [
  {
    slug: "surveillance-cctv-monitoring",
    title: "Surveillance & CCTV Monitoring",
    navTitle: "CCTV Monitoring",
    summary:
      "Reliable live CCTV monitoring solutions to keep your business, property, and operations protected at all times.",
    tagline: "Real humans watching your cameras",
    hero: "Live CCTV monitoring means your cameras are not just recording, they are being watched. Your Tech Eye keeps trained eyes on your feeds so that suspicious activity is noticed and verified while it is happening, not discovered on footage afterwards.",
    metaTitle: "Surveillance & CCTV Monitoring",
    metaDescription:
      "Live CCTV monitoring with real-time threat verification, intrusion detection, remote access and incident reporting for businesses and properties.",
    image: "/media/monitoring-operator-wall.webp",
    imageAlt:
      "Monitoring wall filled with live CCTV camera feeds, watched by a monitoring operator",
    features: [
      {
        title: "Real-time camera monitoring",
        detail:
          "Your cameras are monitored live by trained operators who watch for suspicious activity as it happens.",
      },
      {
        title: "Threat verification",
        detail:
          "Alerts are reviewed and verified by humans before any escalation, so real threats get attention and false alarms do not.",
      },
      {
        title: "Intrusion detection",
        detail:
          "Unauthorised entry, loitering, and perimeter activity are monitored and flagged according to your escalation plan.",
      },
      {
        title: "Remote surveillance access",
        detail:
          "Secure access to your cameras anytime, anywhere, from mobile, tablet, or PC.",
      },
      {
        title: "Incident reporting",
        detail:
          "Events and incidents are documented so you have a clear record of what happened and when.",
      },
    ],
    faqs: [
      {
        question: "Do you replace my existing cameras?",
        answer:
          "No. Your Tech Eye integrates with your existing CCTV system or installs a complete monitoring solution where needed, most existing setups do not need replacement.",
      },
      {
        question: "Is monitoring really 24/7?",
        answer:
          "Yes. Continuous monitoring is the core of the service: your site stays under live watch every hour of every day.",
      },
      {
        question: "What happens if something is spotted on my property?",
        answer:
          "Suspicious activity is verified by a human, and the agreed response follows: live audio warnings, alerts to your team, or escalation, based on the plan set up for your site.",
      },
    ],
    sourceUrl: "https://yourtecheye.com/surveillance-cctv-monitoring/",
    verifiedAt: "2026-10-12",
    verificationStatus: "verified-official",
  },
  {
    slug: "live-audio-intervention",
    title: "Live Audio Intervention",
    navTitle: "Live Audio Intervention",
    summary:
      "Stop threats before they escalate with live speaker warnings and instant intervention.",
    tagline: "A voice on site, before things escalate",
    hero: "Most intruders want an easy target. Live audio intervention puts a real human voice on your site at the moment it matters, through on-site speakers, a trained operator can deliver real-time verbal warnings that deter intruders and interrupt suspicious activity before it turns into loss or damage.",
    metaTitle: "Live Audio Intervention",
    metaDescription:
      "Live audio intervention delivers real-time verbal warnings through on-site speakers to deter intruders and interrupt threats as they happen.",
    image: "/media/dome-camera-detail.webp",
    imageAlt:
      "Close-up of a modern multi-sensor dome surveillance camera mounted on a building",
    features: [
      {
        title: "Real-time verbal warnings",
        detail:
          "When monitoring operators spot suspicious activity, they can speak through on-site speakers immediately, no recording, no delay.",
      },
      {
        title: "Intruder deterrence",
        detail:
          "A live voice announcing that the site is monitored is often enough to make intruders leave before damage occurs.",
      },
      {
        title: "Active threat interruption",
        detail:
          "Intervention happens during the incident, not after, while the situation can still be stopped or slowed.",
      },
      {
        title: "Remote communication systems",
        detail:
          "Audio hardware connects to the monitoring operation remotely, so intervention does not depend on anyone being physically on site.",
      },
    ],
    scopeNote:
      "Audio intervention depends on speakers being installed and connected at your site. Where audio hardware is not present, incidents follow the standard alert and escalation process instead.",
    faqs: [
      {
        question: "Who speaks through the speakers?",
        answer:
          "Trained monitoring operators watching your cameras deliver the warnings in real time.",
      },
      {
        question: "Does my site need special equipment?",
        answer:
          "Yes, live audio warnings require speakers connected to the monitoring system. If your site does not have audio hardware, YTE can include it in a monitoring solution, and incidents follow the standard escalation process in the meantime.",
      },
      {
        question: "Does the voice warning replace calling the authorities?",
        answer:
          "No. Audio intervention is one layer of the response. Incidents can still be escalated according to your site's agreed plan, which may include notifying keyholders or coordinating with authorities when needed.",
      },
    ],
    sourceUrl: "https://yourtecheye.com/live-audio-intervention/",
    verifiedAt: "2026-10-12",
    verificationStatus: "verified-official",
  },
  {
    slug: "emergency-response",
    title: "Emergency Response",
    navTitle: "Emergency Response",
    summary:
      "Instant alerts, escalation, and coordination with authorities when needed.",
    tagline: "Escalation that starts in seconds, not hours",
    hero: "When monitoring detects a verified incident, what happens next matters most. Emergency response turns a detected threat into an organised reaction: immediate alerts, escalation along an agreed plan, and coordination with the relevant authorities when the situation calls for it.",
    metaTitle: "Emergency Response & Escalation",
    metaDescription:
      "When monitoring detects an incident: instant alerts, escalation, and coordination with authorities when needed, fast action during emergencies.",
    image: "/media/parking-garage-night.webp",
    imageAlt: "Multi-level parking garage illuminated at night",
    features: [
      {
        title: "Emergency escalation",
        detail:
          "Verified incidents follow a documented escalation path agreed with you before monitoring goes live.",
      },
      {
        title: "Real-time incident response",
        detail:
          "Response starts while the incident is unfolding, alerts, live warnings, and escalation are triggered in real time.",
      },
      {
        title: "Security breach alerts",
        detail:
          "You and your nominated contacts are alerted quickly when a breach is verified at your site.",
      },
      {
        title: "Authority coordination",
        detail:
          "Where an incident needs more than remote response, YTE coordinates with the relevant authorities as part of the agreed plan.",
      },
      {
        title: "Fast action during emergencies",
        detail:
          "Clear roles and pre-agreed steps remove hesitation, the plan is already in place before anything happens.",
      },
    ],
    scopeNote:
      "Response actions follow the escalation plan agreed for each site. Coordination with authorities happens when an incident warrants it; response specifics (who is contacted, and when) are defined with you during setup.",
    faqs: [
      {
        question: "Does emergency response mean you call the police?",
        answer:
          "Where an incident genuinely requires it, YTE coordinates with the relevant authorities as part of your agreed escalation plan. The exact steps, who is contacted and in what order, are defined with you during setup, not improvised during an incident.",
      },
      {
        question: "Who gets alerted when something happens?",
        answer:
          "The contacts nominated in your escalation plan, for example keyholders, site managers, or owners, receive alerts when a breach is verified.",
      },
      {
        question: "How is an incident verified before escalation?",
        answer:
          "Suspicious activity is detected by monitoring, then verified by a human operator before the escalation process begins. This keeps false alarms from wasting response effort.",
      },
    ],
    sourceUrl: "https://yourtecheye.com/emergency-response/",
    verifiedAt: "2026-10-12",
    verificationStatus: "verified-official",
  },
  {
    slug: "playback-footage-monitoring",
    title: "Playback Footage Monitoring",
    navTitle: "Playback Footage Monitoring",
    summary:
      "Professional review and analysis of recorded CCTV footage to identify important events and suspicious activity.",
    tagline: "Answers found in your recordings",
    hero: "When you need to know what actually happened, last night, last week, or last month, playback footage monitoring turns hours of recordings into clear findings. Trained reviewers go through your recorded CCTV footage to identify important events, track specific incidents, and document what the cameras saw.",
    metaTitle: "Playback Footage Monitoring & Analysis",
    metaDescription:
      "Professional review and analysis of recorded CCTV footage: incident investigation, event tracking, evidence documentation and security reporting.",
    image: "/media/monitoring-room-illustrative.webp",
    imageAlt:
      "Interior of a monitoring room with operators reviewing footage on multiple screens (illustrative image)",
    features: [
      {
        title: "Incident investigation",
        detail:
          "Review of recorded footage around a known incident to establish what happened, when, and how.",
      },
      {
        title: "Event tracking",
        detail:
          "Systematic review to find specific events, arrivals, deliveries, movements, or suspicious activity, across your recordings.",
      },
      {
        title: "Suspicious behavior review",
        detail:
          "Patterns of suspicious behaviour that live monitoring flags for a closer look are analysed in the recordings.",
      },
      {
        title: "Evidence documentation",
        detail:
          "Relevant footage is identified, documented, and organised so it can support internal follow-up or be shared with authorities.",
      },
      {
        title: "Security reporting",
        detail:
          "Findings are summarised in a clear report so you can act on facts instead of guesswork.",
      },
    ],
    faqs: [
      {
        question: "Can you review footage from an incident that already happened?",
        answer:
          "Yes. Playback monitoring works with your recorded CCTV footage, provide the time window and context, and the relevant recordings are reviewed and reported.",
      },
      {
        question: "What do I receive after a review?",
        answer:
          "A clear security report documenting the relevant events and findings, with the supporting footage identified for follow-up or evidence use.",
      },
      {
        question: "Is this a substitute for live monitoring?",
        answer:
          "No, playback review looks at recordings after the fact, while live monitoring watches cameras in real time. Many sites use both: live monitoring for prevention, playback for investigation and follow-up.",
      },
    ],
    sourceUrl: "https://yourtecheye.com/playback-footage-monitoring/",
    verifiedAt: "2026-10-12",
    verificationStatus: "verified-official",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Surveillance & Security Solutions, the legacy "solutions" page (verified 2026-10-12). */
export const solutionsPage = {
  title: "Surveillance & Security Solutions",
  metaTitle: "Surveillance & Security Solutions",
  metaDescription:
    "End-to-end surveillance solutions: 24/7 real-time video monitoring, HD/4K cameras, remote access, motion alerts, secure storage and expert support for homes, offices, shops and warehouses.",
  intro:
    "Surveillance & Security Solutions covers the systems behind the monitoring: cameras, recording, alerts, and access. Whether YTE connects to your existing CCTV or supplies a complete setup, the goal is the same, a surveillance system that is watched, maintained, and ready to evidence what it sees.",
  capabilities: [
    {
      title: "24/7 real-time video monitoring",
      detail: "Cameras watched live by trained monitoring staff, every hour of every day.",
    },
    {
      title: "High-definition camera quality",
      detail: "HD, Full HD, and 4K camera options for clear, usable footage.",
    },
    {
      title: "Remote access",
      detail: "View your cameras from mobile, tablet, or PC, securely, anytime.",
    },
    {
      title: "Motion detection alerts",
      detail:
        "Motion triggers instant notifications so attention goes where it is needed.",
    },
    {
      title: "Secure cloud or local storage",
      detail: "Footage is stored the way that suits your site, cloud or on-site.",
    },
    {
      title: "Straightforward installation",
      detail:
        "Easy installation and a user-friendly control system, without complexity.",
    },
    {
      title: "Continuous recording",
      detail: "Continuous recording for maximum security coverage, every hour of every day.",
    },
    {
      title: "Wide site coverage",
      detail: "Protection for homes, offices, shops, and warehouses.",
    },
  ],
  sourceUrl: "https://yourtecheye.com/surveillance-security-solutions/",
} as const;

/** Verified how-it-works steps (from the official homepage). */
export const howItWorks = [
  {
    step: "Connect your cameras",
    detail:
      "We integrate with your existing CCTV system or install a complete monitoring solution tailored to your site. No replacement is needed for most existing setups.",
  },
  {
    step: "Monitoring goes live",
    detail:
      "Your site is placed under continuous live surveillance with real-time monitoring and active supervision. Every hour of every day.",
  },
  {
    step: "Threat detection & verification",
    detail:
      "Suspicious activity is detected instantly and verified through intelligent monitoring and human review for accuracy.",
  },
  {
    step: "Immediate response action",
    detail:
      "We take instant action through live warnings, alerts, or escalation to stop threats before they escalate.",
  },
  {
    step: "Reports & full access",
    detail:
      "Access detailed reports, incident logs, and live camera feeds anytime, from anywhere. Full visibility. Full control.",
  },
] as const;

/** Verified industries / environments from the official site. */
export const useCases = [
  {
    name: "Retail & grocery stores",
    need: "Theft, product damage, and operational losses are constant pressures on store margins.",
    benefit:
      "Intelligent retail surveillance keeps floors, tills, and stockrooms visible, with live verification when something looks wrong.",
    href: "/surveillance-cctv-monitoring",
  },
  {
    name: "Warehouses & property sites",
    need: "Large perimeters, valuable stock, and quiet after-hours windows make sites hard to watch.",
    benefit:
      "Live monitoring of perimeters, entrances, and loading areas keeps eyes on the site when staff are away.",
    href: "/surveillance-security-solutions",
  },
  {
    name: "Homes & private property",
    need: "Families want to know home is being watched, whether they are home or away.",
    benefit:
      "Smart home surveillance and monitoring designed to help protect your property, family, and peace of mind.",
    href: "/surveillance-cctv-monitoring",
  },
  {
    name: "Parking & vehicles",
    need: "Parking areas are a common target for break-ins, vandalism, and after-hours activity.",
    benefit:
      "Camera coverage of parking and vehicle areas, monitored live so incidents are seen and addressed as they happen.",
    href: "/surveillance-cctv-monitoring",
  },
  {
    name: "Elderly & patient care",
    need: "Care settings need an extra layer of oversight for the wellbeing of the people in them.",
    benefit:
      "Discreet monitoring supports safer care environments, with alerts when activity needs attention.",
    href: "/contact",
  },
] as const;

/** Trust strip facts, all verifiable from the official site. */
export const trustStrip = [
  { title: "24/7 coverage", detail: "Always-active monitoring" },
  { title: "Rapid response", detail: "Action within seconds" },
  { title: "High accuracy", detail: "Verified threat detection" },
  { title: "Total transparency", detail: "Complete client access" },
] as const;

/** Hero bullet points, verified from the official homepage. */
export const heroPoints = [
  "Live monitoring every hour of every day",
  "Instant threat detection and real-time alerts",
  "Live audio warnings to deter intruders",
  "Rapid human response and escalation",
  "Secure access to your cameras anytime, anywhere",
] as const;

/** "Why active monitoring matters", verified from the official homepage. */
export const proactivePoints = [
  "Real humans monitor your cameras",
  "Immediate threat verification",
  "Live intervention during incidents",
  "Faster emergency response",
  "Reduced operational losses",
] as const;
