// Services FAQ — written for AI search (GEO/AEO) and Google rich results.
// Rules: each answer leads with the direct answer, entity-rich (Decree 634/2020,
// VisitBalaton365, ITB Berlin) so AI engines can extract and cite it. British
// English, no em-dashes, no case-study statistics. Hungarian mirrors English.
// Source of truth: .agents/product-marketing.md.
//
// Consume via getServicesFaq(locale) (server) or useServicesFaq() (client).
// `servicesFaq` is kept as the English default for the JSON-LD helper below.

import { useLocale } from "@/lib/i18n/use-locale";
import type { Locale } from "@/lib/i18n/config";

export type FaqItem = { q: string; a: string };

const en: FaqItem[] = [
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
    a: "Yes. Through its development service and the brands ai4tourism and Visible Tourism, Novitatis helps tourism organisations adopt AI and stay visible in search, including AI search engines. It has run AI training for the VisitBalaton365 destination team and analysed the online presence of providers at scale.",
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

const hu: FaqItem[] = [
  {
    q: "Mivel foglalkozik a Novitatis?",
    a: "A Novitatis kutatásalapú tanácsadó és szakértői hálózat a turisztikai ágazat számára. Minisztériumok, desztinációk és turisztikai vállalkozások fejlődését segíti négy szolgáltatáson keresztül: tanácsadás és stratégia, fejlesztés és digitalizáció, oktatás és mentorálás, valamint előadások. Minden együttműködés terepkutatással kezdődik, mielőtt bármilyen javaslat születne.",
  },
  {
    q: "Mi a Novitatis négy fő szolgáltatása?",
    a: "A Novitatis négy szolgáltatást kínál: tanácsadás és stratégia (desztinációs stratégiák, megvalósíthatósági tanulmányok, szabályozási módszertan), fejlesztés és digitalizáció (digitális folyamattervezés, pilotok és AI-bevezetés), oktatás és mentorálás (országos képzési programok, AI- és Google-profil-mentorálás), valamint előadások (vezérelőadások, panelek és podcast a turisztikai innovációról).",
  },
  {
    q: "Kikkel dolgozik a Novitatis?",
    a: "A Novitatis a turizmus három szintjén dolgozik: közszférabeli és nemzeti szervezetekkel, például minisztériumokkal, nemzeti turisztikai szervezetekkel és regionális fejlesztési ügynökségekkel; desztinációmenedzsment-szervezetekkel, köztük DMO-kkal és TDM-ekkel, mint a VisitBalaton365, valamint önkormányzatokkal; és vállalkozásokkal, szolgáltatókkal, a turisztikai kkv-któl és szálláshelyektől a vendéglátásig és a látványosságokig.",
  },
  {
    q: "Hogyan zajlik egy Novitatis-projekt?",
    a: "A Novitatis ötlépéses módszert követ: kutatás, elemzés, kidolgozás, megvalósítás és mérés. Először a tudományosan megalapozott kutatás és a terepmunka jön, az ügyfél végig részt vesz a folyamatban, az eredményt pedig az eredeti célhoz mérjük. Az eredményeket döntésre kész dokumentumokként és világos vizuális összefoglalókként adjuk át.",
  },
  {
    q: "Miben különbözik a Novitatis egy hagyományos tanácsadótól?",
    a: "A Novitatis szakértői hálózat, nem pedig állandó csapat: minden problémához a megfelelő szakértőket gyűjti össze. Bizonyítékból dolgozik, olyan képességet épít, amely az ügyfél csapatánál marad, és vizuális, döntésre kész anyagokat ad át. Vendéglátóhely-kategorizációs módszertanát a 634/2020. rendeletként emelték a magyar jogba.",
  },
  {
    q: "Tud-e a Novitatis segíteni az AI-ben és a digitális láthatóságban a turizmusban?",
    a: "Igen. A fejlesztési szolgáltatásán, valamint az AI4Tourism és a Visible Tourism márkákon keresztül a Novitatis segíti a turisztikai szervezeteket az AI bevezetésében és a keresési láthatóság megtartásában, beleértve az AI-alapú keresőket is. AI-képzést tartott a VisitBalaton365 desztinációs csapatának, és nagy mintán elemezte a szolgáltatók online jelenlétét.",
  },
  {
    q: "Dolgozik-e a Novitatis Magyarországon kívül?",
    a: "Igen. A Novitatis Magyarországon és nemzetközileg egyaránt dolgozik. Csapata európai eseményeken ad elő és állít ki, többek között az ITB Berlinen, a Smart Tour Interreg Europe programban és egy edinburghi AI-bootcampen, munkája pedig a nemzeti és az uniós szintű turizmusfejlesztést is felöleli.",
  },
  {
    q: "Hogyan kezdhetünk együttműködést a Novitatisszal?",
    a: "Küldjön néhány sort a stratégiájáról, tanulmányáról, programjáról vagy korai ötletéről a kapcsolati oldalon keresztül. A Novitatis megmondja, tud-e segíteni, és hogyan. A legtöbb együttműködés kutatással indul, amely a valódi problémát határozza meg, mielőtt bármilyen terv vagy ajánlat elkészülne.",
  },
];

const datasets: Record<Locale, FaqItem[]> = { en, hu };

// English default, kept for the JSON-LD helper and the (server) faq-schema.
export const servicesFaq: FaqItem[] = en;

export function getServicesFaq(locale: Locale): FaqItem[] {
  return datasets[locale] ?? en;
}

export function useServicesFaq(): FaqItem[] {
  return datasets[useLocale()] ?? en;
}

// FAQPage JSON-LD for Google rich results + AI extraction. Render inside a
// <script type="application/ld+json"> tag on the page (see FaqJsonLd).
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
