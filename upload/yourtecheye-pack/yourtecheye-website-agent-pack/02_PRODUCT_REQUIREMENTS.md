# 02 — Product Requirements Document

## 1. Project summary

Rebuild the public-facing website for **Your Tech Eye (YTE)** as a polished, modern, high-trust website for remote video monitoring and surveillance-related services. It should explain the offer quickly, demonstrate competence honestly, reduce buyer uncertainty and convert qualified visitors into calls or service enquiries.

## 2. Business goals

1. Make the service model understandable within the first screen and first scroll.
2. Increase qualified enquiries for the services YTE genuinely offers.
3. Establish confidence using real brand assets, precise service explanations, meaningful process detail and clear contact paths.
4. Make it easy for different property and business decision-makers to identify the relevant solution.
5. Create a maintainable foundation for future case studies, industries, service expansions and content publishing.

## 3. Primary audiences

Audience segments are working hypotheses; the business should confirm which segments are highest value.

- **Business/property owners and operators:** need better visibility, deterrence and less uncertainty around site security.
- **Security companies / system integrators:** may need a monitoring partner or support model; confirm this potential segment with YTE before making it a headline proposition.
- **Operations, facilities and site managers:** want to understand coverage, installation requirements, monitoring operation and incident escalation.
- **Residential property/community decision-makers:** should be targeted only if YTE confirms residential/community coverage.

## 4. Desired user impression

“Professional, alert, technically capable, dependable, straightforward and easy to contact.”

The experience should feel premium and calm, not theatrical, paranoid, overly militaristic or like a generic CCTV template.

## 5. Primary conversions

- **Primary:** request a consultation / ask about a site / request a quote.
- **Secondary:** call YTE from a mobile device.
- **Secondary:** email YTE.
- **Optional, if confirmed and functional:** WhatsApp enquiry.
- **Supporting:** click into a service detail page, view an approved process explanation, or view a genuine project/case study.

Track successful actions, not just CTA clicks: form submission confirmation, `tel:` click, email click and confirmed WhatsApp click.

## 6. Functional requirements

### Navigation

- Responsive header with logo, primary links and one unmistakable CTA.
- Clear navigation for Home, About, Services and Contact. Add Industries/Resources only if content is real and useful.
- Dropdowns must work by keyboard and touch, not hover alone.
- Mobile menu must trap no user in the menu; support Escape, visible close action and focus handling.

### Service discovery

- A summary of the core services on Home.
- A Services overview that explains outcomes and links to each verified detail page.
- Detailed pages for every service already present and valid on the official site, particularly Surveillance & Security Solutions and Live Audio Intervention where verified.
- Avoid service pages that merely repeat a title with no useful information.

### Enquiry path

- Short, accessible request form: name, business/organization (optional unless needed), email or phone (at least one required), service interest, site/project location (only if needed for qualification), message, privacy acknowledgement when legally/operationally required.
- Clear inline errors, server validation, loading state, success state and error state.
- Confirmation must never appear unless submission actually succeeds.
- Send submissions to a real configured destination or CRM. If no destination exists, visibly mark the form as not live in development and request configuration; do not silently discard leads.
- Provide call and email fallbacks.

### Media and visuals

- Use the official logo and all brand assets that are appropriate and authorized.
- Collect original or correctly licensed still images and video clips relevant to surveillance monitoring, security cameras, facilities and operator workflows.
- Keep asset-source and license records.
- Do not use competitor assets, copied testimonials, stock photos that imply YTE staff/customers, or fake customer logos.

### Content operations

- Keep service copy, contact details, SEO metadata and image credits easy to update.
- Prefer a content file/data structure or existing CMS over repeated hardcoding.
- Preserve legacy URLs where appropriate or create 301 redirects if slugs must change.

## 7. Non-functional requirements

- Mobile-first, fully responsive at 360 px and above.
- High-performance; prioritize Core Web Vitals, compressed media and minimal JavaScript.
- Semantic HTML, keyboard navigation, visible focus, captions/transcripts where applicable, reduced-motion support and suitable colour contrast.
- Search-indexable content, descriptive page metadata, canonical URLs, sitemap and robots.txt.
- HTTPS, validation, spam mitigation and privacy-conscious analytics.
- No console errors, broken links, layout overflow or unresolved image requests.

## 8. Brand and creative requirements

- The design must be materially more polished and distinctive than the current site.
- ECAM is a reference for **content flow** only. Do not reproduce its exact design.
- Use real photography/video as supporting evidence; avoid clichéd green matrix effects, giant glowing eyes, excessive lens flares, random security HUD overlays or stock images in every card.
- Give content room to breathe, keep the site scannable and use motion sparingly.
- The final visual system should suit a credible B2B security/monitoring technology company and not resemble an e-commerce shop or a generic AI SaaS landing page.

## 9. Suggested success indicators

Do not invent targets before analytics baseline exists. Record baseline first, then monitor:

- Qualified enquiry conversion rate.
- Form completion and error rate.
- Click-to-call/email rates on mobile.
- Service-detail page visits and CTA progression.
- Mobile usability and Core Web Vitals.
- Organic search impressions for the services and locations YTE actually serves.

## 10. Explicit non-goals for the first release

- Customer login or camera dashboard unless one exists and requirements are supplied.
- Live CCTV stream embedded on the marketing website.
- Payment or subscription checkout.
- Fabricated analytics dashboards, simulated live alerts or fake incident feeds.
- Unsupported guarantees, made-up awards, made-up testimonials or invented customer metrics.
