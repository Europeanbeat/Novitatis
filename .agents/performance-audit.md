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

---

# Audit #2 — Runtime / navigation (2026-06-11, after asset fixes)

User report: still sluggish after load, "previously it was fine". Findings
ranked by impact.

## 1. SMOKING GUN: next/link is used 0 times in the entire site
Every internal link is a plain `<a href>`. Every click is therefore a FULL
page reload: ~900 KB of JS re-downloaded/re-parsed, React re-hydrates the
whole page, fonts re-check, the page curtain replays, scroll position
resets. Next.js client-side routing (instant, prefetched transitions) is
completely unused. This compounds: as the facelift added sections and JS,
every navigation got heavier, which is why it "was fine before".
Affected: navigation.tsx (all menu items), footer, selected-work cards,
discovery popup, services FAQ/CTA/related-projects, audience-section (1,
protected), cta-section (protected), and the services subpages.
Fix: swap internal `<a>` for `next/link` `<Link>` (same markup, instant
navigation + automatic prefetch). Protected files need owner approval.

## 2. Page curtain runs on every navigation
Because of #1, the curtain (now 1s hold + 0.65s wipe) replays on every
single click. With Link navigation it would only play on hard loads.
Optionally also gate it with sessionStorage to once per session.

## 3. Per-route JS is ~900 KB on every route
index 964 KB / references 944 KB / brands 900 KB / services 884 KB /
about 876 KB / contact 760 KB (uncompressed; ~280 KB gzipped). Cause:
nearly every section is a client component, so the whole page hydrates.
Acceptable once Link navigation means it's paid once, not per click.

## 4. services.html is 365 KB of HTML
~9x the other pages. Likely repeated inline SVG. Gzip mostly hides it,
but worth a look inside services-showcase.

## 5. references-content.ts (76 KB source) is bundled into the homepage
selected-work imports the full references array for 3 cards. Minor;
fixable by extracting the 3 needed entries at build time (server
component already does this? No: selected-work is a client component).

## Verified healthy
ScrollReveal cleans up properly (gsap ctx.revert). DiscoveryPopup is
cheap (one passive scroll listener, removed after fire). LightRays gated
by IntersectionObserver. Spline/leaflet load only on /brands via
next/dynamic. All routes statically prerendered. Background lines now
settle still after intro (fixed in a752506).
