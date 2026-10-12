# Your Tech Eye — Website

Production-minded rebuild of [yourtecheye.com](https://yourtecheye.com/): a 24/7 surveillance & monitoring company site with honest content, licensed media, real lead capture, and full SEO/a11y hygiene.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · shadcn/ui · Prisma (SQLite)**.

---

## Quick start

```bash
bun install            # install from lockfile
bun run db:push        # create/update the SQLite database (prisma/schema.prisma)
bun run dev            # start dev server on http://localhost:3000
```

Other scripts:

```bash
bun run lint           # ESLint
bunx tsc --noEmit      # typecheck
bun run build          # production build (standalone output)
bun run start          # run the production build
```

## Routes

| Route | Purpose |
|---|---|
| `/` | Home — hero, trust strip, problem, services, how-it-works, use cases, operational clarity, FAQ, CTA |
| `/services` | Services overview |
| `/surveillance-cctv-monitoring` | Service detail (legacy URL preserved) |
| `/live-audio-intervention` | Service detail (legacy URL preserved) |
| `/emergency-response` | Service detail (legacy URL preserved) |
| `/playback-footage-monitoring` | Service detail (legacy URL preserved) |
| `/surveillance-security-solutions` | Equipment & capabilities (legacy URL preserved) |
| `/about` | Company, mission, team (verified names) |
| `/contact` | Contact options + enquiry form (`?service=<slug>` preselects) |
| `/privacy` | Pre-launch draft privacy summary (noindex) |
| `/sitemap.xml`, `/robots.txt` | Generated SEO routes |
| `*` | Branded 404 with recovery links |

Legacy trailing-slash URLs (`/about/`) are 308-redirected to clean paths by Next.js.

## Updating content

- **Contact details / tagline / domain** → edit `src/lib/site.ts` (single source of truth, used by header, footer, CTA, JSON-LD).
- **Service copy, features, FAQs** → edit `src/content/services.ts`. Every entry records its official source URL and verification date — keep that habit.
- **FAQs** → `src/content/faq.ts`.
- **Brand palette / typography tokens** → `src/app/globals.css` (CSS variables at the top).
- **Media** → drop optimised WebP into `public/media/`, then reference from `src/content/services.ts`. Every external asset **must** be added to `MEDIA_CREDITS.md`.

## Contact form & lead delivery

Enquiries POST to `/api/contact` which:

1. **Validates** server-side with zod (name, message, consent required; email *or* phone required; service whitelist).
2. **Anti-spam**: honeypot field + in-memory rate limit (5 submissions / 10 min / hashed-IP) + submission payload never sent to analytics.
3. **Stores** every valid enquiry in SQLite (`ContactSubmission` via Prisma) so no lead is ever silently lost.
4. **Optionally emails** the enquiry via Resend when `RESEND_API_KEY` + `CONTACT_TO_EMAIL` are set (see `.env.example`).
5. **Never claims success falsely** — the UI shows "received" only when the server confirms storage or delivery; if both fail, visitors are told to email/call instead.

Check stored enquiries: open `db/custom.db` (`SELECT * FROM ContactSubmission;`).

**Current status:** storage ✅ tested · email delivery ⏳ not configured (needs owner's Resend account / SMTP credentials).

## Media & brand

- `public/brand/` — official YTE logo (unmodified), derived favicon + OG card.
- `public/media/` — 8 licensed photos (WebP), fully documented in `MEDIA_CREDITS.md` with source, creator, licence, and attribution requirements.
- Photography is used **illustratively** and is captioned where it could be mistaken for YTE facilities. No competitor or watermarked assets.

## Accessibility & performance notes

- Semantic landmarks, skip-to-content link, keyboard-complete navigation (dropdowns work via keyboard/touch, Escape closes the mobile menu with focus return).
- Visible focus rings, labelled fields, `aria-live` form status, reduced-motion support (CSS + JS).
- Static hero image (no autoplay video), `next/image` optimisation, explicit dimensions, WebP media, minimal client JS.

## Documentation bundle

- `MEDIA_CREDITS.md` — asset licences/attribution
- `content/migration-inventory.md` — old→new page mapping + excluded template leftovers + owner checklist
- `content/source-notes.md` — where every fact came from
- `.env.example` — optional email delivery variables

## Owner approvals required before public launch

See the checklist at the end of `content/migration-inventory.md` — copy sign-off, 24/7 scope, response wording, coverage region, WhatsApp confirmation, privacy policy, team portraits, and form email delivery configuration.
