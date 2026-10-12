# 10 — Launch & Handover Plan

## 1. Before deployment

- Confirm target domain and hosting/deployment account.
- Confirm the final logo, brand palette and official contact details with YTE.
- Confirm service scope, operating coverage, response/escalation wording and any uptime/availability statements.
- Verify every image/video licence and store `MEDIA_CREDITS.md`.
- Confirm form delivery destination, reply-to behaviour and notification ownership.
- Confirm the approved privacy policy, consent requirement and analytics setup.
- Run the entire QA checklist and build from a clean environment.

## 2. Deployment tasks

- Configure required environment variables in hosting settings.
- Confirm production build and routing.
- Point the domain and verify HTTPS.
- Configure redirects for legacy pages.
- Confirm robots.txt and sitemap on the production hostname.
- Set search-engine verification and analytics only when authorised.
- Test live enquiry delivery and phone/email links from a real mobile device.
- Confirm 404/500 behaviour and error reporting.

## 3. Post-launch checks

Within the first 24–72 hours:
- Test all key routes and CTA paths on production.
- Check form delivery, bounce and spam handling.
- Inspect mobile rendering on at least one Android and one iOS browser if available.
- Re-run Lighthouse/field performance checks.
- Check Search Console crawlability when configured.
- Review analytics only for meaningful events and without PII.

## 4. Handover bundle

Deliver to the owner:
- Source repository / updated code.
- README with local development and deployment instructions.
- `.env.example` listing required variables, no secret values.
- `MEDIA_CREDITS.md` with all external asset sourcing and licensing notes.
- `content/migration-inventory.md` and `content/source-notes.md`.
- Redirect map.
- Test summary showing build/lint/typecheck and QA status.
- Any owner-confirmation items still open.
- A short explanation of how to update service copy, contact details and images.

## 5. Known blockers must be visible

If the website, official media, email/CRM destination or legal information cannot be verified, document it explicitly. Do not quietly fake the missing part. Use a reasonable temporary layout placeholder only during development and remove or replace it before production.

## 6. Recommended final release note

Summarise:
- What was built.
- Pages and services included.
- Visual assets collected and their licences.
- Contact/form integration status.
- Tests completed and any warnings.
- Claims/content requiring owner approval.
- Deployment URL and rollback/revert instructions, if deployed.
