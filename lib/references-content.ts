// Content for the /references page: a blog-style record of selected work,
// grouped under the four services. Voice: plain, factual, evidence-led.
// Tags are DECORATIVE labels on each card, not filters.
//
// To add a reference later: drop a new object into the matching group's
// `items` array. `tags` are just chips. `meta` is the small footer line
// (year, client, venue). `href` is optional (external link or sub-page).

import { practices } from "@/lib/services-content";

export type Reference = {
  tags: string[];
  title: string;
  summary: string;
  meta: string;
  href?: string;
};

export type ReferenceGroup = {
  slug: string;
  tag: string;
  title: string;
  blurb: string;
  items: Reference[];
};

// Section headers reuse the four services so the page stays in step with /services.
const head = (slug: string) => {
  const p = practices.find((x) => x.slug === slug)!;
  return { slug: p.slug, tag: p.tag, title: p.title };
};

export const referenceGroups: ReferenceGroup[] = [
  {
    ...head("consulting"),
    blurb: "Strategies, studies and methodologies that public bodies and destinations acted on.",
    items: [
      {
        tags: ["Methodology", "National law"],
        title: "National hospitality categorisation",
        summary:
          "A full classification methodology, definitions and registration mechanism, agreed with sector leaders and adopted directly into national law.",
        meta: "2020 · Government Decree 634/2020",
      },
      {
        tags: ["Feasibility", "Cost-benefit"],
        title: "Lake Balaton bike route",
        summary:
          "A feasibility study and cost-benefit analysis weighing a region-wide cycling investment against its long-term operation, giving a decision-ready basis.",
        meta: "2018 · Lake Balaton region",
      },
    ],
  },
  {
    ...head("development"),
    blurb: "Pilots, digital process design and AI adoption, built for how tourism actually operates.",
    items: [
      {
        tags: ["Research", "Digital audit"],
        title: "Provider digital-readiness study",
        summary:
          "A custom scoring system applied across 1,300 providers, mapping the full online visitor journey. The first study of its kind in Hungary.",
        meta: "2022 · 1,300 providers",
      },
    ],
  },
  {
    ...head("education"),
    blurb: "Training and mentoring designed so capability stays inside the organisation.",
    items: [
      {
        tags: ["Programme", "Curriculum"],
        title: "National training programme",
        summary:
          "A training programme built from the ground up with a full curriculum, launched nationally and still running.",
        meta: "2022 · National",
      },
    ],
  },
  {
    ...head("public-speaking"),
    blurb: "Keynotes, panels and our own podcast, making digital and innovation trends usable for the sector.",
    items: [
      {
        tags: ["Podcast", "Series"],
        title: "Tourism innovation podcast",
        summary:
          "Our own podcast, turning digital and innovation trends into conversations the sector can act on.",
        meta: "Ongoing · HU",
      },
    ],
  },
];
