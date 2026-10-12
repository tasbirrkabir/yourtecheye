# 08 — SEO, Accessibility & Security

## 1. Technical SEO

- Unique page title and meta description for every indexable route.
- One clear H1 per page, logical H2/H3 hierarchy and descriptive link labels.
- Canonical URL on every indexable page.
- XML sitemap containing only canonical, public, useful routes.
- `robots.txt` configured for intended indexing; never block CSS/JS/media required to render the site.
- Human-readable URL slugs and correct 301 redirects from retired legacy URLs.
- Open Graph / social cards based on approved YTE assets.
- Descriptive image filenames, alt text and dimensions.
- Internal linking between overview pages and service details.
- Do not publish thin industry pages simply to target keywords.
- Do not create fake service areas or include location names without confirmed coverage.

## 2. Structured data

Use JSON-LD only for facts that are true and present on the page:
- `Organization` or an appropriate company type.
- `WebSite` and `BreadcrumbList`, where useful.
- `Service` for real services, with description that matches visible copy.
- `LocalBusiness` only if business type, address and local footprint are confirmed.
- `FAQPage` only for visible, real FAQs and only where the markup remains appropriate to search-engine guidelines.

Do not invent a street address, `aggregateRating`, reviews, opening hours, service areas, award, certification or price range. Don't mark up invisible content for rich results.

## 3. Suggested keyword/topic map

Validate against actual target market and Search Console before final SEO decisions:
- Primary brand: Your Tech Eye / YourTechEye.
- Core themes: surveillance and security solutions; remote video monitoring; CCTV monitoring; live audio intervention; 24/7 monitoring (only if service details substantiate the claim).
- Supporting educational intent: how remote video monitoring works; what live audio intervention means; questions to ask when selecting a monitoring provider.

Avoid keyword stuffing and pages based on terms the company doesn't actually provide.

## 4. Accessibility baseline

Aim for WCAG 2.2 AA where practicable.
- All content and controls work with keyboard.
- Visible focus indicators for links/buttons/inputs.
- Colour contrast meets relevant minimums (4.5:1 for normal text; 3:1 for large text and essential UI graphics where applicable).
- Don't rely on colour alone to indicate errors, state or selection.
- Labels are programmatically associated with fields.
- Validation errors are specific, local and announced.
- Heading order and landmarks are logical.
- Images have accurate alternative text; decorative images use empty alt.
- Videos with meaningful spoken content include captions/transcript. Ambient hero video is muted and decorative, with no essential information conveyed only by video.
- Motion respects `prefers-reduced-motion`.
- Touch targets are comfortable to activate and spaced to reduce accidental taps.
- Menu, accordion and modal (if any) support keyboard and assistive tech.

## 5. Privacy and form data

- Collect only contact details needed to fulfil the stated request.
- Provide a short privacy notice near the form and link to the real policy.
- Do not write a fake legal policy; have the owner approve jurisdiction, retention, processors and contact details.
- Use TLS/HTTPS and server-side form submission.
- Protect secrets and apply rate limiting/spam mitigation.
- Never put submitted messages, email or phone numbers into analytics event payloads.
- Configure retention and access controls for form submissions.
- Analytics/cookies should match the actual tools used and applicable consent obligations.

## 6. Security hygiene

- Validate/sanitise input; output-escape appropriately.
- Avoid dangerously rendering raw HTML in CMS content without sanitisation.
- Avoid exposing environment variables to client-side code.
- Restrict CORS and allowed origins where an API is used.
- Use dependency versions compatible with the project and review security advisories as part of launch.
- Do not embed real camera feeds or monitoring dashboards on public pages.
- Do not collect access credentials or sensitive details through the marketing form.

## 7. Performance targets

On representative production pages, aim for Google “good” Core Web Vitals where field data is available:
- LCP ≤ 2.5 s
- INP ≤ 200 ms
- CLS ≤ 0.1

Testing suggestions:
- Lighthouse mobile and desktop.
- PageSpeed Insights after deployment.
- Network throttling and low-end mobile emulation.
- Correct image priority; use a static hero on constrained devices if necessary.
- Remove unused libraries and fonts; avoid large background-video downloads on mobile.
