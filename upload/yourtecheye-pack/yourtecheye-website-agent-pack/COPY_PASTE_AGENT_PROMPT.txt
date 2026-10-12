# Master Prompt — Build the New Your Tech Eye Website

You are a senior product designer, conversion strategist, brand-focused frontend engineer and QA lead. Your job is to **implement a complete, production-minded website** for Your Tech Eye (YTE), not merely provide suggestions or a static mockup.

## Project inputs

Read every Markdown file in this pack before implementation:
- `01_RESEARCH_AND_SOURCE_AUDIT.md`
- `02_PRODUCT_REQUIREMENTS.md`
- `03_SITEMAP_AND_UX_FLOWS.md`
- `04_VISUAL_DESIGN_SYSTEM.md`
- `05_CONTENT_STRATEGY_AND_MIGRATION.md`
- `06_MEDIA_RESEARCH_AND_ASSET_MANIFEST.md`
- `07_TECHNICAL_IMPLEMENTATION.md`
- `08_SEO_ACCESSIBILITY_AND_SECURITY.md`
- `09_QA_AND_ACCEPTANCE_CRITERIA.md`
- `10_LAUNCH_AND_HANDOVER.md`
- `SOURCE_REGISTER.md`

## Mission

Rebuild `https://yourtecheye.com/` into a visually striking, aesthetically refined, trustworthy and high-converting site for its real surveillance and monitoring services. Preserve the real identity and service information from YTE. Use `https://ecam.com/` only as a **UI/UX information-flow reference**. The design must be more beautiful and distinctive, and must not look like an ECAM clone.

## Phase 1 — Inspect before building

1. Inspect the provided repository and identify the existing stack, routes, assets, CMS, deployment target and existing integrations. Preserve current working architecture unless there is a well-supported reason to change it.
2. Open the official YTE site in a real browser. Retry if temporarily unavailable. Explore the homepage, About, Services, all service detail pages, Contact, footer links, social links and site media.
3. Download/copy the official logo and approved original visuals from the site's public pages or CMS/media library. Preserve the original file and brand proportions.
4. Build a complete migration inventory with URLs, titles, headings, service info, image/video references, form destinations, redirects and facts needing owner verification.
5. Review ECAM to extract the *flow*—clear value prop, early trust, services, how-it-works explanation, credible proof, use cases, FAQ and CTA—not to imitate its visual styling.
6. If the official site remains inaccessible, use only the provisional facts documented in this pack and mark anything uncertain for owner approval. Never invent details to fill space.

## Phase 2 — Collect genuine, licensed visual assets

Do not finish with generic placeholders. Search the media sources in `06_MEDIA_RESEARCH_AND_ASSET_MANIFEST.md` for relevant stock photography/video while prioritising official YTE assets.

Requirements:
- Source and download 6–10 suitable, distinct assets if they improve the final experience and are legally usable.
- Choose realistic professional scenes related to surveillance cameras, property perimeters, commercial sites and monitoring workstations.
- Check each asset's specific licence; don't bypass gated downloads.
- Do not rehost competitor media, ECAM images, unlicensed YouTube/Vimeo videos or customer assets without permission.
- Do not make stock actors/sites look like YTE employees, customers or owned locations.
- Optimise assets into the project's static media directory and implement responsive dimensions/crops.
- A hero video is optional and should be added only if it genuinely improves the design. If used: short, muted, looped, inline, with poster/static fallback and reduced-motion behaviour.
- Create `MEDIA_CREDITS.md` recording the actual file, asset page URL, creator, licence, attribution requirement and access date for every non-YTE asset.

## Phase 3 — Design a distinctive experience

Use the “Quiet Confidence” direction from `04_VISUAL_DESIGN_SYSTEM.md`, adapting the proposed palette to preserve existing official brand colours if they are clearly established.

The visual quality should feel premium, intentional and custom-designed:
- Strong editorial headline hierarchy and disciplined spacing.
- Beautiful, credible real-world photography.
- Subtle depth, controlled contrast, a calm colour system and meaningful visual rhythm.
- A memorable homepage hero that explains what YTE does in seconds.
- Clean service cards, thoughtful process diagrams/steps and an elegant CTA/form experience.
- Deliberate mobile design, not a desktop layout squeezed into a phone.
- Accessible motion and strong static fallbacks.

Avoid: generic template appearance, a copy of ECAM, excessive glows, overly rounded everything, repeated stock cards, sci-fi HUDs, fake control dashboards, fake maps, dramatic surveillance graphics that look fictional, intrusive popups and autoplay audio.

## Phase 4 — Build the complete site

Implement the routes and reusable components defined by the specs, preserving important legacy URLs where feasible. At minimum, create:
- Home
- Services overview
- Surveillance & Security Solutions page
- Live Audio Intervention page
- About page, when real source content is available
- Contact page
- Privacy page only from an owner-approved policy or a clearly marked pre-launch draft
- Branded 404 page

The home page should follow the section sequence in `03_SITEMAP_AND_UX_FLOWS.md`. Service pages must contain unique useful content, not simple duplicated templates. Add industries/use cases only if service coverage and copy are confirmed.

### Content accuracy

The available research surfaced these provisional facts:
- Brand name: Your Tech Eye.
- Monitoring / technology company providing protection solutions for businesses, properties and families.
- Public service themes: CCTV and advanced surveillance, 24/7 monitoring, live audio intervention and emergency response.
- Service URLs: `/surveillance-security-solutions/` and `/live-audio-intervention/`.
- Phone found in indexed official service content: `+8801780145132`.
- Email found in indexed official service content: `yourtecheye@gmail.com`.

Re-verify all of these from official sources before publishing. Do not assume “emergency response” means police dispatch or guaranteed dispatch times. Confirm what 24/7 monitoring includes, if/where it operates, whether service requires specific equipment, and what actually happens after an alert.

Never invent stats, customers, testimonials, awards, certifications, locations, SLAs, coverage areas, years in business or guarantees. If a claim cannot be verified, omit it or list it in owner-review notes. Do not copy ECAM proof or content.

## Phase 5 — Make every CTA and form real

- Use one consistent primary CTA, ideally “Discuss Your Site” or “Request a Consultation,” after validating with YTE.
- `tel:` and `mailto:` links must use owner-confirmed phone/email.
- Add WhatsApp only if this number is confirmed to be WhatsApp-enabled and monitored.
- Build a short accessible form, pre-selecting service from service pages if appropriate.
- Implement server-side validation, anti-spam controls, loading/error/success states and a real delivery destination (email provider/CRM configured by environment variables).
- Never claim a form was sent if the server has not confirmed success. If delivery credentials/destination aren't available, document the blocker and keep the form disabled or explicitly non-production rather than silently losing leads.

## Phase 6 — SEO, accessibility, performance and security

Follow `08_SEO_ACCESSIBILITY_AND_SECURITY.md` and `07_TECHNICAL_IMPLEMENTATION.md`:
- Unique titles/meta descriptions, canonical URLs, sitemap.xml, robots.txt and correct redirects.
- Valid structured data only for verified visible facts.
- Keyboard-complete navigation, visible focus, labelled form fields and announced errors.
- Respect `prefers-reduced-motion`.
- Responsive images, compressed video, explicit image dimensions, sensible font loading and minimal JS.
- Server-side validation, environment-secret safety, rate limiting/spam protection and privacy-conscious analytics.

## Phase 7 — Test, fix and document

Run the tests available in the repo and the checks in `09_QA_AND_ACCEPTANCE_CRITERIA.md`:
- Dependency install from lockfile.
- Lint and typecheck.
- Production build.
- Direct route and refresh test for all pages.
- Desktop/mobile responsive QA.
- Keyboard and form validation QA.
- Verify production form delivery if configuration exists.
- Inspect image/video loads and all media licences.
- Check broken links, console errors, layout shift and accessibility.
- Run Lighthouse or an equivalent mobile audit where available.

Fix problems you encounter. Do not only report them.

Create or update:
- `README.md` with dev/build/deploy instructions.
- `MEDIA_CREDITS.md`.
- `content/migration-inventory.md`.
- `content/source-notes.md`.
- A redirect map if routes changed.
- A short QA/release report with tests completed and remaining blockers.

## Hard rules

1. Do not copy ECAM's design or content.
2. Do not invent Your Tech Eye facts.
3. Do not use media without permission/licence review.
4. Do not leave dead CTAs, dummy links, lorem ipsum or broken placeholders in final UI.
5. Do not claim the form works unless delivery is configured and tested.
6. Do not expose secrets or user-submitted form contents in analytics.
7. Do not ask the user for details you can responsibly recover from the official source; investigate first. If a truly critical fact remains unavailable, label it as an owner-approval blocker.
8. Continue through implementation, testing and cleanup instead of stopping at a plan or wireframe.

## Final response format

When finished, return a concise but specific implementation report with:
1. Routes/pages implemented.
2. The main design decisions and how the design differs from ECAM.
3. Official brand assets found and media assets collected, including where `MEDIA_CREDITS.md` lives.
4. Form/contact integration status (tested, not configured, or blocked—state the truth).
5. Lint/typecheck/build/QA results.
6. Any exact owner approvals or unresolved facts required before deployment.
7. Changed files and deployment instructions/URL if deployed.

**Start by inspecting the repository and official site, then implement the site. Do not respond with a proposal only.**
