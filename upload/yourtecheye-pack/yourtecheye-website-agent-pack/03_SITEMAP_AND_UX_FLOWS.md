# 03 — Sitemap & UX Flows

## 1. Recommended sitemap

Build the shortest useful set of pages first. Add new pages only when verified service content supports them.

```text
/
├── /about/                              (if an official About page/content exists)
├── /services/
│   ├── /surveillance-security-solutions/
│   └── /live-audio-intervention/
├── /industries/                          (optional; only confirmed segments)
│   └── /industries/[slug]/               (optional; only with unique content)
├── /contact/
├── /privacy/                             (based on a reviewed, applicable policy)
└── /404/
```

**Migration rule:** first inspect the actual old sitemap, WordPress routes and linked navigation. Preserve important existing URLs whenever possible. The two service slugs above are already surfaced in official indexed URLs, so treat them as high-priority URL candidates. Do not delete or rename a legacy route without redirects and a documented reason.

## 2. Global header

Desktop:
- Official logo/wordmark, left.
- Links: Home, About, Services (dropdown), Contact.
- One primary CTA: “Discuss Your Site” or “Request a Consultation.”

Mobile:
- Logo + accessible menu trigger.
- Clear top-level CTA inside menu and optional call action.
- No tiny desktop navigation squeezed onto mobile.

Header behavior:
- At the top, restrained transparent or light background depending on hero contrast.
- After scroll, switch to a solid surface with sufficient contrast; keep the change subtle.
- Ensure logo contrast remains good in every header state.

## 3. Homepage section sequence

1. **Hero:** strong headline, one short supporting paragraph, primary CTA, secondary service-exploration link, compelling licensed visual. No unsupported statistics.
2. **Trust / clarity strip:** concise service facts that can be substantiated (for example, the service is monitoring-oriented; 24/7 only if current and accurate). Do not fabricate logos or certification marks.
3. **The problem YTE solves:** show uncertainty around blind spots, unattended sites and delayed awareness without alarmist messaging.
4. **Core services:** cards for verified services—Surveillance & Security Solutions, Live Audio Intervention, and 24/7 Monitoring if this is a distinct offer rather than merely a capability. Avoid duplicate cards for overlapping concepts.
5. **How it works:** 3–4 human-readable steps based on YTE's real workflow. Suggested structure: assess site/needs → configure or connect eligible systems → monitor/verify activity → follow the agreed escalation process. Confirm exact operations with YTE before final copy.
6. **Use cases:** only confirmed sites/industries. If exact verticals are uncertain, phrase this as needs (“perimeter visibility”, “after-hours site monitoring”) rather than claiming industry specialism.
7. **Operational clarity:** explain what a client supplies, what YTE does, what alerts trigger, what a response means, and what falls outside the service—once confirmed.
8. **Proof section:** approved case study, actual site/project photos or founder/team introduction. If no trustworthy proof exists, replace with process transparency, not fake testimonials.
9. **FAQ:** answer practical buyer questions with verified facts.
10. **Final CTA:** concise call to discuss a site/security requirement.
11. **Footer:** logo, short verified positioning, contact details, page links, privacy link and verified social profiles.

## 4. Services overview page

- Page intro explaining the offering in plain English.
- Service cards grouped logically: visual monitoring/surveillance, live intervention, and any verified supporting services.
- Each card states: what it is, who it helps, the likely outcome, and a CTA to details/enquiry.
- A “Help me choose” CTA can link to Contact with service interest preselected.
- Do not invent service packages or pricing.

## 5. Service detail page template

Use a reusable page template, with unique copy for every service:

1. Breadcrumb.
2. Service-specific hero: title, concise benefit, CTA and relevant visual.
3. What it is / when it is useful.
4. How it works (only steps verified for this service).
5. Capabilities and operational boundaries.
6. Requirements/compatibility or deployment considerations, if documented.
7. Related services.
8. FAQ specific to the service.
9. Contact CTA, preselecting the requested service.

### Surveillance & Security Solutions

Use the verified legacy page at `/surveillance-security-solutions/` as the content source. Confirm whether the page covers equipment, remote viewing, live monitoring, installation, system integration or maintenance; do not assume all of these are included.

### Live Audio Intervention

Use `/live-audio-intervention/` as the source. Indexed text mentions real-time verbal warnings and intruder deterrence. Confirm hardware requirements, who speaks, operational hours, service eligibility, escalation rules and availability before publishing these details.

## 6. About page

- Purpose and mission in grounded terms.
- How the company approaches monitoring and intervention.
- Real team/founder information only if available and approved.
- Values expressed as observable working principles (clarity, vigilance, accountability) rather than unsupported superlatives.
- Do not invent founding year, office location, years of experience, team size or certifications.

## 7. Contact page

- Friendly concise heading and explanation of what happens after contact.
- Verified phone/email with click-to-call and mailto.
- Accessible form with service-interest dropdown and optional context field.
- Expected response-time language only if the business has approved a realistic SLA.
- If location/coverage is relevant, ask for the site location and explain why. Do not publish a map or address unless confirmed.

## 8. Main user flows

### Flow A — high-intent service buyer
Home → service card → service details → “Discuss Your Site” → form → honest confirmation.

### Flow B — immediate phone enquiry
Home/service page → phone CTA → device dialler.

### Flow C — undecided visitor
Home → “How it works” → FAQ → Contact → choose a service or describe the concern.

### Flow D — mobile visitor
Land on page → understand value within the first viewport → tap prominent CTA or call → complete a short mobile form.

## 9. Conversion rules

- One primary CTA label consistently used across the site.
- Secondary CTA should be lower emphasis (“Explore Services” / “How It Works”).
- Keep CTAs descriptive; avoid meaningless labels like “Click Here.”
- Form fields should be minimal. Ask only for information needed to follow up.
- No modal on initial page load, no fabricated urgency, no fake countdown, no intrusive popups.
