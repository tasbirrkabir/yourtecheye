# Your Tech Eye — Website Rebuild Agent Pack

**Purpose:** Build a polished, premium, trust-first website for Your Tech Eye (YTE), using the existing official site as the source of truth for its logo, brand assets, service information, contact details and existing copy. Use ECAM only as a reference for information architecture and conversion flow—not as a visual template.

## What is inside

- `01_RESEARCH_AND_SOURCE_AUDIT.md` — what was researched, confirmed findings, blockers and source-of-truth rules.
- `02_PRODUCT_REQUIREMENTS.md` — goals, audiences, requirements, conversion goals and non-goals.
- `03_SITEMAP_AND_UX_FLOWS.md` — page map, navigation and visitor journeys.
- `04_VISUAL_DESIGN_SYSTEM.md` — art direction, design tokens, components and interaction rules.
- `05_CONTENT_STRATEGY_AND_MIGRATION.md` — content model, migration rules and page-by-page copy framework.
- `06_MEDIA_RESEARCH_AND_ASSET_MANIFEST.md` — image/video sourcing, licensing rules, asset list and media workflow.
- `07_TECHNICAL_IMPLEMENTATION.md` — implementation architecture, responsive behavior, forms and performance.
- `08_SEO_ACCESSIBILITY_AND_SECURITY.md` — technical SEO, accessibility, privacy and security requirements.
- `09_QA_AND_ACCEPTANCE_CRITERIA.md` — functional, visual, content and device-level test cases.
- `10_LAUNCH_AND_HANDOVER.md` — release process, ownership and handoff checklist.
- `SOURCE_REGISTER.md` — URLs and how each source may be used.
- `AGENT_MASTER_PROMPT.md` — the primary prompt to give a coding agent.

## Recommended workflow

1. Open `AGENT_MASTER_PROMPT.md` and paste it into your coding agent with access to the project repository, browser, and terminal/network where available.
2. Give the agent the project repo and permission to inspect the existing site and its public pages. If the original site remains unavailable, do not invent missing facts; use the documented fallback procedure.
3. Ask the agent to implement, not merely return a plan. It should produce a working site, collect properly licensed visual assets, test routes and forms, and update the handover docs.
4. Review all business facts, service scope, response guarantees, company claims, legal statements and contact details before launch.

## Important research note

Research performed on **12 October 2026** identified official-site search-index snippets, but direct retrieval of `yourtecheye.com` returned a 502 error in the research environment. Findings below are therefore **provisional source leads**, not a claim that every page was fully crawled. The coding agent must retry the official website in a real browser and inspect its linked pages and media library. The reference site `ecam.com` was readable and was used to study its content flow.

## Known public details to re-verify before publishing

- Brand: **Your Tech Eye** (also seen as YourTechEye / YTE).
- Positioning from search-indexed homepage snippet: modern monitoring and technology company providing smart, secure and reliable protection solutions for businesses, properties and families.
- Service themes surfaced on official pages: CCTV and advanced surveillance, 24/7 monitoring services, live audio intervention, emergency response.
- Contact phone surfaced on official service page: **+8801780145132**.
- Email surfaced on official service page: **yourtecheye@gmail.com**.
- Official URLs: `https://yourtecheye.com/`, `https://yourtecheye.com/surveillance-security-solutions/`, `https://yourtecheye.com/live-audio-intervention/`.

These details must be rechecked against the live site or confirmed by the business owner. Do not invent address, service regions, response times, certifications, crime-reduction percentages, customers, testimonials or performance guarantees.
