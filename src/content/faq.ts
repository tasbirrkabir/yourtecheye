/**
 * Site-wide FAQ, answers are grounded in verified official content only
 * (yourtecheye.com, captured 2026-10-12). Questions the business has not
 * published answers for (coverage areas, response SLAs, contracts) are
 * deliberately omitted rather than guessed.
 */
export interface Faq {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  heading: string;
  blurb: string;
  faqs: Faq[];
}

/**
 * Categorised FAQ used on the dedicated /faq page.
 * Every answer is grounded in verified official content (yourtecheye.com,
 * captured 2026-10-12) or in the implementation notes of this website.
 */
export const faqCategories: FaqCategory[] = [
  {
    id: "service-basics",
    heading: "Service basics",
    blurb: "What the monitoring service is and who it is for.",
    faqs: [
      {
        question: "What does Your Tech Eye monitor?",
        answer:
          "Your Tech Eye monitors CCTV camera feeds for businesses, properties, and homes, watching live for suspicious activity, verifying what is detected, and following an agreed escalation plan when something needs action.",
      },
      {
        question: "Is the monitoring service available 24/7?",
        answer:
          "Yes. Monitoring runs every hour of every day: sites stay under continuous live surveillance with real-time monitoring and active supervision.",
      },
      {
        question: "What kinds of sites do you work with?",
        answer:
          "Retail and grocery stores, warehouses and property sites, homes and private property, parking areas and vehicles, and care settings such as elderly or patient care. If your site has cameras or needs them, it can usually be monitored.",
      },
      {
        question: "What services do you offer beyond live monitoring?",
        answer:
          "Alongside live CCTV monitoring: live audio intervention through on-site speakers, emergency response escalation when a verified incident needs it, and playback footage monitoring, a professional review of recorded footage to investigate what happened.",
      },
    ],
  },
  {
    id: "setup-equipment",
    heading: "Setup and equipment",
    blurb: "What you need before monitoring can go live.",
    faqs: [
      {
        question: "Do I need to replace my existing cameras?",
        answer:
          "In most cases, no. YTE integrates with your existing CCTV system, or installs a complete monitoring solution tailored to your site where that is the better fit.",
      },
      {
        question: "What happens if my site has no speakers?",
        answer:
          "Live audio warnings require speakers connected to the monitoring system. If your site does not have audio hardware, YTE can include it in a monitoring solution, and until then incidents follow the standard alert and escalation process.",
      },
      {
        question: "Can I view my own cameras?",
        answer:
          "Yes. You get secure access to your cameras anytime, anywhere, from mobile, tablet, or PC, along with detailed reports and incident logs.",
      },
      {
        question: "Does the system record continuously?",
        answer:
          "Continuous recording is part of the surveillance solutions, for maximum security coverage. Storage can be cloud or on-site, whichever suits your site.",
      },
    ],
  },
  {
    id: "detection-response",
    heading: "Detection and response",
    blurb: "What happens when the monitoring spots something.",
    faqs: [
      {
        question: "What happens when suspicious activity is detected?",
        answer:
          "Activity is detected instantly and verified by a human operator. Then the agreed response follows: live audio warnings where speakers are installed, alerts to your nominated contacts, or escalation of the incident.",
      },
      {
        question: "Does a voice warning replace calling the authorities?",
        answer:
          "No. Audio intervention is one layer of the response. Incidents can still be escalated according to your site's agreed plan, which may include notifying keyholders or coordinating with authorities when needed.",
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
      {
        question: "Can you review footage from an incident that already happened?",
        answer:
          "Yes. Playback monitoring works with your recorded CCTV footage: provide the time window and context, and the relevant recordings are reviewed and reported with documented findings.",
      },
    ],
  },
  {
    id: "getting-started",
    heading: "Getting started",
    blurb: "Enquiries, consultations, and how the relationship begins.",
    faqs: [
      {
        question: "How do I request a consultation or a quote?",
        answer:
          "Use the contact form or call +8801780145132. A short conversation about your site, existing equipment, and concerns is all it takes to shape a suitable monitoring arrangement.",
      },
      {
        question: "What information should I prepare before contacting you?",
        answer:
          "It helps to know roughly how many cameras you have or plan to install, where the site is, what you want watched for, and how soon you want monitoring live. The enquiry form asks exactly these questions, and leaving optional fields blank is fine.",
      },
      {
        question: "Is there an obligation when I send an enquiry?",
        answer:
          "No. Enquiries and consultations are free and carry no obligation. Commercial terms are only ever confirmed in a written service agreement you sign.",
      },
      {
        question: "How does monitoring start after we agree?",
        answer:
          "First your cameras are connected, by integrating with your existing CCTV or installing the agreed solution. Then monitoring goes live with the escalation plan you agreed, and you keep full access to feeds, reports, and incident logs from day one.",
      },
    ],
  },
];

export const homeFaqs: Faq[] = [
  {
    question: "What does Your Tech Eye monitor?",
    answer:
      "Your Tech Eye monitors CCTV camera feeds for businesses, properties, and homes, watching live for suspicious activity, verifying what is detected, and following an agreed escalation plan when something needs action.",
  },
  {
    question: "Is the monitoring service available 24/7?",
    answer:
      "Yes. Monitoring runs every hour of every day: sites stay under continuous live surveillance with real-time monitoring and active supervision.",
  },
  {
    question: "Do I need to replace my existing cameras?",
    answer:
      "In most cases, no. YTE integrates with your existing CCTV system, or installs a complete monitoring solution tailored to your site where that is the better fit.",
  },
  {
    question: "What happens when suspicious activity is detected?",
    answer:
      "Activity is detected instantly and verified by a human operator. Then the agreed response follows: live audio warnings where speakers are installed, alerts to your nominated contacts, or escalation of the incident.",
  },
  {
    question: "How does live audio intervention work?",
    answer:
      "When operators spot suspicious activity on a site with audio equipment, they deliver a real-time verbal warning through on-site speakers. A live voice announcing the site is monitored is often enough to deter intruders before damage occurs.",
  },
  {
    question: "Can I view my own cameras?",
    answer:
      "Yes. You get secure access to your cameras anytime, anywhere, from mobile, tablet, or PC, along with detailed reports and incident logs.",
  },
  {
    question: "How do I request a consultation or a quote?",
    answer:
      "Use the contact form or call +8801780145132. A short conversation about your site, existing equipment, and concerns is all it takes to shape a suitable monitoring arrangement.",
  },
];
