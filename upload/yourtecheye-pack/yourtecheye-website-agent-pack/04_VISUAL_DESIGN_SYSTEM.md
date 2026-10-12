# 04 — Visual Design System

## 1. Creative direction: “Quiet Confidence”

Design a refined security-technology brand experience: spacious layouts, excellent typography, real-world imagery, precise information hierarchy and subtle motion. The website should feel quietly capable, not loud or threatening.

ECAM is only a content-flow reference. Visually differentiate YTE from ECAM: do not copy its black/yellow palette, hero composition, section styling or exact card patterns.

## 2. Palette proposal

Use these as **proposed web UI tokens**, not as a claim about existing brand colours. First inspect the official YTE logo/brand assets. If those have established colours, preserve them and adapt the palette for accessibility.

- `--color-ink: #101A2B` — primary dark text and deep sections.
- `--color-ink-soft: #1A2A40` — dark surfaces / navigation.
- `--color-paper: #F6F8FB` — main light surface.
- `--color-white: #FFFFFF` — cards and contrast surfaces.
- `--color-text: #253246` — body text on light backgrounds.
- `--color-muted: #66758A` — muted explanatory text.
- `--color-line: #DCE3EB` — borders and separators.
- `--color-accent: #23B7C8` — primary accent for links, focus states and selective details.
- `--color-accent-strong: #087F91` — accessible text/action variant; verify contrast before use.
- `--color-signal: #BCEB68` — very sparse highlight if it harmonizes with the official brand.
- `--color-success: #16794B`, `--color-error: #B42318` — accessible form feedback.

Use accent colour as a deliberate highlight, not as a glow on every object. Do not use green as the default status colour everywhere; security status should not look like a fake monitoring dashboard.

## 3. Typography

Preferred approach:
- A modern, legible sans-serif such as **Manrope**, **Inter** or another available high-quality family.
- Use one font family where it looks excellent; two only if there is a clear typographic reason.
- Consider self-hosted variable font files with documented licences to reduce external requests.
- Headlines should be confidently sized but never wrap into awkward single-word orphan lines.
- Body copy: comfortable line-height around 1.55–1.75.
- Use sentence case instead of all-caps paragraphs.

Type scale starting point (adapt responsively):
- Display: `clamp(2.75rem, 6vw, 5.75rem)` with tight but readable leading.
- H1: `clamp(2.5rem, 5vw, 4.75rem)`.
- H2: `clamp(2rem, 3.6vw, 3.25rem)`.
- H3: `clamp(1.25rem, 2vw, 1.75rem)`.
- Body: `1rem` to `1.125rem`.
- Eyebrow/label: `0.75rem`–`0.875rem`, with restrained tracking.

## 4. Layout and spacing

- Content max width: approximately 1200–1320 px, with narrower reading width for long copy.
- Use a consistent 8 px spacing logic, with 4 px increments for fine adjustments.
- Large vertical section spacing; avoid a wall of cards.
- Use asymmetric editorial layouts selectively to create a custom identity.
- Keep information density higher on detail pages than on the homepage, but remain scannable.
- Full-width imagery should be intentional; not every section needs a background image.

## 5. Imagery and video

Use media that looks like real professional environments: commercial sites after hours, camera installations, monitoring workstations, property perimeters, warehouses/parking facilities and technicians working with equipment. The website should not imply that stock footage shows YTE's own staff, customer sites or control centre.

Hero treatments to explore:
- A cinematic but realistic dusk exterior with a visible camera/perimeter context; or
- A carefully framed monitoring station with human operator context; or
- A wide site image with a quiet overlay and a small branded visual panel.

Avoid:
- Generic person in hoodie, fake hackers, sci-fi radar screens, giant eye graphics, random red detection boxes, green matrix code and overused lens flares.
- Using the same stock photo repeatedly.
- Heavy video behind text without a static fallback.

Hero video rules:
- Muted, autoplay only if browser policy permits, loop and `playsInline`.
- Add a representative poster image and static image fallback.
- Respect `prefers-reduced-motion`; allow motion to be absent entirely.
- Ensure text contrast independently of any video frame.
- Lazy-load non-hero video and pause when not visible if feasible.

## 6. Component system

Build reusable components rather than custom one-off markup for each page:

- `SiteHeader`, `MobileNavigation`, `SiteFooter`, `Container`, `SectionHeading`.
- `PrimaryButton`, `SecondaryButton`, `TextLink`, `Breadcrumbs`.
- `ServiceCard`, `ServiceGrid`, `ProcessStep`, `FAQAccordion`.
- `ProofPanel` (only for verified evidence), `MediaPanel`, `ContactCTA`.
- `ContactForm`, `FormField`, `FormStatus`.
- `VideoFrame`/`ResponsiveMedia` with poster, source credit and fallback.

Cards should be clean surfaces with subtle border and shadow. Use elevation sparingly. Corner radii should be consistent (for example 12–20 px); do not round every object into pills.

## 7. Interaction and motion

- Motion duration: often 160–280 ms for small state changes; longer transitions only for a meaningful reveal.
- Use subtle opacity/transform reveal, not scroll-jacking or excessive parallax.
- Respect reduced motion at the component level.
- Do not hide important text until animation completes.
- Navigation, accordions, form states and carousels must work with keyboard and touch.
- Any carousel must not be the only way to access essential information.

## 8. Photography treatment

- Use a coherent mix of wide environmental images and close-up equipment details.
- Grade images consistently without making real security scenes look fake.
- Use responsive `srcset` or framework image optimisation and explicit dimensions/aspect ratios.
- Add concise, accurate alt text for informative imagery; empty alt for decorative imagery.
- Add captions when an image is illustrative and might otherwise be mistaken for an actual YTE installation.

## 9. Design QA checklist

- Visual hierarchy reads clearly in 5 seconds.
- Main action is obvious without being aggressive.
- No more than two competing CTA styles.
- Header, form and footer look intentional on mobile.
- Content does not collide with video or photo focal points.
- Focus state visible and contrast checked.
- No overuse of blur, glassmorphism, neon gradients or floating dashboard widgets.
- Design is visibly original, not an ECAM clone.
