# Content Plan — competitor-sourced section copy

*Working doc, 2026-06-15. Goal: improve the SECTION CONTENT (words only, no
layout/element changes) by borrowing structure and wording from the
competitors Bence flagged, folding in Vivi's review, and — the core job —
making the four services read as four DISTINCT offerings instead of one
connected process. Bence rewrites the drafts after.*

---

## 0. Hard constraint discovered today: no live web here

I tried to fetch milespartnership.com, destinationthink.com and
d3hub-competencecentre.eu — all return **403 (host not allowed)**. This is
the remote environment's network policy (the same one that blocked the
preview URL during the domain setup), not the sites blocking us.

**So I cannot crawl competitors live from this session.** Two ways forward,
both fine:
1. **Work from what we already have.** Bence's "Ideas for content" PDF
   already quotes the gold from each competitor (Miles intro, Miles public
   speaking, Destination Think research, D3HUB objectives). That is enough
   to draft every section below.
2. **Bence pastes specifics.** When we want a section we don't have yet
   (e.g. a Miles services page, a Destination Think strategy subpage),
   Bence pastes the text or a screenshot into chat and I adapt it.

I will NOT pretend to have fetched anything. Every borrowed line below is
traceable to the PDF or to something Bence pasted.

---

## 1. The core problem and the content fix

**Problem (Bence + Vivi agree):** the four services read as a *sequential
process* — partly the `01 02 03 04` numbering and the connecting lines
(Vivi: "olyan, mintha ez egy folyamat lenne… de nem az"), partly that all
four are written in the same parallel voice, so they blur into one block.

**Layout half** (numbers, lines, click-to-subpage, smaller type) lives in
`how-it-works-section.tsx`, which is a **protected homepage file** — needs
Bence's explicit OK, and is a separate UI pass anyway.

**Content half (this plan):** give each service its **own voice, its own
proof, and its own borrowed source**, so they stop sounding like four steps
of one thing and start sounding like four different things the firm does.
This is pure copy and needs no layout change.

| Service | Borrowed source / angle | Distinct voice |
|---|---|---|
| Consulting & strategy | Destination Think "Research and analysis" + resident-sentiment framing | Evidence / research-led |
| Development & digitalisation | D3HUB objectives (data-driven digital transition for DMOs & SMEs) | Build / systems |
| Education & mentoring | "Empowering Our Industry" header + Pact for Skills | Capability / people |
| Public speaking | Miles Partnership "commitment to the future / relationships" copy | Voice / agenda-setting |

That table is the spine of the whole job: four sources, four voices.

---

## 2. Source → section map (copy we already hold from the PDF)

**Miles Partnership** (milespartnership.com/why-were-here)
- *Positioning / Adam intro:* "while we offer a full suite of services, our
  core strength lies in problem-solving. Because no two challenges are
  identical, our approach is never the same. We leverage deep insights,
  strategy, and expertise to craft bespoke solutions that drive measurable,
  positive outcomes." → adapt for the identity paragraph / Consulting lead.
- *Services header idea:* "Accepting All Challenges" + sub "Four services,
  explored in-depth." → candidate header for the services section.
- *Public speaking:* "Speaking at educational conferences and industry
  events is a fundamental part of our commitment to the future. By engaging
  in local and national forums, we not only share our expertise but also
  invest in the relationships and programs that support the growth and
  evolution of our industry." → adapt for Public Speaking.
- *CTA tone:* "get in touch / let's work together" — punchier (Vivi agrees).

**Destination Think** (research-and-analysis blog)
- "Collaborative fellowship to help destinations apply resident sentiment
  and policy insights. How do locals where you live feel about tourism?
  Destination leaders seeking long-term success need to understand its
  impacts on quality of life at home." → adapt for Consulting/strategy
  research angle. Bence: keep the layout, swap in OUR references.

**D3HUB** (d3hub-competencecentre.eu)
- Objectives: "support tourism destinations and their ecosystem (special
  focus on SMEs) in their data-driven green and digital transition…
  knowledge transfer… tailor-made digital solutions and data for DMOs and
  tourism SMEs." → adapt for Development & digitalisation.

**Education** — header idea "Empowering Our Industry"; EU "Pact for Skills"
as a credibility anchor for training.

---

## 3. Where the content actually lives (edit targets)

- `lib/services-content.ts` — the 4 practices, deliverables, flagship,
  process steps, client tiers, engagements, challenges. **Primary target.**
  Not protected.
- `lib/faq-content.ts`, `lib/references-content.ts` — secondary.
- Services subpages (`app/services/*/page.tsx`) and services sections
  (`components/sections/services/*`) — pull from the lib, so fixing the
  source flows everywhere. Not protected.
- **Protected (need explicit OK):** `how-it-works-section.tsx` (homepage 4
  services), `features-section.tsx`, `hero-section.tsx`,
  `audience-section.tsx`, `cta-section.tsx`, `brands-section.tsx`.

Plan: do all the heavy lifting in `lib/` + services subpages (unprotected),
where the "four distinct voices" rewrite has its biggest effect anyway.
Touch protected homepage files only with Bence's say-so.

---

## 4. Vivi's review — split into CONTENT (this plan) vs UI (separate pass)

**Content / copy (in scope now):**
- Hero: add a plain "what we do" line under the big slogan — first two
  sentences must say what Novitatis is. (Matches the identity paragraph in
  `homepage-copy-plan.md`.) Protected file.
- Stats: "100%/100+" feel fake ("kamuszagú"); replace round vanity numbers
  with real, slightly un-round figures (n organisations/businesses served,
  HUF invested, providers researched). Protected files.
- Services: stop the process-flow reading (see §1).
- "Every level of tourism": tiers should read as a hierarchy (policy →
  place → operator), not three equals — wording can support this even
  before any visual change. Protected file.
- Brands: the two headlines ("Shared Purpose, Separate Focus" / "Three
  Brands, One Problem to Solve") are near-duplicates — pick one, reword the
  other. Protected file.
- Main-page contact line "Let's talk about the next step" → warmer, e.g.
  "Ready to be part of tourism's future." Protected file (cta).
- More CTAs through the page, varied per audience/service (Vivi). Mostly
  layout, but the CTA wording is content.
- About: replace "Hungary / EU" with "x countries"; emphasise the strong
  message block; tags too faint to read; consider first-names only for
  international reach. Mostly unprotected (about-us page).
- "Our Projects" vs "Public Speaking": Vivi — separate *appearances*
  (megjelenések) from *case studies* (old booklet projects); "Public
  Speaking" is an unclear label, "Appearances" reads better. Affects
  references-content structure + navigation. Bigger; flag for its own step.
- Year-tile fallback shows a bare year — show type/title instead (content).

**UI / layout (explicitly OUT of this content pass — log for later):**
contrast failures (AAA checker), the line motif hurting readability without
a blur/box behind text, logo colour (harsh black → brand teal), adding a
pop/highlight colour, photo zoom, services-page scroll stalling + a
"scroll-for-more" cue, the faint dropdown arrow on Brands, favicon, About
photo swap. These are real but they are not copy.

---

## 5. Proposed working order

1. **Rewrite `lib/services-content.ts`** so the four practices each carry
   their own borrowed voice (the §1 table). This alone fixes most of the
   "feels connected / content is trash" problem and flows into every
   services page. — biggest win, no protected files.
2. Tighten the four **services subpages** intros using the matched sources
   (Destination Think → consulting, D3HUB → development, Empowering Our
   Industry → education, Miles → public speaking).
3. **About-us** copy pass (tags, message block, countries, names).
4. Bring the agreed homepage copy (identity line, real stats, hierarchy
   wording, brand headline, warmer CTA) — **protected files, so one
   approval gate**, reusing decisions already in `homepage-copy-plan.md`.
5. References/"appearances vs case-studies" split — its own step, needs
   structure decisions.

Each step = its own commit, drafts you rewrite over.

---

## 6. Decisions I need from Bence

1. **Services header:** keep "Four services. In depth." or take Miles'
   "Accepting All Challenges" + "Four services, explored in-depth"?
2. **Start where I said** (services-content.ts, the four-voices rewrite)?
3. **Protected homepage files** — do the content fixes now with your OK, or
   keep this pass strictly to unprotected files and batch the homepage
   separately?
4. For any competitor section we don't already have quoted, you paste the
   text — agreed?
