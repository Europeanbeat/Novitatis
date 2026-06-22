import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/navigation";
import { FooterSection } from "@/components/layout/footer";
import { RelatedProjects } from "@/components/sections/services/related-projects";
import { practices } from "@/lib/services-content";

const practice = practices.find((p) => p.slug === "consulting")!;

export const metadata: Metadata = {
  title: "Consulting & strategy",
  description:
    "Research-led consulting and strategy for tourism: destination strategy and development, feasibility studies, research and analysis, and policy and methodology.",
};

const halo =
  "absolute -inset-x-8 -inset-y-6 -z-10 backdrop-blur-sm bg-background/60 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)]";

// The services we provide (the offerings), written in an analytical, readable
// register, not sales teasers. The specific projects behind each live in
// "Our Projects", not here.
const services = [
  {
    title: "Research & analysis",
    body: "How do residents feel about tourism? How do providers actually perform online? We study the questions a strategy depends on, resident sentiment, provider performance, market and digital maturity, and turn them into evidence leaders can act on.",
  },
  {
    title: "Digital maturity & visibility",
    body: "How visible is a destination when someone searches, or asks an AI? We audit how it and its providers show up across search results and AI answers, score the gaps with systems we have built, and map where the visitor journey breaks.",
  },
  {
    title: "Strategy & development",
    body: "What should a destination do next, and why? We build the destination strategies and development plans that answer that, grounded in research and shaped with the people who have to deliver them.",
  },
  {
    title: "Feasibility & cost-benefit",
    body: "Will a development actually be used once it is built, and can it pay its way? We run the feasibility studies and cost-benefit analysis that answer that, weighing demand against supply, the audience it serves and the cost of running it for years, work that has backed EU-funded and national developments.",
  },
  {
    title: "Policy & methodology",
    body: "How does a sector agree on what counts as a restaurant, or a quality standard? We build the methodologies and definitions that answer that, like the hospitality categorisation we wrote into Government Decree 634/2020, and reusable frameworks such as a destination-strategy methodology and a guest-satisfaction index.",
  },
];

// How we work: the booklet's real method, framed with DTTT's "what's working,
// what's not, where the opportunities are".
const method = [
  {
    step: "01",
    title: "Research & data",
    body: "We combine field research and interviews with the data a destination already holds, from national statistics to provider performance online, and score it with models we have built.",
  },
  {
    step: "02",
    title: "Strategy",
    body: "We develop the strategy with you, moving from the evidence through prototypes to a costed plan.",
  },
  {
    step: "03",
    title: "Deliver & measure",
    body: "You get a plan ready to implement, often with the funding case behind it, and a clear way to measure whether it worked.",
  },
];

export default function ConsultingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />

      {/* 1 — HERO: real positioning from the booklet, analytical register */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 pt-28 pb-8 lg:pt-32 lg:pb-10">
        <Link
          href="/services"
          className="font-mono text-sm text-[#334F5A]/70 inline-flex items-center gap-2 mb-10 hover:text-[#334F5A] transition-colors"
        >
          <span className="text-[#AAD7E6]">&larr;</span> All services
        </Link>

        <div className="relative isolate">
          <span aria-hidden className={halo} />
          <span className="font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block mb-5">
            Consulting &amp; strategy
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-[#334F5A] leading-[1.04] max-w-[18ch]">
            We turn research and data into tourism strategy.
          </h1>
          <p className="mt-7 text-lg lg:text-xl text-[#334F5A]/80 leading-relaxed max-w-[64ch]">
            Destinations, national tourism organisations and the tourism
            businesses in their ecosystem, down to individual SMEs, come to us to
            understand how they really perform, online and on the ground, and to
            turn that into strategy, development and policy. As search and AI
            reshape how travellers decide, reading the digital picture is now
            central to all of it.
          </p>
          <p className="mt-5 text-lg text-[#334F5A]/80 leading-relaxed max-w-[64ch]">
            We work as a network of specialists, and on most projects our fee is
            tied to results. Most of that work is at destination and national
            level, and it reaches down to the individual providers and SMEs as
            well, the players for whom good data and digital expertise are usually
            out of reach.
          </p>
        </div>
      </section>

      {/* 2 — WHAT WE DO: the services we provide */}
      <section
        id="services"
        className="relative z-10 max-w-[1100px] mx-auto px-6 py-12 lg:py-16 scroll-mt-28"
      >
        <h2 className="font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block mb-10 lg:mb-12">
          What we do
        </h2>
        <div className="border-t border-foreground/10">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="grid md:grid-cols-12 gap-y-4 gap-x-8 lg:gap-x-12 py-10 lg:py-14 border-b border-foreground/10"
            >
              <div className="md:col-span-5 flex items-start gap-5">
                <span className="font-mono text-sm text-[#AAD7E6] pt-1.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-3xl lg:text-[2.5rem] leading-[1.05] text-[#334F5A]">
                  {s.title}
                </h3>
              </div>
              <div className="md:col-span-7 md:pt-1.5">
                <p className="text-lg lg:text-xl text-[#334F5A]/80 leading-relaxed max-w-[56ch]">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 — HOW WE WORK */}
      <section
        id="how"
        className="relative z-10 max-w-[1100px] mx-auto px-6 py-12 lg:py-16 scroll-mt-28"
      >
        <div className="rounded-[2rem] bg-[#334F5A] text-white p-8 lg:p-14">
          <h2 className="font-mono text-[11px] uppercase tracking-wider text-[#AAD7E6] block mb-5">
            How we work
          </h2>
          <p className="font-display text-2xl lg:text-3xl leading-snug max-w-[44ch] mb-10">
            Whatever the brief, the method is consistent: we read a destination
            through research and data, build the strategy from what it shows, and
            shape it with the people who have to deliver it.
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            {method.map((m) => (
              <div key={m.step}>
                <span className="font-mono text-xs text-[#AAD7E6] block mb-3">{m.step}</span>
                <p className="font-display text-xl mb-2">{m.title}</p>
                <p className="text-white/70 text-sm leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — WHO WE WORK WITH */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 py-12 lg:py-16">
        <h2 className="font-mono text-xs text-[#334F5A]/65 uppercase tracking-wider block mb-4">
          Who we work with
        </h2>
        <ul className="flex flex-wrap gap-2.5">
          {practice.serves.map((s) => (
            <li
              key={s}
              className="rounded-full bg-white border border-foreground/10 px-4 py-1.5 text-sm text-[#334F5A]/80"
            >
              {s}
            </li>
          ))}
        </ul>
      </section>

      {/* 5 — OUR PROJECTS: the detail and the proof live here */}
      <div className="relative z-10 pt-12 lg:pt-20">
        <RelatedProjects practiceSlug="consulting" />
      </div>

      {/* 6 — CTA */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 py-16 lg:py-24">
        <div className="relative isolate">
          <span aria-hidden className={halo} />
          <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05] max-w-[20ch]">
            Planning a strategy, study or funding case?
          </h2>
          <p className="mt-6 text-lg text-[#334F5A]/80 leading-relaxed max-w-[56ch]">
            Tell us the decision you are facing. We will tell you what the evidence
            says and how we would approach it.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-3 rounded-full bg-[#334F5A] text-white font-mono text-sm px-7 py-3.5 group"
            >
              <span>Let&apos;s work together</span>
              <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </Link>
            <Link
              href="/references"
              className="inline-flex items-center gap-2 font-mono text-sm text-[#334F5A]/80 hover:text-[#334F5A] transition-colors px-2"
            >
              <span>See Our Projects</span>
              <span className="text-[#AAD7E6]">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
