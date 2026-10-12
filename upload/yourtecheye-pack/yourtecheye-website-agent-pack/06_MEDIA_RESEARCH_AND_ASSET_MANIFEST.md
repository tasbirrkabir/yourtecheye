# 06 — Media Research & Asset Manifest

## 1. Objective

Collect a coherent set of high-quality, appropriately licensed images/video for a premium surveillance and monitoring website. Do not stop after inserting placeholder gradients. The coding agent should find, verify, download where permitted, optimise, place and document media assets.

## 2. First priority: genuine YTE assets

Inspect the official site and its CMS/media library first. Retrieve the original logo rather than screenshotting it. Look for:

- Horizontal wordmark and, if available, standalone icon.
- Dark and light logo variants.
- SVG/transparent PNG where provided.
- Favicon/site icon and social share image.
- Actual product/equipment, site, installation or operations photography.
- Existing official video embeds, channel links or videos approved for reuse.

Preserve the supplied logo proportions and clear space. Do not redraw or substitute it without owner approval. If the logo is raster-only, use the best available resolution and do not artificially upscale it for large hero use.

## 3. Royalty-cleared discovery starting points

Search for suitable material at these libraries and read the specific asset licence/usage terms before download:

### Pexels
- Photos: https://www.pexels.com/search/security%20camera/
- Videos: https://www.pexels.com/search/videos/security%20camera/
- Monitoring/control room search: https://www.pexels.com/search/videos/security%20monitoring/
- CCTV installation search: https://www.pexels.com/search/cctv%20installation/

### Unsplash
- Surveillance cameras: https://unsplash.com/s/photos/security-camera
- Control room: https://unsplash.com/s/photos/security-control-room
- Warehouse / industrial site: https://unsplash.com/s/photos/warehouse-security

### Pixabay
- Security camera videos: https://pixabay.com/videos/search/security%20camera/
- Surveillance images: https://pixabay.com/images/search/surveillance%20camera/

### Mixkit
- Stock videos: https://mixkit.co/free-stock-video/
- Search within the library for surveillance, security cameras, industrial property, city-at-night and control-room visuals. Check the licence for the specific asset before using it.

**Important:** These URLs are starting points, not blanket approval for all content. Licence terms can vary by asset, source and use. Record the asset page, creator/author, licence, access date and attribution requirements. Do not scrape gated assets or bypass download restrictions.

## 4. Recommended search terms

Search across libraries for:
- commercial security camera exterior dusk
- CCTV camera mounted on warehouse exterior
- security monitoring operator at workstation
- modern surveillance control room with operator
- industrial facility perimeter at night
- warehouse loading bay security camera
- parking lot surveillance camera
- commercial property exterior security system
- technician installing IP camera
- access gate and monitored perimeter
- construction site security tower / mobile surveillance (only if YTE offers this type of setup)
- live audio speaker attached to security camera (only if service details support this hardware)

Prefer natural, believable imagery with realistic hardware and uncluttered compositions. Avoid images showing competitor logos, readable confidential screens, recognizable private individuals in misleading contexts, or brand marks that cannot be licensed.

## 5. Required starter asset set

Aim for 6–10 distinct assets, depending on actual page count. Do not create filler just to hit a number.

| ID | Intended use | Visual need | Format | Requirements |
|---|---|---|---|---|
| A01 | Header / favicon | Official YTE logo | SVG preferred; transparent PNG fallback | Obtain from official site/CMS; no redrawing unless approved. |
| A02 | Homepage hero | Wide property/security monitoring scene | 16:9 image plus optional 5–12 sec video | Strong safe text area; legal licence; static fallback. |
| A03 | Services overview | Camera/surveillance detail | 4:3 or 3:2 image | Distinct from hero. |
| A04 | Live Audio Intervention page | Speaker/camera or operator scene | 16:9 image | Must accurately represent actual service; avoid implying unsupported product. |
| A05 | How-it-works section | Genuine monitoring/operator workflow | 4:3 image | Caption as illustrative if stock. |
| A06 | About page | Real team/work image, or neutral operational image | 3:2 image | Use genuine YTE team only with approval; otherwise do not imply stock models are staff. |
| A07 | Contact / final CTA | Property exterior or site detail | 16:9 / wide crop | Keep CTA content readable. |
| A08 | Social share | Approved brand visual | 1200×630 recommended | Use official logo and correct colours; no ECAM art. |

## 6. Video implementation rules

- Prefer a small, short, muted ambient loop over long cinematic footage.
- Where appropriate, encode WebM and MP4 fallbacks; use a poster image.
- Keep hero video size as low as practical (initial goal under ~6 MB for a short loop; if quality requires more, use a static image on mobile or weak connections).
- Do not autoplay with audio.
- Do not download YouTube/Vimeo videos unless the owner or licence explicitly permits it; embed an approved source instead.
- Don't host a hot-linked third-party asset in production unless the licence and source explicitly permit embedding.
- Do not block the LCP hero image behind lazy-loading. Lazy-load below-the-fold media.
- If a user prefers reduced motion, render a static image.

## 7. Download/optimisation workflow

1. Save to a temporary research directory first.
2. Confirm the actual asset page and licence.
3. Review the visual at desktop and mobile crop sizes.
4. Rename descriptive assets with kebab-case names (for example `commercial-site-surveillance-hero.webp`).
5. Optimise raster stills into WebP/AVIF where supported, with a sensible fallback if needed.
6. Create responsive sizes; preserve aspect ratio and focal point.
7. Keep final assets in `/public/media/` (or the repository's chosen static asset directory).
8. Add every asset to `MEDIA_CREDITS.md` with source URL, creator, licence, access date and any required attribution.
9. Keep an original backup only when allowed and useful.
10. Test local paths, image loading, video fallback and mobile data usage.

## 8. Media credit template

```md
| File | Use | Creator | Asset page URL | Licence | Attribution needed? | Download date | Notes |
|---|---|---|---|---|---|---|---|
| `/public/media/...` | Homepage hero | ... | ... | ... | Yes/No | YYYY-MM-DD | ... |
```

If a licence requires attribution, provide it in the footer, a credits page or relevant caption as required. Do not omit required credit.

## 9. Visual authenticity rules

- A stock image must not be labelled “our team”, “our monitoring centre”, “our installation” or “our clients.”
- No invented client logos or fabricated customer success photos.
- If images are illustrative, say so where ambiguity exists.
- Do not composite false surveillance detections around real people in a way that suggests an actual incident.
- Avoid identifying private individuals from footage.

## 10. Required deliverables from the agent

- Actual media files in the site repo (not only remote placeholders).
- `MEDIA_CREDITS.md` complete for every external asset.
- A record of which original official YTE assets were migrated.
- A short note explaining any asset that could not be obtained and what approved fallback was used.
