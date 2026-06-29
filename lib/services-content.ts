// Single source of truth for the /services overview and its sub-pages.
// Voice: strategy-consultancy register. Specific, evidence-led, no filler.
// Bilingual: English is primary; Hungarian mirrors it. Consume it via
// `getServicesContent(locale)` in server components or `useServicesContent()`
// in client components (mirrors lib/i18n/chrome.ts). No case-study statistics
// in explanation copy — claims are kept qualitative.

import { useLocale } from "@/lib/i18n/use-locale";
import type { Locale } from "@/lib/i18n/config";

export type Practice = {
  number: string;
  slug: string;
  tag: string;
  title: string;
  lead: string;
  description: string;
  serves: string[];
  deliverables: string[];
  flagship?: { metric: string; label: string; outcome: string };
  photo: { src: string; alt: string };
};

export type ProcessStep = {
  number: string;
  title: string;
  blurb: string;
};

export type ClientTier = {
  tier: string;
  note: string;
  clients: string[];
};

export type Engagement = {
  year: string;
  practice: string;
  sector: string;
  title: string;
  metric: string;
  challenge: string;
  delivered: string;
  outcome: string;
};

export type SpeakingTheme = {
  number: string;
  title: string;
  body: string;
};

export type SpeakingFormat = { title: string; blurb: string };

export type SpeakingEvent = {
  date: string;
  title: string;
  place: string;
  blurb: string;
  intl?: boolean;
};

export type SpeakingStat = { value: string; label: string };

export type Challenge = {
  title: string;
  body: string;
  capabilities: string[];
};

// UI strings for the services OVERVIEW page sections (server + client
// components). Sub-page prose lives in dictionaries/{en,hu}/services.json.
export type ServicesUi = {
  hero: { eyebrow: string; titleLead: string; titleAccent: string; lead: string };
  approach: { heading: string; lead: string; principles: { title: string; body: string }[] };
  showcase: { titleLead: string; titleAccent: string; lead: string; explore: string };
  tree: {
    fixedHeading: string;
    fixedLead: string;
    staticHeading: string;
    staticLead: string;
    appliedResearch: string;
    keepScrolling: string;
  };
  method: { heading: string; lead: string };
  clients: { headingBefore: string; headingNoWrap: string; headingAfter: string; lead: string };
  partners: { eyebrow: string; heading: string; lead: string; visit: string };
  faq: { eyebrow: string; heading: string; lead: string; ask: string };
  cta: { titleLead: string; titleAccent: string; body: string; button: string };
  common: {
    proof: string;
    projectsBehind: string;
    allProjects: string;
    readStory: string;
  };
};

export type ServicesContent = {
  practices: Practice[];
  processSteps: ProcessStep[];
  clientTiers: ClientTier[];
  speakingThemes: SpeakingTheme[];
  speakingFormats: SpeakingFormat[];
  engagements: Engagement[];
  speakingEvents: SpeakingEvent[];
  speakingStats: SpeakingStat[];
  challenges: Challenge[];
  ui: ServicesUi;
};

// ─────────────────────────────────────────────────────────────────────────
// ENGLISH (primary)
// ─────────────────────────────────────────────────────────────────────────
const en: ServicesContent = {
  practices: [
    {
      number: "01",
      slug: "consulting",
      tag: "Strategy",
      title: "Consulting & strategy",
      lead: "The questions a strategy depends on, answered with research and data.",
      description:
        "From how residents feel about tourism to a destination's online presence, we research the questions strategy depends on, then turn the answers into strategy, development and policy, for destinations, national tourism organisations and the businesses in their ecosystem.",
      serves: ["Ministries & NTOs", "DMO & TDM organisations", "Municipalities", "Tourism SMEs"],
      deliverables: [
        "Research & analysis",
        "Digital maturity & visibility",
        "Strategy & development",
        "Feasibility & cost-benefit",
        "Policy & methodology",
      ],
      photo: {
        src: "/images/references/balaton365-balatonkenese-2026/balaton365-podiumbeszelgetes-panel-02.jpg",
        alt: "Panel discussion at the Balaton365 conference in Balatonkenese",
      },
    },
    {
      number: "02",
      slug: "development",
      tag: "Build",
      title: "Development & digitalisation",
      lead: "Where strategy becomes a working system.",
      description:
        "We turn a validated idea into something that works: digital process design, pilot projects and practical AI adoption, built for how tourism organisations actually operate. Where it fits, we deliver this through our own brands, Visible Tourism and AI4Tourism.",
      serves: ["DMO & TDM organisations", "Tourism SMEs", "Attractions & operators"],
      deliverables: [
        "Digital process design & system integration",
        "Pilot & innovation projects",
        "AI adoption & data-driven operations",
        "Experience & service development",
      ],
      flagship: {
        metric: "Sector-wide",
        label: "Provider digital audit",
        outcome: "A custom scoring system applied across the provider base to map digital readiness.",
      },
      photo: {
        src: "/images/references/itb-berlin-2026/ai4tourism-itb-berlin-2026-bemutato-05.jpg",
        alt: "AI4Tourism demonstration at the ITB Berlin 2026 stand",
      },
    },
    {
      number: "03",
      slug: "education",
      tag: "Mentoring",
      title: "Education & mentoring",
      lead: "The digital and AI skills a tourism team needs, from prompting to Google visibility.",
      description:
        "Workshops, courses and one-to-one mentoring that build digital and AI capability inside a tourism team, from a DMO learning to use AI to a single provider getting found on Google. We deliver it under Turizmus Tudástár, Visible Tourism and ai4tourism.",
      serves: ["Tourism SMEs", "DMO & TDM organisations", "Public institutions"],
      deliverables: [
        "AI & digital workshops",
        "Courses & national curricula",
        "One-to-one Google & AI mentoring",
        "Online visibility, with Visible Tourism",
      ],
      photo: {
        src: "/images/references/ai-kepzes-visitbalaton365-dmo-2025/schmutz-adam-ai-kepzes-visitbalaton365-dmo-keszthely-2025-01.jpg",
        alt: "AI training for the VisitBalaton365 DMO team in Keszthely",
      },
    },
    {
      number: "04",
      slug: "public-speaking",
      tag: "Speaking",
      title: "Public speaking",
      lead: "Research-led talks on AI and the digital shift in tourism.",
      description:
        "Adam Schmutz speaks on AI search visibility, online presence and data-driven destination management, in Hungarian and English, from conference keynotes to closed-door workshops. Every talk is built on our own primary research.",
      serves: ["Conferences & sector events", "Public institutions", "Industry programmes"],
      deliverables: [
        "AI search visibility",
        "Online presence that sells",
        "Data-driven destination management",
        "Measurable sustainability",
      ],
      photo: {
        src: "/images/references/foldnap-2026/schmutz-adam-eloadas-foldnapi-konferencia-balaton-2026-01.jpg",
        alt: "Talk at the Earth Day conference at Lake Balaton",
      },
    },
  ],
  processSteps: [
    { number: "01", title: "Frame", blurb: "We agree the real question before answering it." },
    { number: "02", title: "Research", blurb: "We gather the evidence the decision needs." },
    { number: "03", title: "Develop", blurb: "We design the strategy or solution, with you involved throughout." },
    { number: "04", title: "Build", blurb: "We put it to work, digitally, organisationally or in service." },
    { number: "05", title: "Measure", blurb: "We check the result against the goal, and refine." },
  ],
  clientTiers: [
    {
      tier: "Public & national",
      note: "Policy and system level",
      clients: ["Ministries", "National tourism organisations", "Regional development agencies"],
    },
    {
      tier: "Destination management",
      note: "Place level",
      clients: ["DMO organisations", "TDM organisations", "Municipalities"],
    },
    {
      tier: "Businesses & providers",
      note: "Operator level",
      clients: ["Tourism SMEs", "Accommodation", "Restaurants & hospitality", "Attractions & experiences"],
    },
  ],
  speakingThemes: [
    {
      number: "01",
      title: "Being found in the age of AI search",
      body: "How destinations and providers get found, or get skipped, as search shifts from results pages to AI answers. We cover GEO and AEO, and why they are not the old SEO.",
    },
    {
      number: "02",
      title: "Online presence that sells",
      body: "Why so many tourism businesses are technically online yet commercially invisible, and what closes that gap, from the Google ecosystem to the online visitor journey.",
    },
    {
      number: "03",
      title: "Data-driven destination management",
      body: "Running a destination on live evidence, drawing on Hungary's national real-time tourism data system and the AI forecasting built on it.",
    },
    {
      number: "04",
      title: "Measurable sustainability",
      body: "Turning digitalisation and the EU's green-claims rules into sustainability a destination can prove.",
    },
  ],
  speakingFormats: [
    { title: "Keynote talk", blurb: "A research-led talk for your conference or event." },
    { title: "Panel & moderation", blurb: "We sit on the panel, or run it." },
    { title: "Workshop & training", blurb: "Sessions that end with a plan your team can use." },
    { title: "Podcast & interview", blurb: "A returning guest voice on AI and digital tourism." },
  ],
  engagements: [
    {
      year: "2022",
      practice: "development",
      sector: "Digital tourism",
      title: "Digital tourism research",
      metric: "Provider base",
      challenge: "A fast-growing provider base, with no view of how it actually performed online.",
      delivered: "A custom scoring system applied across the provider base, mapping the full online visitor journey.",
      outcome: "The first study of its kind in Hungary, with prioritised digital-investment directions.",
    },
    {
      year: "2020",
      practice: "consulting",
      sector: "Hospitality regulation",
      title: "National hospitality categorisation",
      metric: "Decree 634/2020",
      challenge: "Hungary needed a defensible way to classify hospitality venues nationwide.",
      delivered: "A full classification methodology, definitions and a registration mechanism, agreed with sector leaders.",
      outcome: "Adopted directly into national law, Government Decree 634/2020 (XII. 22.).",
    },
    {
      year: "2018",
      practice: "consulting",
      sector: "Active tourism",
      title: "Lake Balaton bike route",
      metric: "Regional CBA",
      challenge: "A region-wide cycling investment needed a credible go or no-go basis.",
      delivered: "A feasibility study and cost-benefit analysis weighing the investment against long-term operation.",
      outcome: "A decision-ready case, with the graphic summary picked up across the press.",
    },
  ],
  speakingEvents: [
    {
      date: "May 2026",
      title: "Data-driven tourism as a European best practice",
      place: "Smart Tour (Interreg Europe), Brittany, France",
      blurb: "Hungary's national real-time data system, presented to European DMOs as a model others can follow.",
      intl: true,
    },
    {
      date: "Apr 2026",
      title: "AI-based solutions in tourism (Part 2)",
      place: "DigiTurismo podcast, covered by turizmus.com",
      blurb: "Why AI became the invisible infrastructure of tourism, and why GEO matters more than SEO.",
    },
    {
      date: "Mar 2026",
      title: "Launching AI4Tourism at ITB Berlin",
      place: "ITB Berlin 2026, the world's largest tourism trade fair, Germany",
      blurb: "Many new professional contacts in three days at the anniversary edition.",
      intl: true,
    },
    {
      date: "Mar 2026",
      title: "Innovation opportunities in tourism",
      place: "KULTKIKÖTŐ cultural tourism conference, Balatonföldvár",
      blurb: "Panel with a Visit Hungary expert: the real barrier to innovation is decision logic, not technology.",
    },
    {
      date: "Oct 2025",
      title: "Visible Tourism at Tourism Summit 2025",
      place: "Tourism Summit (Visit Hungary), Bálna, Budapest",
      blurb: "Google visibility and GEO for tourism SMEs and destinations.",
    },
    {
      date: "Sep 2025",
      title: "VisitBalaton365's AI journey",
      place: "AI Opener Bootcamp, University of Edinburgh, UK",
      blurb: "A practical DMO AI story told on an international stage, to inspire other European destinations.",
      intl: true,
    },
    {
      date: "2025",
      title: "Waiting for a click (peer-reviewed study)",
      place: "Turizmus Bulletin, Corvinus University of Budapest",
      blurb: "Lake Balaton gastro businesses: most have an advanced digital presence, yet only a small share sell online.",
    },
    {
      date: "2023",
      title: "Digital hospitality at Lake Balaton",
      place: "Book chapter, Akadémiai Kiadó",
      blurb: "An analysis of a large set of provider websites, with University of Pannonia researchers.",
    },
  ],
  speakingStats: [
    { value: "Regular", label: "talks, panels and appearances" },
    { value: "International", label: "appearances across Europe" },
    { value: "Research", label: "behind every talk" },
    { value: "Peer-reviewed", label: "academic publications" },
  ],
  challenges: [
    {
      title: "Turning scattered activity into measurable development",
      body: "Destinations invest in promotion and projects, yet rarely have a clear view of what is actually working. Effort accumulates while evidence does not. We replace assumption with measurement, so decisions rest on what the data shows rather than on what everyone hopes.",
      capabilities: ["Market & digital research", "Cost-benefit analysis", "Performance measurement"],
    },
    {
      title: "Building strategy that survives contact with reality",
      body: "A plan is easy to commission and hard to ground. Without field research behind it, a strategy reads well and then stalls on the first practical obstacle. We start from evidence, so the direction still holds when it meets the operators, budgets and timelines it depends on.",
      capabilities: ["Destination strategy", "Feasibility studies", "Development concepts"],
    },
    {
      title: "Keeping capability inside the organisation",
      body: "Outside help can solve the immediate problem and still leave nothing behind. When the engagement ends, the knowledge tends to leave with it. We build understanding into the team itself, through mentoring and training designed so the organisation can carry the work on without us.",
      capabilities: ["Organisational mentoring", "Training programme design", "AI adoption"],
    },
    {
      title: "Modernising a sector faster than its rules can move",
      body: "Tourism changes more quickly than the standards and structures meant to govern it, and good intentions outpace the frameworks that would make them workable. We translate new practice into something durable: methodologies, standards and digital systems the sector can actually adopt.",
      capabilities: ["Regulatory methodology", "Digital process design", "Sector standards"],
    },
  ],
  ui: {
    hero: {
      eyebrow: "Services",
      titleLead: "Turn destination data into",
      titleAccent: "strategic advantage.",
      lead: "Tailor-made digital solutions and data for DMOs and tourism SMEs.",
    },
    approach: {
      heading: "We don't just advise. We build what we recommend.",
      lead: "Most tourism consultancies hand over a report and leave. We do the research and the strategy, then build the digital and AI that makes it real, and train your team so it lasts.",
      principles: [
        {
          title: "Research & strategy",
          body: "We work out what your destination or business should actually do, and back it with evidence.",
        },
        {
          title: "Build & digitalise",
          body: "We turn the strategy into working digital and AI tools, through our own products.",
        },
        {
          title: "Embed",
          body: "We train your team so the capability stays with you, not on a consultant's laptop.",
        },
      ],
    },
    showcase: {
      titleLead: "Accepting all",
      titleAccent: "challenges.",
      lead: "At our core we are problem solvers, and because no two challenges are the same, neither is the way we respond. Four services, each its own, combined only when your challenge needs it.",
      explore: "Explore",
    },
    tree: {
      fixedHeading: "Four services. Four ways in.",
      fixedLead: "Consulting, development, education and public speaking. Take any one on its own; what they share is one body of research, applied four ways.",
      staticHeading: "Four services. Four ways in.",
      staticLead: "Consulting, development, education and public speaking. Take any one on its own; what they share is a research-led way of working.",
      appliedResearch: "Applied research",
      keepScrolling: "Keep scrolling",
    },
    method: {
      heading: "How we work on a challenge.",
      lead: "Whichever of the four services you take, we work the same disciplined way. Not every project needs every step, we start where your challenge is and stop at a result you can measure.",
    },
    clients: {
      headingBefore: "From ministries to ",
      headingNoWrap: "family-run",
      headingAfter: " guesthouses.",
      lead: "We work at every level of the tourism economy, in Hungary and internationally, and translate between them.",
    },
    partners: {
      eyebrow: "Partners",
      heading: "Organisations we work with.",
      lead: "National bodies, destinations, universities and municipalities across Hungarian tourism.",
      visit: "Visit",
    },
    faq: {
      eyebrow: "FAQ",
      heading: "Questions we hear most.",
      lead: "If yours is not here, send it through the contact page and we will answer directly.",
      ask: "Ask us anything",
    },
    cta: {
      titleLead: "Let's work",
      titleAccent: "together.",
      body: "A strategy, a study, a programme, or an early-stage idea. Send us a short note and we will tell you whether and how we can help.",
      button: "Get in touch",
    },
    common: {
      proof: "Proof",
      projectsBehind: "Projects behind this service.",
      allProjects: "All projects",
      readStory: "Read the story",
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────
// HUNGARIAN
// ─────────────────────────────────────────────────────────────────────────
const hu: ServicesContent = {
  practices: [
    {
      number: "01",
      slug: "consulting",
      tag: "Stratégia",
      title: "Tanácsadás és stratégia",
      lead: "A stratégia sorsát eldöntő kérdések, kutatással és adatokkal megválaszolva.",
      description:
        "A helyiek turizmushoz fűződő viszonyától a desztinációk online jelenlétéig azokat a kérdéseket kutatjuk, amelyeken a stratégia múlik, majd a válaszokból stratégiát, fejlesztést és szakpolitikát formálunk desztinációk, nemzeti turisztikai szervezetek és az ökoszisztémájukban működő vállalkozások számára.",
      serves: ["Minisztériumok és NTO-k", "DMO- és TDM-szervezetek", "Önkormányzatok", "Turisztikai kkv-k"],
      deliverables: [
        "Kutatás és elemzés",
        "Digitális érettség és láthatóság",
        "Stratégia és fejlesztés",
        "Megvalósíthatóság és költség-haszon",
        "Szakpolitika és módszertan",
      ],
      photo: {
        src: "/images/references/balaton365-balatonkenese-2026/balaton365-podiumbeszelgetes-panel-02.jpg",
        alt: "Panelbeszélgetés a Balaton365 konferencián, Balatonkenesén",
      },
    },
    {
      number: "02",
      slug: "development",
      tag: "Megvalósítás",
      title: "Fejlesztés és digitalizáció",
      lead: "Ahol a stratégiából működő rendszer lesz.",
      description:
        "A bevált ötletet működő megoldássá alakítjuk: digitális folyamattervezés, pilotprojektek és gyakorlati AI-bevezetés, a turisztikai szervezetek valós működéséhez igazítva. Ahol erre mód van, ezt saját márkáinkon, a Visible Tourismon és az AI4Tourismon keresztül valósítjuk meg.",
      serves: ["DMO- és TDM-szervezetek", "Turisztikai kkv-k", "Látványosságok és üzemeltetők"],
      deliverables: [
        "Digitális folyamattervezés és rendszerintegráció",
        "Pilot- és innovációs projektek",
        "AI-bevezetés és adatvezérelt működés",
        "Élmény- és szolgáltatásfejlesztés",
      ],
      flagship: {
        metric: "Ágazati szintű",
        label: "Szolgáltatói digitális audit",
        outcome: "Saját pontozórendszerünket a teljes szolgáltatói körre alkalmazva térképeztük fel a digitális felkészültséget.",
      },
      photo: {
        src: "/images/references/itb-berlin-2026/ai4tourism-itb-berlin-2026-bemutato-05.jpg",
        alt: "AI4Tourism bemutató az ITB Berlin 2026 standján",
      },
    },
    {
      number: "03",
      slug: "education",
      tag: "Mentorálás",
      title: "Oktatás és mentorálás",
      lead: "A digitális és AI-készségek, amelyekre egy turisztikai csapatnak szüksége van, a promptolástól a Google-láthatóságig.",
      description:
        "Workshopok, kurzusok és személyes mentorálás, amelyek egy turisztikai csapaton belül építik a digitális és AI-képességeket, az AI használatát tanuló DMO-tól az egyéni szolgáltatóig, aki a Google-on szeretne láthatóvá válni. Mindezt a Turizmus Tudástár, a Visible Tourism és az AI4Tourism keretében nyújtjuk.",
      serves: ["Turisztikai kkv-k", "DMO- és TDM-szervezetek", "Közintézmények"],
      deliverables: [
        "AI- és digitális workshopok",
        "Kurzusok és országos tananyagok",
        "Személyes Google- és AI-mentorálás",
        "Online láthatóság a Visible Tourismmal",
      ],
      photo: {
        src: "/images/references/ai-kepzes-visitbalaton365-dmo-2025/schmutz-adam-ai-kepzes-visitbalaton365-dmo-keszthely-2025-01.jpg",
        alt: "AI-képzés a VisitBalaton365 DMO csapatának Keszthelyen",
      },
    },
    {
      number: "04",
      slug: "public-speaking",
      tag: "Előadás",
      title: "Előadások",
      lead: "Kutatásalapú előadások az AI-ről és a turizmus digitális átalakulásáról.",
      description:
        "Schmutz Ádám az AI-alapú keresési láthatóságról, az online jelenlétről és az adatvezérelt desztinációmenedzsmentről beszél, magyarul és angolul, a konferencia-előadásoktól a zártkörű workshopokig. Minden előadás a saját elsődleges kutatásunkra épül.",
      serves: ["Konferenciák és szakmai események", "Közintézmények", "Ágazati programok"],
      deliverables: [
        "AI-alapú keresési láthatóság",
        "Értékesítő online jelenlét",
        "Adatvezérelt desztinációmenedzsment",
        "Mérhető fenntarthatóság",
      ],
      photo: {
        src: "/images/references/foldnap-2026/schmutz-adam-eloadas-foldnapi-konferencia-balaton-2026-01.jpg",
        alt: "Előadás a Föld napi konferencián a Balatonnál",
      },
    },
  ],
  processSteps: [
    { number: "01", title: "Keretezés", blurb: "A válasz előtt megállapodunk a valódi kérdésben." },
    { number: "02", title: "Kutatás", blurb: "Összegyűjtjük a döntéshez szükséges bizonyítékokat." },
    { number: "03", title: "Kidolgozás", blurb: "Megtervezzük a stratégiát vagy a megoldást, az Ön folyamatos bevonásával." },
    { number: "04", title: "Megvalósítás", blurb: "Munkába állítjuk: digitálisan, szervezetileg vagy a szolgáltatásban." },
    { number: "05", title: "Mérés", blurb: "Az eredményt a célhoz mérjük, és finomítunk rajta." },
  ],
  clientTiers: [
    {
      tier: "Közszféra és nemzeti szint",
      note: "Szakpolitikai és rendszerszint",
      clients: ["Minisztériumok", "Nemzeti turisztikai szervezetek", "Regionális fejlesztési ügynökségek"],
    },
    {
      tier: "Desztinációmenedzsment",
      note: "Települési szint",
      clients: ["DMO-szervezetek", "TDM-szervezetek", "Önkormányzatok"],
    },
    {
      tier: "Vállalkozások és szolgáltatók",
      note: "Üzemeltetői szint",
      clients: ["Turisztikai kkv-k", "Szálláshelyek", "Vendéglátás", "Látványosságok és élmények"],
    },
  ],
  speakingThemes: [
    {
      number: "01",
      title: "Láthatóság az AI-keresés korában",
      body: "Hogyan találják meg, vagy hagyják ki a desztinációkat és a szolgáltatókat, ahogy a keresés a találati oldalakról az AI-válaszok felé tolódik. Szó esik a GEO-ról és az AEO-ról, és arról, miért nem a régi SEO ez.",
    },
    {
      number: "02",
      title: "Értékesítő online jelenlét",
      body: "Miért van annyi turisztikai vállalkozás, amely technikailag jelen van az interneten, üzletileg mégis láthatatlan, és mi hidalja át ezt a szakadékot, a Google-ökoszisztémától az online vendégútig.",
    },
    {
      number: "03",
      title: "Adatvezérelt desztinációmenedzsment",
      body: "Egy desztináció vezetése valós idejű adatok alapján, Magyarország nemzeti, valós idejű turisztikai adatrendszerére és az arra épülő AI-előrejelzésre támaszkodva.",
    },
    {
      number: "04",
      title: "Mérhető fenntarthatóság",
      body: "A digitalizáció és az EU környezetbarát állításokra vonatkozó szabályainak átfordítása olyan fenntarthatósággá, amelyet egy desztináció bizonyítani is tud.",
    },
  ],
  speakingFormats: [
    { title: "Vezérelőadás", blurb: "Kutatásalapú előadás az Ön konferenciájára vagy eseményére." },
    { title: "Panel és moderálás", blurb: "Helyet foglalunk a panelben, vagy levezetjük azt." },
    { title: "Workshop és tréning", blurb: "Foglalkozások, amelyek végén olyan terv születik, amelyet a csapata használni tud." },
    { title: "Podcast és interjú", blurb: "Visszatérő vendéghang az AI-ről és a digitális turizmusról." },
  ],
  engagements: [
    {
      year: "2022",
      practice: "development",
      sector: "Digitális turizmus",
      title: "Digitális turisztikai kutatás",
      metric: "Szolgáltatói kör",
      challenge: "Gyorsan bővülő szolgáltatói kör, anélkül hogy bárki látta volna, valójában hogyan teljesít online.",
      delivered: "Saját pontozórendszer a teljes szolgáltatói körre alkalmazva, amely a teljes online vendégutat feltérképezte.",
      outcome: "Magyarországon az első ilyen jellegű kutatás, rangsorolt digitális fejlesztési irányokkal.",
    },
    {
      year: "2020",
      practice: "consulting",
      sector: "Vendéglátás szabályozása",
      title: "Országos vendéglátóhely-kategorizáció",
      metric: "634/2020. rendelet",
      challenge: "Magyarországnak megalapozott módszerre volt szüksége a vendéglátóhelyek országos osztályozásához.",
      delivered: "Teljes osztályozási módszertan, definíciók és regisztrációs mechanizmus, az ágazat vezetőivel egyeztetve.",
      outcome: "Közvetlenül a nemzeti jogba emelve, a 634/2020. (XII. 22.) Korm. rendeletként.",
    },
    {
      year: "2018",
      practice: "consulting",
      sector: "Aktív turizmus",
      title: "Balatoni kerékpárút",
      metric: "Regionális költség-haszon elemzés",
      challenge: "Egy egész régiót érintő kerékpáros beruházáshoz hiteles döntési alapra volt szükség.",
      delivered: "Megvalósíthatósági tanulmány és költség-haszon elemzés, amely a beruházást a hosszú távú üzemeltetéssel veti össze.",
      outcome: "Döntésre kész anyag, amelynek grafikus összefoglalóját a sajtó is átvette.",
    },
  ],
  speakingEvents: [
    {
      date: "2026. május",
      title: "Adatvezérelt turizmus mint európai jó gyakorlat",
      place: "Smart Tour (Interreg Europe), Bretagne, Franciaország",
      blurb: "Magyarország nemzeti, valós idejű adatrendszere, európai DMO-knak bemutatva mint követhető modell.",
      intl: true,
    },
    {
      date: "2026. április",
      title: "AI-alapú megoldások a turizmusban (2. rész)",
      place: "DigiTurismo podcast, a turizmus.com tudósításában",
      blurb: "Miért vált az AI a turizmus láthatatlan infrastruktúrájává, és miért fontosabb a GEO, mint a SEO.",
    },
    {
      date: "2026. március",
      title: "Az AI4Tourism bemutatása az ITB Berlinen",
      place: "ITB Berlin 2026, a világ legnagyobb turisztikai szakvására, Németország",
      blurb: "Számos új szakmai kapcsolat három nap alatt, a jubileumi kiadáson.",
      intl: true,
    },
    {
      date: "2026. március",
      title: "Innovációs lehetőségek a turizmusban",
      place: "KULTKIKÖTŐ kulturális turisztikai konferencia, Balatonföldvár",
      blurb: "Panel egy Visit Hungary-szakértővel: az innováció valódi akadálya a döntési logika, nem a technológia.",
    },
    {
      date: "2025. október",
      title: "A Visible Tourism a Tourism Summit 2025-ön",
      place: "Tourism Summit (Visit Hungary), Bálna, Budapest",
      blurb: "Google-láthatóság és GEO a turisztikai kkv-knak és desztinációknak.",
    },
    {
      date: "2025. szeptember",
      title: "A VisitBalaton365 AI-útja",
      place: "AI Opener Bootcamp, University of Edinburgh, Egyesült Királyság",
      blurb: "Egy gyakorlati DMO AI-történet nemzetközi színpadon, más európai desztinációk inspirálására.",
      intl: true,
    },
    {
      date: "2025",
      title: "Várakozás egy kattintásra (lektorált tanulmány)",
      place: "Turizmus Bulletin, Budapesti Corvinus Egyetem",
      blurb: "Balatoni gasztrovállalkozások: a többségnek fejlett digitális jelenléte van, online mégis csak töredékük értékesít.",
    },
    {
      date: "2023",
      title: "Digitális vendéglátás a Balatonnál",
      place: "Könyvfejezet, Akadémiai Kiadó",
      blurb: "Szolgáltatói weboldalak széles körének elemzése a Pannon Egyetem kutatóival.",
    },
  ],
  speakingStats: [
    { value: "Rendszeres", label: "előadások, panelek és megjelenések" },
    { value: "Nemzetközi", label: "megjelenések Európa-szerte" },
    { value: "Kutatás", label: "minden előadás mögött" },
    { value: "Lektorált", label: "tudományos publikációk" },
  ],
  challenges: [
    {
      title: "A szétszórt tevékenységből mérhető fejlesztés",
      body: "A desztinációk pénzt fektetnek promócióba és projektekbe, mégis ritkán látják tisztán, mi működik valójában. A ráfordítás halmozódik, a bizonyíték nem. A feltételezést méréssel váltjuk fel, így a döntések arra épülnek, amit az adat mutat, nem arra, amit mindenki remél.",
      capabilities: ["Piaci és digitális kutatás", "Költség-haszon elemzés", "Teljesítménymérés"],
    },
    {
      title: "Olyan stratégia, amely kiállja a valóság próbáját",
      body: "Egy tervet könnyű megrendelni és nehéz megalapozni. Terepkutatás nélkül a stratégia jól olvasható, majd elakad az első gyakorlati akadálynál. Bizonyítékból indulunk ki, így az irány akkor is megállja a helyét, amikor találkozik az üzemeltetőkkel, a költségvetésekkel és a határidőkkel, amelyeken múlik.",
      capabilities: ["Desztinációs stratégia", "Megvalósíthatósági tanulmányok", "Fejlesztési koncepciók"],
    },
    {
      title: "A képesség megtartása a szervezeten belül",
      body: "A külső segítség megoldhatja az aktuális problémát, és mégsem hagy maga után semmit. Amikor a megbízás véget ér, a tudás jellemzően vele együtt távozik. Mi magába a csapatba építjük be a tudást, olyan mentorálással és képzéssel, amelynek köszönhetően a szervezet nélkülünk is tovább tudja vinni a munkát.",
      capabilities: ["Szervezeti mentorálás", "Képzési program tervezése", "AI-bevezetés"],
    },
    {
      title: "Egy ágazat modernizálása gyorsabban, mint ahogy a szabályai mozdulnak",
      body: "A turizmus gyorsabban változik, mint a szabályozására hivatott normák és struktúrák, és a jó szándék lehagyja azokat a kereteket, amelyek működőképessé tennék. Az új gyakorlatot tartós eszközökké fordítjuk: módszertanokká, szabványokká és digitális rendszerekké, amelyeket az ágazat valóban át tud venni.",
      capabilities: ["Szabályozási módszertan", "Digitális folyamattervezés", "Ágazati szabványok"],
    },
  ],
  ui: {
    hero: {
      eyebrow: "Szolgáltatások",
      titleLead: "Alakítsa a desztinációs adatokat",
      titleAccent: "stratégiai előnnyé.",
      lead: "Egyedi digitális megoldások és adatok DMO-knak és turisztikai kkv-knak.",
    },
    approach: {
      heading: "Nem csak tanácsot adunk. Meg is építjük, amit javaslunk.",
      lead: "A legtöbb turisztikai tanácsadó átad egy jelentést, és távozik. Mi elvégezzük a kutatást és a stratégiát, majd megépítjük a digitális és AI-megoldást, amely valóra váltja, és felkészítjük rá a csapatát, hogy az eredmény tartós legyen.",
      principles: [
        {
          title: "Kutatás és stratégia",
          body: "Kidolgozzuk, mit kellene valójában tennie a desztinációjának vagy vállalkozásának, és bizonyítékokkal támasztjuk alá.",
        },
        {
          title: "Építés és digitalizáció",
          body: "A stratégiát működő digitális és AI-eszközökké alakítjuk, saját termékeinken keresztül.",
        },
        {
          title: "Beépítés",
          body: "Felkészítjük a csapatát, hogy a képesség Önnél maradjon, ne egy tanácsadó laptopján.",
        },
      ],
    },
    showcase: {
      titleLead: "Minden kihívást",
      titleAccent: "elfogadunk.",
      lead: "Lényegünket tekintve problémamegoldók vagyunk, és mivel nincs két egyforma kihívás, a válaszunk sem ugyanaz. Négy szolgáltatás, mindegyik önálló, és csak akkor kombináljuk őket, ha a kihívása ezt kívánja.",
      explore: "Tovább:",
    },
    tree: {
      fixedHeading: "Négy szolgáltatás. Négy belépési pont.",
      fixedLead: "Tanácsadás, fejlesztés, oktatás és előadások. Bármelyiket választhatja önállóan; ami közös bennük, az egyetlen kutatási alap, négyféleképpen alkalmazva.",
      staticHeading: "Négy szolgáltatás. Négy belépési pont.",
      staticLead: "Tanácsadás, fejlesztés, oktatás és előadások. Bármelyiket választhatja önállóan; ami közös bennük, az a kutatásalapú munkamódszer.",
      appliedResearch: "Alkalmazott kutatás",
      keepScrolling: "Görgessen tovább",
    },
    method: {
      heading: "Hogyan dolgozunk egy kihíváson.",
      lead: "Bármelyiket választja a négy szolgáltatás közül, ugyanazzal a fegyelmezett módszerrel dolgozunk. Nem minden projekthez kell minden lépés: ott kezdjük, ahol a kihívása tart, és ott állunk meg, ahol mérhető eredmény van.",
    },
    clients: {
      headingBefore: "A minisztériumoktól a ",
      headingNoWrap: "családi",
      headingAfter: " panziókig.",
      lead: "A turisztikai gazdaság minden szintjén dolgozunk, Magyarországon és nemzetközileg, és közvetítünk a szintek között.",
    },
    partners: {
      eyebrow: "Partnerek",
      heading: "Szervezetek, amelyekkel együtt dolgozunk.",
      lead: "Nemzeti szervezetek, desztinációk, egyetemek és önkormányzatok a magyar turizmusban.",
      visit: "Tovább:",
    },
    faq: {
      eyebrow: "GYIK",
      heading: "A leggyakoribb kérdések.",
      lead: "Ha az Öné nincs köztük, küldje el a kapcsolati oldalon, és közvetlenül válaszolunk.",
      ask: "Kérdezzen bátran",
    },
    cta: {
      titleLead: "Dolgozzunk",
      titleAccent: "együtt.",
      body: "Egy stratégia, egy tanulmány, egy program vagy egy korai ötlet. Küldjön néhány sort, és megmondjuk, tudunk-e segíteni, és hogyan.",
      button: "Kapcsolatfelvétel",
    },
    common: {
      proof: "Bizonyíték",
      projectsBehind: "A szolgáltatás mögötti projektek.",
      allProjects: "Összes projekt",
      readStory: "Történet elolvasása",
    },
  },
};

const datasets: Record<Locale, ServicesContent> = { en, hu };

// Server components: pass the locale you already resolved from the route.
export function getServicesContent(locale: Locale): ServicesContent {
  return datasets[locale] ?? en;
}

// Client components: mirrors lib/i18n/chrome.ts useChrome().
export function useServicesContent(): ServicesContent {
  return datasets[useLocale()] ?? en;
}
