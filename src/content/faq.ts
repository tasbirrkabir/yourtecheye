/**
 * Site-wide FAQ — answers are grounded in verified official content only
 * (yourtecheye.com, captured 2026-10-12). Questions the business has not
 * published answers for (coverage areas, response SLAs, contracts) are
 * deliberately omitted rather than guessed.
 */
export interface Faq {
  question: string;
  answer: string;
}

export const homeFaqs: Faq[] = [
  {
    question: "What does Your Tech Eye monitor?",
    answer:
      "Your Tech Eye monitors CCTV camera feeds for businesses, properties, and homes — watching live for suspicious activity, verifying what is detected, and following an agreed escalation plan when something needs action.",
  },
  {
    question: "Is the monitoring service available 24/7?",
    answer:
      "Yes. Live 24-hour monitoring, day and night, is the core of the service — sites stay under continuous surveillance with real-time monitoring and active supervision.",
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
      "Yes. You get secure access to your cameras anytime, anywhere — from mobile, tablet, or PC — along with detailed reports and incident logs.",
  },
  {
    question: "How do I request a consultation or a quote?",
    answer:
      "Use the contact form or call +8801780145132. A short conversation about your site, existing equipment, and concerns is all it takes to shape a suitable monitoring arrangement.",
  },
];
