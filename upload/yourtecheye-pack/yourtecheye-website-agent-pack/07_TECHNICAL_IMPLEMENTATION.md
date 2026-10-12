# 07 — Technical Implementation Specification

## 1. Repository-first rule

Inspect the existing repository before changing anything. Determine framework, package manager, routes, assets, deployment provider, environment variables, form integration and coding conventions. Preserve a functioning existing stack whenever practical. Do not replace working infrastructure without a reason.

If this is a fresh implementation with no pre-existing constraints, use:
- Next.js App Router with TypeScript.
- Tailwind CSS or the repository's established CSS methodology.
- Reusable components and design tokens via CSS variables.
- `next/image` or equivalent responsive image optimisation.
- Minimal client-side JavaScript; use server components for content-first sections.
- A lightweight animation library only if necessary; CSS transitions are preferred for simple effects.

Do not add dependencies just for decorative convenience.

## 2. Suggested folder structure (adapt to existing app)

```text
app/
  page.tsx
  about/page.tsx
  services/page.tsx
  services/surveillance-security-solutions/page.tsx
  services/live-audio-intervention/page.tsx
  contact/page.tsx
  privacy/page.tsx
  not-found.tsx
components/
  layout/
  navigation/
  sections/
  services/
  forms/
  media/
content/
  services.ts
  faq.ts
  source-notes.md
public/
  media/
  brand/
  icons/
```

The real route path must preserve the legacy service URLs discovered in the old site. If framework routing differs, implement matching routes and redirects.

## 3. Header/navigation

- Use semantic `<header>`, `<nav>`, links and buttons.
- Avoid attaching click handlers to generic `div` elements.
- Mobile navigation must have accessible names, Escape-to-close and focus behavior.
- Keep focus within a modal dialog only if a real modal is used; do not put all navigation inside a modal on desktop.
- Use an active-page state that is not conveyed solely by colour.

## 4. Content architecture

Store repeated service content in typed data objects where it improves maintainability. Each service entry should include:
- `slug`, `title`, `summary`, `detail`, `image`, `imageAlt`, `ctaLabel`, `sourceUrl`, `verifiedAt`, `verificationStatus`.
- Optional features/FAQ only when owner-verified.

Do not render hidden schema-only invented content. Add source notes to facts whose publication requires approval. If a critical value is unverified, either omit it from the public page or expose an explicit project TODO instead of shipping a guess.

## 5. Contact form

- Client-side validation is for usability, not security; validate on the server too.
- Use appropriate input types, visible labels, correct `autocomplete` values and accessible error association.
- Require at least one reliable contact method (as defined by business process), and avoid unnecessary mandatory fields.
- Add honeypot and/or rate limiting or a reputable anti-spam mechanism; do not rely on an obscure field name alone.
- Do not store sensitive free-text more broadly than necessary.
- Do not expose email provider secrets in the client bundle.
- Ensure success/error notifications are announced to assistive technologies.
- Wire form delivery to a confirmed email/CRM destination through server-side environment variables.
- If email/CRM is not configured, keep the local implementation honest: show a disabled/non-production state or document the blocker. Do not claim a lead was sent.

## 6. Link behavior

- Phone uses a verified `tel:` link.
- Email uses a verified `mailto:` link.
- WhatsApp is optional and requires number/availability confirmation.
- External links should have meaningful labels; open new tabs only when there is a user benefit. Use safe `rel` attributes for `target="_blank"`.
- Do not leave `href="#"` or empty links in final UI.

## 7. Media components

- Explicit width/height or aspect ratio to prevent layout shift.
- Appropriate sizes and responsive source set.
- Correct hero priority and eager loading; lazy-load below-the-fold assets.
- Avoid loading more than one autoplay video at once.
- Video must have no audio autoplay; provide poster and image fallback.
- Ensure local media filenames match the credits manifest.

## 8. Animation

- Limit motion to useful transitions and gentle reveals.
- No animation may block interaction, cause layout jumping or hide essential content.
- Support `prefers-reduced-motion: reduce`.
- Disable heavy video motion for reduced-motion users, mobile low-bandwidth if feasible, and data-saver situations where detectable.

## 9. Operational configuration

- Add `.env.example` with variable names and safe placeholder values only.
- Never commit API keys, email credentials or production secrets.
- Add deployment/build instructions to `README.md`.
- If analytics is needed, use a privacy-conscious implementation and document events.
- Configure redirects for changed legacy URLs.
- Confirm error logging does not leak form PII.

## 10. Analytics events (only when analytics is configured)

Use a documented naming scheme:
- `contact_form_started`
- `contact_form_submitted` (only after a confirmed success response)
- `contact_form_error`
- `phone_click`
- `email_click`
- `whatsapp_click` (only if applicable)
- `service_detail_view`

Do not submit user-entered message contents or direct identifiers to analytics.

## 11. Build and completion criteria

- Package manager install works from a clean environment.
- Lint/type check/build complete successfully.
- All intended routes load directly, including on refresh.
- No broken navigation or 404s among internal links.
- Form has a real, tested destination or is clearly documented as blocked.
- Media credits and source notes exist.
- No console error, critical hydration error or major layout shift.
