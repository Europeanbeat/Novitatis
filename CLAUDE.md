# Novitatis Facelift — Project Rules

Read this before any task. Bence is the user. He's learning as he goes, so explain concepts simply when he asks but otherwise just ship clean changes.

---

## 🚫 Do Not Touch (unless he explicitly overrides)

- `app/page.tsx` — the homepage
- `components/sections/hero-section.tsx`
- `components/sections/audience-section.tsx`
- `components/sections/features-section.tsx`
- `components/sections/how-it-works-section.tsx`
- `components/sections/cta-section.tsx`
- `components/sections/brands-section.tsx`

If he asks for a change that *would* require touching these, confirm first. The only valid override is an explicit, current-message request naming the file or its content.

---

## 🎨 Brand & Visual Language

### Colors (always use these)
- **Primary / dark teal:** `#334F5A` — text, dark backgrounds
- **Accent / light blue:** `#AAD7E6` — hover states, arrows, active indicators, halos
- **Tinted card background:** `#f9fbff` — soft alternative to white
- Never default to generic blue (`blue-500`, etc.) without checking.

### Typography
- `font-display` = Instrument Serif — large headings
- `font-mono` = JetBrains Mono — labels, eyebrows, URLs, metadata
- Body uses the default sans (Instrument Sans)

### Voice & Copy Rules
- **British English:** travellers, optimised, organisation, programme
- **No em dashes (—) in prose copy.** Use commas, colons, or full stops. (The "em dash" character used as a decorative bullet in lists is fine.)
- Headlines are concise and declarative. No clichés.

---

## 🧱 Tech Stack

- Next.js **16.2.0** with App Router
- React 19, TypeScript
- Tailwind CSS **v4** (note: `@import 'tailwindcss'` syntax, not v3 config)
- Theme in `app/globals.css` using `@theme inline` block + oklch colors
- 3D: `@splinetool/react-spline` — **must be loaded via `next/dynamic` with `ssr: false`**
- Maps: `leaflet` — same rule, client-only via `useEffect` + dynamic import
- Animation: `framer-motion`, `gsap` (already present in deps)

---

## 🗂 File Conventions

- Page routes: `app/<route>/page.tsx`
- Reusable section components: `components/sections/`
- Layout chrome: `components/layout/` (navigation, footer, page-background)
- UI primitives: `components/ui/`
- Static assets: `public/images/` → reference as `/images/filename.ext`

### Brand assets in `public/images/`
- `visibletourism_logo.svg` — full logo
- `ai4tourism-logo.png` — full logo
- `turizmus_tudastar.png` — icon-style logo (used inline with text)
- `abstract-shape.svg` — decorative blue line pattern
- `novi_logo.png`, `novi_logo_white.png` — Novitatis logos
- Team photos and other content images

---

## 🎯 Recurring Patterns (use these, don't reinvent)

### 1. The "halo" effect for titles over PageBackground lines
When text sits over the floating animated lines, wrap it like this so a soft fade hides the lines locally:

```jsx
<h2 className="relative ... isolate">
  <span
    aria-hidden
    className="absolute -inset-x-8 -inset-y-6 -z-10 backdrop-blur-sm bg-background/60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
  />
  Your title text
</h2>
```

### 2. The `abstract-shape.svg` background under cards
Wraps a card grid with a soft pattern fading from bottom up:

```jsx
<div className="relative mb-6">
  <img
    src="/images/abstract-shape.svg"
    className="absolute bottom-0 left-0 right-0 w-full opacity-40 pointer-events-none [mask-image:linear-gradient(to_top,black_0%,transparent_85%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,transparent_85%)]"
    alt=""
  />
  <div className="relative grid ...">
    {/* cards here, opaque white bg */}
  </div>
</div>
```

### 3. Active state on selector cards
Solid white background with a light blue ring + soft glow — never use semi-transparent backgrounds (they look washed out / broken):

```jsx
isActive
  ? "border-[#AAD7E6] ring-2 ring-[#AAD7E6]/50 shadow-[0_4px_24px_-8px_rgba(170,215,230,0.4)]"
  : "border-foreground/10 hover:border-foreground/30 ..."
```

### 4. Spline scenes
Use `components/ui/splite.tsx`. **Do not call `app.stop()`** — it kills hover/click interactions, not just the camera intro. Instead, prevent layout-driven zoom by giving the container a fixed height (`h-[660px]`) and using `absolute inset-0 w-full h-full` on the canvas inside an `overflow-hidden relative` wrapper.

---

## 🧠 Pedagogical Notes (when Bence asks "why")

He's actively learning Tailwind/React. When he asks how something works:
- Explain in plain English, not jargon
- Give him the specific class + what it does
- Mention 1-2 nearby alternatives so he can iterate (e.g. "h-8 = 32px, h-10 = 40px")
- Don't dump the whole framework

When he says "I want to do it myself," give *steps*, don't do it. When he says "fix it" or "help me", do it cleanly and explain after.

---

## 🛑 Common Mistakes to Avoid

- **Transparent backgrounds where text needs to be readable.** Always check that a `bg-[color]/[x]` decision doesn't blow away necessary contrast.
- **`absolute` without a `relative` parent.** The element will escape to the viewport.
- **Percentage heights (`h-1/2`) on parents with `auto` height.** Compute to 0.
- **`<img>` placed inside a `grid` div** — becomes a grid item, not a background. Background images go in a sibling `relative` wrapper.
- **Em dashes in prose.** Never. Comma or colon.
