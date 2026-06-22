// Single source of truth for the /services overview and its sub-pages.
// Voice: strategy-consultancy register. Specific, evidence-led, no filler.
// Content drawn from the brand booklet (05_Bemutatkozó_füzet/), in English.

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

export const practices: Practice[] = [
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
      metric: "1,300",
      label: "Provider digital audit",
      outcome: "A custom scoring system applied across 1,300 providers to map digital readiness.",
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
];

export type ProcessStep = {
  number: string;
  title: string;
  blurb: string;
};

export const processSteps: ProcessStep[] = [
  { number: "01", title: "Frame", blurb: "We agree the real question before answering it." },
  { number: "02", title: "Research", blurb: "We gather the evidence the decision needs." },
  { number: "03", title: "Develop", blurb: "We design the strategy or solution, with you involved throughout." },
  { number: "04", title: "Build", blurb: "We put it to work, digitally, organisationally or in service." },
  { number: "05", title: "Measure", blurb: "We check the result against the goal, and refine." },
];

export type ClientTier = {
  tier: string;
  note: string;
  clients: string[];
};

export const clientTiers: ClientTier[] = [
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
];

export type Engagement = {
  year: string;
  practice: Practice["slug"];
  sector: string;
  title: string;
  metric: string;
  challenge: string;
  delivered: string;
  outcome: string;
};

export const engagements: Engagement[] = [
  {
    year: "2022",
    practice: "development",
    sector: "Digital tourism",
    title: "Digital tourism research",
    metric: "1,300 providers",
    challenge: "A fast-growing provider base, with no view of how it actually performed online.",
    delivered: "A custom scoring system applied to 1,300 providers, mapping the full online visitor journey.",
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
];

// ── Public speaking sub-page (/services/public-speaking) ───────────────────
// Source: public_speaking_events_lista (Events EN). Every number below is taken
// straight from the sheet, nothing invented.

export type SpeakingTheme = {
  number: string;
  title: string;
  body: string;
};

export const speakingThemes: SpeakingTheme[] = [
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
];

export type SpeakingFormat = { title: string; blurb: string };

export const speakingFormats: SpeakingFormat[] = [
  { title: "Keynote talk", blurb: "A research-led talk for your conference or event." },
  { title: "Panel & moderation", blurb: "We sit on the panel, or run it." },
  { title: "Workshop & training", blurb: "Sessions that end with a plan your team can use." },
  { title: "Podcast & interview", blurb: "A returning guest voice on AI and digital tourism." },
];

export type SpeakingEvent = {
  date: string;
  title: string;
  place: string;
  blurb: string;
  intl?: boolean;
};

// Newest-first. The strongest, featured appearances from the sheet.
export const speakingEvents: SpeakingEvent[] = [
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
    blurb: "Over 250 professional contacts in three days at the 60th-anniversary edition.",
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
    blurb: "73 Lake Balaton gastro businesses: 92% have an advanced digital presence, only 5.5% sell online.",
  },
  {
    date: "2023",
    title: "Digital hospitality at Lake Balaton",
    place: "Book chapter, Akadémiai Kiadó",
    blurb: "An analysis of more than 1,300 provider websites, with University of Pannonia researchers.",
  },
];

export type SpeakingStat = { value: string; label: string };

export const speakingStats: SpeakingStat[] = [
  { value: "20+", label: "talks, panels and appearances" },
  { value: "3", label: "countries on the international circuit" },
  { value: "1,300+", label: "provider websites behind the visibility talks" },
  { value: "2", label: "peer-reviewed academic publications" },
];

export type Challenge = {
  title: string;
  body: string;
  capabilities: string[];
};

// Problem-first framing (ref.digital register): name the challenge, reframe it
// in one sharp line, then point to the capabilities that answer it.
export const challenges: Challenge[] = [
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
];
