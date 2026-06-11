# Performance & Security Audit — 2026-06-11

Context: site deployed via Dokploy (Docker standalone), feels heavier than
before. Full findings below, ranked by impact. Measured on a fresh
production build of commit `12ceece`.

## Why it feels heavy — ranked

### 1. Images ship raw (the main cause)
`next.config.mjs` sets `images.unoptimized: true`, so Next's entire image
pipeline (resize, WebP/AVIF, lazy placeholders) is off. Everything in
`public/images` is served at original size.

Homepage alone loads roughly 5 MB of images:
- `Pillars.png` — 2.4 MB, 2048×2048 PNG (used in how-it-works + features)
- `adam_schmutz.jpg` — 1.8 MB at 6012×3384 px, ~12x its display size.
  A 228 KB `adam_schmutz_card.jpg` already exists.
- Selected-work cards — ~1.4 MB of JPEGs, `<img>` without `loading="lazy"`
  or width/height (eager download + layout shift)

Elsewhere: `bence.png` 1.4 MB, `image.png` 1.0 MB (about page);
`public/images/references` totals 23 MB (gallery lazy-loads, but
individual reference pages still serve 1200–1600 px originals).

### 2. JavaScript — moderate, not the culprit
Homepage JS ≈ 1 MB uncompressed (~300 KB gzipped). Four animation systems
run together (Lenis rAF loop, GSAP ScrollTrigger, framer-motion, ogl
WebGL), but LightRays is properly gated behind an IntersectionObserver and
tears down offscreen. Spline (2 MB + 1.9 MB chunks + remote scene) loads
only on /brands, via next/dynamic. All routes are statically prerendered.

### 3. Caching / delivery
- `public/` assets are served with `Cache-Control: max-age=0` by
  `next start` — fine for HTML, wasteful for 23 MB of images.
- Verify the Dokploy proxy (Traefik) actually compresses responses:
  `curl -sI -H 'Accept-Encoding: br,gzip' https://site/ | grep -i encoding`

## Security

### High: Next.js 16.2.0 has known CVEs — upgrade to ≥16.2.9
`npm audit` flags middleware/proxy bypass, RSC cache poisoning, two XSS
vectors, several DoS vectors. Also fixes the transitive postcss advisory.
One-line bump, no API changes within the patch series.

### Medium: no security headers
No CSP, X-Frame-Options, Referrer-Policy, or HSTS anywhere (next.config or
proxy). Add a `headers()` block in next.config.

### Low / hygiene
- `typescript.ignoreBuildErrors: true` — type errors ship silently.
- `metadataBase` unset (build warning; affects OG image URLs).
- Dockerfile itself is good: multi-stage, non-root user, port not
  published (expose only), telemetry disabled.

## Cleanup candidates (build health, not page speed)
Unused prod dependencies (no imports found): @react-three/fiber,
@react-three/drei, recharts, embla-carousel-react, react-hook-form,
@hookform/resolvers, zod, date-fns, react-day-picker, cmdk, vaul, sonner,
input-otp, react-resizable-panels, next-themes, geist, plus many unused
@radix-ui packages and ~50 unused v0/shadcn files in components/ui.
`three` is likely removable too (only Spline's runtime references it
internally) — remove and test-build. Note: these don't ship to the
browser (per-page chunks tree-shake them); removing them speeds installs
and builds, shrinks the Docker image, and cuts audit noise.

## Recommended fixes, in order
1. Compress/resize source images in public/images (biggest win, touches no
   protected component): Pillars.png → WebP ~150 KB; swap the 6 MP
   adam_schmutz.jpg for the card version or a 1200 px WebP; batch-convert
   references to max-1200 px WebP (~23 MB → ~4 MB).
2. Bump next to ^16.2.9 (security).
3. Remove `images.unoptimized: true` and adopt next/image with `sizes`
   where files aren't protected; add `loading="lazy"` + dimensions to
   below-fold `<img>`s (selected-work is protected-adjacent: confirm).
4. Add security headers in next.config.
5. Prune unused dependencies + unused components/ui files.
6. Verify proxy compression on Dokploy; consider long-cache headers for
   /images via `headers()`.
