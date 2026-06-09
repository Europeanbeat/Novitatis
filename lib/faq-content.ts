// Services FAQ — written for AI search (GEO/AEO) and Google rich results.
// Rules: each answer leads with the direct answer, ~40-50 words, entity-rich
// (Decree 634/2020, VisitBalaton365, ITB Berlin, the 1,300-provider study) so
// AI engines can extract and cite it. British English, no em-dashes.
// Source of truth: .agents/product-marketing.md.
//
// To add a question: drop a new { q, a } into `servicesFaq`. The schema and any
// UI element read from this one array.

export type FaqItem = { q: string; a: string };

export const servicesFaq: FaqItem[] = [
  {
    q: "What does Novitatis do?",
    a: "Novitatis is a research-first consultancy and specialist network for the tourism sector. It helps ministries, destinations and tourism businesses develop through four services: consulting and strategy, development and digitalisation, education and mentoring, and public speaking. Every engagement starts from field research before any recommendation.",
  },
  {
    q: "What are Novitatis's four main services?",
    a: "Novitatis offers four services: consulting and strategy (destination strategies, feasibility studies, regulatory methodology), development and digitalisation (digital process design, pilots and AI adoption), education and mentoring (national training programmes, AI and Google-profile mentoring), and public speaking (keynotes, panels and a podcast on tourism innovation).",
  },
  {
    q: "Who does Novitatis work with?",
    a: "Novitatis works at three levels of tourism: public and national bodies such as ministries, national tourism organisations and regional development agencies; destination management organisations including DMOs and TDMs such as VisitBalaton365, and municipalities; and businesses and providers, from tourism SMEs and accommodation to hospitality and attractions.",
  },
  {
    q: "How does a Novitatis project work?",
    a: "Novitatis follows a five-stage method: research, analysis, development, implementation and measurement. Scientifically grounded research and field work come first, the client is involved throughout, and the outcome is measured against the original objective. Results are delivered as decision-ready documents and clear visual summaries.",
  },
  {
    q: "What makes Novitatis different from a traditional consultancy?",
    a: "Novitatis is a specialist network rather than a fixed bench, assembling the right experts around each problem. It works from evidence, builds capability that stays inside the client's team, and delivers visual, decision-ready outputs. Its hospitality categorisation methodology was adopted into Hungarian law as Decree 634/2020.",
  },
  {
    q: "Can Novitatis help with AI and digital visibility in tourism?",
    a: "Yes. Through its development service and the brands ai4tourism and Visible Tourism, Novitatis helps tourism organisations adopt AI and stay visible in search, including AI search engines. It has run AI training for the VisitBalaton365 destination team and analysed the online presence of 1,300 providers.",
  },
  {
    q: "Does Novitatis work outside Hungary?",
    a: "Yes. Novitatis works across Hungary and internationally. Its team speaks and exhibits at European events including ITB Berlin, the Smart Tour Interreg Europe programme and an AI bootcamp in Edinburgh, and its work spans national and EU-level tourism development.",
  },
  {
    q: "How do you start working with Novitatis?",
    a: "Send a short note describing your strategy, study, programme or early-stage idea through the contact page. Novitatis will tell you whether and how it can help. Most engagements begin with research to define the real problem before any plan or proposal is written.",
  },
];

// FAQPage JSON-LD for Google rich results + AI extraction. Render inside a
// <script type="application/ld+json"> tag on the page (see FaqJsonLd below).
export function faqJsonLd(items: FaqItem[] = servicesFaq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
