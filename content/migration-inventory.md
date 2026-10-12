# Migration Inventory — yourtecheye.com → rebuild

**Source captured:** 12 October 2026 (live site, via real browser after ALTCHA verification)
**Destination stack:** Next.js 16 App Router (this repository)

## 1. Page inventory

| # | Current URL | Page title (old) | New URL | Status | Notes |
|---|---|---|---|---|---|
| 1 | `/` | Home - Your Tech Eye | `/` | Migrated & rewritten | All sections rebuilt; template leftovers removed |
| 2 | `/about/` | About - Your Tech Eye | `/about` | Migrated | "Welcome to The Digital Agency" leftover heading dropped; real YTE copy preserved |
| 3 | `/services/` | Services | `/services` | Migrated & rewritten | Old page listed Data Entry / Web Design / App Design / Social Media — template leftovers, excluded (see §4) |
| 4 | `/surveillance-cctv-monitoring/` | Surveillance & CCTV Monitoring | `/surveillance-cctv-monitoring` | Migrated (legacy URL preserved at root) | 5 verified features carried over |
| 5 | `/emergency-response/` | Emergency Response | `/emergency-response` | Migrated (legacy URL preserved) | Wording kept honest: "coordination with authorities when needed" |
| 6 | `/live-audio-intervention/` | Live Audio Intervention | `/live-audio-intervention` | Migrated (legacy URL preserved) | 4 verified features + hardware dependency noted |
| 7 | `/playback-footage-monitoring/` | Playback Footage Monitoring | `/playback-footage-monitoring` | Migrated (legacy URL preserved) | 5 verified features |
| 8 | `/surveillance-security-solutions/` | Surveillance & Security Solutions | `/surveillance-security-solutions` | Migrated (legacy URL preserved) | Old intro contained data-entry template text — replaced; 9 verified capability bullets carried over |
| 9 | `/contact/` | Contact Us | `/contact` | Migrated | Old page had a form posting to the WP backend; new form → `/api/contact` |
| 10 | `/benefits/`, `/why-it-matters/`, `/security-benefits-warehouse/`, `/why-it-matters-warehouse-2/` | Security Benefits / Why It Matters | — | Not migrated | Partially-empty template sections on the old site; their ideas folded into Home "problem" + "operational clarity" sections |

## 2. Facts carried over (with sources)

| Fact | Source URL | Used in |
|---|---|---|
| Tagline "Detect Early. Prevent Instantly." | Official logo + home hero | Header/footer/OG, Home hero |
| 4 core services + summaries | Home "Services" section + each service page | Home, /services, detail pages |
| Service features (each list) | Each legacy service page | Detail pages |
| How-it-works 5 steps | Home "How It Works" | Home, /services |
| Trust strip (24/7, rapid, accuracy, transparency) | Home trust strip | Home |
| Hero bullet points (6) | Home hero | Home |
| "Traditional CCTV only records…" positioning | Home "Why active monitoring matters" | Home problem section |
| Industries: retail, warehouse, homes, parking, elderly care | Home "Industries we protect" | Home use-cases |
| Team: Matthew Brown (CEO), Syed Mahdi (COO), Md Alamin (Head of HR) | Home "Our Team" + About | /about |
| Mission + What-we-do + Why-choose-us | /about | /about |
| Phone +8801780145132 | Service page snippets + footer | Site-wide |
| Email yourtecheye@gmail.com | Footer + contact page | Site-wide |
| Location "Dhanmondi, Dhaka" | /contact/ | /contact |
| "24/7 Monitoring Services" | Footer | /contact, /about |
| Surveillance capabilities (HD/4K, motion alerts, cloud/local storage…) | /surveillance-security-solutions/ | Solutions page |

## 3. URLs & redirects

- Legacy service URLs are preserved **exactly**, served at root level (`/surveillance-cctv-monitoring`, `/emergency-response`, `/live-audio-intervention`, `/playback-footage-monitoring`, `/surveillance-security-solutions`).
- Trailing-slash variants (`/about/`) are 308-redirected to clean paths by Next.js automatically — no manual redirect map needed for those.
- `robots.txt` and `sitemap.xml` are generated (`/robots.txt`, `/sitemap.xml`); sitemap lists exactly the canonical routes above.
- `/privacy` is new (no legacy equivalent found) and set `noindex` while in draft.

## 4. Deliberately excluded (template leftovers on the old site — owner review requested)

1. **Digital-agency services** on `/services/`: Data Entry, Web Design, App Design (UI/UX), Social Media Management — these contradict the surveillance positioning and sat next to lorem-ipsum text ("We provide professional web solutions to help your business succeed online"). **Excluded from the new site.** If YTE genuinely sells these, they need their own page and owner confirmation.
2. **"Welcome to The Digital Agency"** heading on `/about/` — leftover from a theme demo.
3. **"We provide reliable and end-to-end property management data entry…"** intro on `/surveillance-security-solutions/` — contradicts the page's own feature list; replaced with real solutions copy.
4. **Property Management Services** (duplicated twice) and **Data Analysis for Business Insights** in About "What we do" — kept in the new About only where clearly business-related (kept: property management services, data analysis; dropped: nothing else). *Owner: confirm these two are real offers.*
5. Duplicate/placeholder descriptions on the industries grid (warehouse used retail's text verbatim) — replaced with per-industry copy derived from service scope. **Owner: confirm the five industries are the actual target list.**

## 5. Media migration record

| Asset | Old source | New location | Status |
|---|---|---|---|
| Official logo PNG | yourtecheye.com CMS (`/wp-content/uploads/2026/04/8f67…png`) | `/public/brand/yourtecheye-logo.png` | ✅ Preserved unmodified |
| Favicon | none found (old site served none) | `/public/brand/icon.png` (derived crop of official logo) | ✅ Created; owner may supply an official icon |
| Social share image | `/wp-content/uploads/2026/04/557bf97d…png` (1024×1024, not retrievable through WAF) | `/public/brand/og-image.png` (rebuilt 1200×630 with official logo) | ✅ Equivalent created; original could not be fetched |
| Team photos | lazy-loaded JS bundles; not retrievable | omitted | ⚠️ Owner: supply official portraits if wanted on /about |
| Site photography | old site images not retrievable via WAF | 8 licensed assets, see `MEDIA_CREDITS.md` | ✅ Documented |

## 6. Owner-confirmation checklist (blockers before public launch)

- [ ] Confirm final copy for all pages (this rebuild is faithful but rewritten).
- [ ] Confirm "24/7 monitoring" scope and whether any availability limits exist.
- [ ] Confirm emergency-response wording (authority coordination policy).
- [ ] Confirm live-audio hardware availability & which plans include it.
- [ ] Confirm service coverage region (site currently claims no territory).
- [ ] Confirm phone/email/hours and whether WhatsApp is WhatsApp-enabled (not linked).
- [ ] Approve or replace the pre-launch draft privacy policy.
- [ ] Approve team names/portraits on /about.
- [ ] Confirm the five industries are the real target list.
- [ ] Configure form email delivery (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`) — until then enquiries are stored in the database only.
