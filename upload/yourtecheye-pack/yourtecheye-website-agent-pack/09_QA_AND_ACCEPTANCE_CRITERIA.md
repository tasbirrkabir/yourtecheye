# 09 — QA & Acceptance Criteria

## 1. Release definition

The site is ready for owner review when all critical tests pass and the site contains no invented facts, unlicensed media, fake proof or dead conversion paths.

## 2. Page and content checks

- [ ] Every required route loads directly and after refresh.
- [ ] Main page title and H1 are unique and meaningful.
- [ ] Service descriptions agree with the verified source/migration inventory.
- [ ] Legacy service URLs are preserved or redirected correctly.
- [ ] Contact phone/email match owner-confirmed details.
- [ ] No invented address, territory, certification, case study, customer, statistics or SLA.
- [ ] Brand name and official logo lockup are correct.
- [ ] All page CTAs have a clear, working destination.
- [ ] All external assets have a credit/licence record.

## 3. Responsive visual checks

Test at minimum:
- [ ] 360×800 Android phone viewport.
- [ ] 390×844 mobile viewport.
- [ ] 768 px tablet width.
- [ ] 1024 px small desktop/tablet landscape.
- [ ] 1366×768 desktop.
- [ ] 1440 px wide desktop.

For each:
- [ ] No horizontal overflow.
- [ ] Header and mobile menu behave correctly.
- [ ] H1 does not collide with imagery or CTAs.
- [ ] Card grid collapses cleanly.
- [ ] Forms are easy to complete by touch.
- [ ] Footer content wraps naturally.
- [ ] Modal/accordion/carousel does not crop essential content.

## 4. Form checks

- [ ] Required field errors appear at the right location.
- [ ] Errors explain how to fix the issue.
- [ ] Invalid email/phone formats are handled appropriately without being overly restrictive.
- [ ] Keyboard-only interaction works.
- [ ] Screen reader announces error and success states.
- [ ] Valid submission reaches the real configured destination.
- [ ] Failed submission shows an error and does not claim success.
- [ ] Duplicate/spam submissions have sensible protection.
- [ ] Success response is emitted only after confirmed server success.
- [ ] Form data is not leaked to the client or analytics.

## 5. Media checks

- [ ] Official logo is sourced from YTE, not re-created from a screenshot.
- [ ] Each image/video loads on production origin.
- [ ] Every image has correct alt behaviour and explicit dimensions/aspect ratio.
- [ ] Hero video has a poster and static fallback.
- [ ] No audio autoplay.
- [ ] Reduced-motion users get a static/simplified presentation.
- [ ] Video/data weight is reasonable on mobile.
- [ ] No broken hotlinks, watermarks, competing business logo or unlicensed image.
- [ ] Asset credits match the local files actually used.

## 6. Interaction checks

- [ ] Navigation works with mouse, touch, Tab, Shift+Tab and Escape where relevant.
- [ ] All visible buttons do what their label promises.
- [ ] No dummy `href="#"` links or nonfunctional card actions.
- [ ] Phone opens the dialler on a mobile device.
- [ ] Email opens the mail client.
- [ ] WhatsApp opens only if configured and verified.
- [ ] Accordions and menu toggles expose correct `aria-expanded` state.
- [ ] Focus is visible; keyboard focus is not lost after menu close.

## 7. SEO and accessibility checks

- [ ] Unique titles/descriptions and canonical routes.
- [ ] Sitemap and robots.txt reflect the production domain.
- [ ] Legacy URLs return a relevant page or proper 301.
- [ ] Images don't contribute avoidable layout shift.
- [ ] Contrast checks pass or deviations are documented and fixed.
- [ ] Headings are meaningful and ordered.
- [ ] All critical forms/navigation work without a mouse.
- [ ] Reduced motion works.
- [ ] Structured data has no invented values and validates successfully.

## 8. Technical checks

- [ ] Install works from clean lockfile.
- [ ] Lint passes.
- [ ] Type checking passes.
- [ ] Production build passes.
- [ ] No critical runtime or hydration errors.
- [ ] No leaked secrets or `.env` production values in repository.
- [ ] No severe console errors.
- [ ] Lighthouse / equivalent audit results reviewed.
- [ ] 404 page is branded and provides recovery links.

## 9. Manual owner-approval checklist

The business owner must confirm before public release:
- [ ] Correct positioning and list of services.
- [ ] What “24/7 monitoring” means in the real operation.
- [ ] Live-audio capabilities and limitations.
- [ ] Emergency-response/alert escalation wording.
- [ ] Coverage region and customer eligibility.
- [ ] Contact phone, email and hours.
- [ ] Any testimonial/logo/photo permissions.
- [ ] Legal/privacy policy.
- [ ] Final copy and visual identity.
