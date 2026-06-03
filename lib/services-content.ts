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
  flagship: { metric: string; label: string; outcome: string };
};

export const practices: Practice[] = [
  {
    number: "01",
    slug: "consulting",
    tag: "Strategy",
    title: "Consulting & strategy",
    lead: "From raw data to clear direction.",
    description:
      "We produce the strategies, feasibility studies and development plans that public bodies and destinations act on. Design-thinking research and field work come first, then a direction you can defend, with the funding case to support it.",
    serves: ["Ministries & NTOs", "DMO & TDM organisations", "Municipalities", "Tourism SMEs"],
    deliverables: [
      "Destination strategies & development plans",
      "Feasibility studies & cost-benefit analysis",
      "Market & digital-presence research",
      "Regulatory methodology & legislative input",
    ],
    flagship: {
      metric: "634/2020",
      label: "Hospitality categorisation",
      outcome: "Our classification methodology was adopted into Hungarian national law.",
    },
  },
  {
    number: "02",
    slug: "development",
    tag: "Build",
    title: "Development & digitalisation",
    lead: "From validated idea to working system.",
    description:
      "We turn validated ideas into working solutions at the digital, service and organisational level: pilot projects, digital process design and AI adoption, built for how tourism actually operates and measured against the original goal.",
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
  },
  {
    number: "03",
    slug: "education",
    tag: "Mentoring",
    title: "Education & mentoring",
    lead: "Knowledge that changes how teams operate.",
    description:
      "We design education that holds, from national training programmes with full curricula to one-to-one Google-profile and AI mentoring, so capability stays inside the organisation rather than leaving with the consultant.",
    serves: ["Tourism SMEs", "DMO & TDM organisations", "Public institutions"],
    deliverables: [
      "National training programme design",
      "Turizmus Tudástár mentoring",
      "AI Mentoring Program",
      "Organisational development",
    ],
    flagship: {
      metric: "2022",
      label: "National training programme",
      outcome: "A programme we built from the ground up, launched nationally and still running.",
    },
  },
  {
    number: "04",
    slug: "public-speaking",
    tag: "Speaking",
    title: "Public speaking",
    lead: "We set the agenda, not just attend it.",
    description:
      "Through keynotes, panels and our own podcast we make digital and innovation trends usable for the sector, and push organisations to think differently about where tourism is heading.",
    serves: ["Conferences & sector events", "Public institutions", "Industry programmes"],
    deliverables: [
      "Digital & innovation keynotes",
      "Research & best-practice sessions",
      "Panel moderation",
      "Professional programme design",
    ],
    flagship: {
      metric: "HU & EU",
      label: "Conference circuit",
      outcome: "Regular speakers at national and international tourism events.",
    },
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  blurb: string;
};

export const processSteps: ProcessStep[] = [
  { number: "01", title: "Research", blurb: "We map the real situation with scientifically grounded research." },
  { number: "02", title: "Analysis", blurb: "We turn findings into insight and locate the genuine opportunities." },
  { number: "03", title: "Development", blurb: "We design solutions and working prototypes, with the client involved throughout." },
  { number: "04", title: "Implementation", blurb: "We put the concept to work, digitally, organisationally or in service." },
  { number: "05", title: "Measurement", blurb: "We measure the outcome against the original objective and refine from there." },
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
