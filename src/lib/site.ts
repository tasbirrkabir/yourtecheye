/**
 * Central site configuration for Your Tech Eye.
 * Every value here is verified from the official site (yourtecheye.com) on 2026-10-12,
 * or explicitly marked as requiring owner confirmation.
 * Update this file to change contact details site-wide.
 */
export const site = {
  name: "Your Tech Eye",
  shortName: "YTE",
  tagline: "Detect Early. Prevent Instantly.",
  url: "https://yourtecheye.com",
  description:
    "Your Tech Eye provides 24/7 CCTV and surveillance monitoring with real human response — live threat detection, audio intervention, and escalation to help protect businesses, properties, and families.",
  contact: {
    phone: "+8801780145132",
    phoneHref: "tel:+8801780145132",
    email: "yourtecheye@gmail.com",
    emailHref: "mailto:yourtecheye@gmail.com",
    // Verified as the location shown on the official contact page.
    location: "Dhanmondi, Dhaka, Bangladesh",
    // Owner-approval pending: WhatsApp is NOT linked until YTE confirms the number is WhatsApp-enabled.
    whatsapp: null as string | null,
  },
  socials: [] as { label: string; href: string }[],
} as const;

export const primaryCta = "Discuss Your Site";
export const secondaryCta = "Explore Our Services";
