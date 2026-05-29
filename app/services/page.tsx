import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { FooterSection } from "@/components/layout/footer";
import { PageBackground } from "@/components/layout/page-background";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four areas, one goal: progress. Consulting and analysis, custom development and digitalization, education and mentoring, and public speaking for the tourism sector.",
};

const process = [
  "Research",
  "Analysis",
  "Development",
  "Implementation",
  "Measurement",
];

const pillars = [
  {
    number: "01",
    title: "Consulting — strategy & analysis",
    lead: "From raw data to clear direction.",
    description:
      "We build strategies, feasibility studies and development concepts that decision-makers can actually use. Our work has shaped regional tourism plans, informed EU-funded investments, and produced methodologies adopted into national law.",
    points: [
      "Tourism destination strategies & development plans",
      "Feasibility studies & cost-benefit analyses",
      "Market research & digital presence assessments",
      "Regulatory methodology & legislative preparation",
      "SME strategy using design thinking",
    ],
    proof: "1,300+ providers analyzed in a single digital tourism research project",
  },
  {
    number: "02",
    title: "Custom development & digitalization",
    lead: "Innovation from idea to implementation.",
    description:
      "We turn ideas into working concepts, and concepts into development — at the digital, organisational or service level. We design pilot projects, digital workflows and AI-powered systems tailored to how tourism actually operates.",
    points: [
      "Digital process development and system integration",
      "Innovation and pilot projects",
      "Data-driven operation and AI adoption",
      "Experience and service development",
    ],
    proof: "Custom scoring systems, operating models and digital frameworks",
  },
  {
    number: "03",
    title: "Education & mentoring",
    lead: "Knowledge that becomes action.",
    description:
      "We design and deliver education that sticks — from national training frameworks to one-to-one business mentoring. A training programme we built from scratch launched nationally in April 2022. Today, Turizmus Tudástár and the AI Mentoring Program extend that work to tourism businesses across Hungary.",
    points: [
      "Tourism mentoring (Turizmus Tudástár)",
      "AI Mentoring Program — practical AI adoption",
      "Custom training programme design & delivery",
      "Innovation and organisational development mentoring",
    ],
    proof: "100+ workshops & talks delivered",
  },
  {
    number: "04",
    title: "Public speaking & mindset shaping",
    lead: "We shape thinking, we start dialogue.",
    description:
      "Through talks, panel discussions and professional programmes, we help shape the future of tourism — not just report on it. We present research, make digital trends accessible, and challenge organisations to think differently about where tourism is heading.",
    points: [
      "Digital and innovation trend presentations",
      "Research results and best-practice sharing",
      "Event moderation and professional engagement",
    ],
    proof: "National and international conferences & sector events",
  },
];

const selectedWork = [
  {
    year: "2022",
    category: "Research & analysis",
    title: "Digital tourism research",
    detail:
      "1,300 providers. A custom scoring system. An analysis of online visitor journeys across an entire destination — identifying exactly where the digital experience breaks down and where investment is needed most.",
  },
  {
    year: "2020",
    category: "Regulatory methodology",
    title: "National hospitality categorization",
    detail:
      "We developed the classification methodology for Hungarian hospitality venues. The framework was adopted directly into national law — Government Decree 634/2020 (XII. 22.).",
  },
  {
    year: "2020",
    category: "Feasibility study",
    title: "1.45 billion HUF attraction development",
    detail:
      "A full feasibility study and operating model for a major regional tourism attraction — including visitor personas, service portfolio, and business model. The attraction opened in 2022.",
  },
  {
    year: "2018–2022",
    category: "SME strategy",
    title: "Strategy & business planning",
    detail:
      "Ongoing design-thinking-led strategy engagements for tourism SMEs — from discovery workshops through to implementation support. Not just a plan delivered, but a team kept involved.",
  },
];

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <PageBackground />
      <Navigation />

      {/* Hero */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-40 pb-16">
        <ScrollReveal direction="up" duration={0.7}>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-12 h-px bg-foreground/30" />
            Services
          </span>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" duration={1} delay={0.05}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[0.95] mb-8">
                Four areas,
                <br />
                <span className="text-muted-foreground">one goal: progress.</span>
              </h1>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-5 lg:pb-3">
            <ScrollReveal direction="up" duration={0.9} delay={0.15}>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Every project follows the same logic — so that each development is
                well-founded, innovative and built to work over the long term.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How we work — process */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-20">
        <ScrollReveal direction="up" duration={0.8} delay={0.1}>
          <div className="rounded-2xl border border-foreground/10 bg-white p-8 lg:p-10">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-6">
              How we work
            </span>
            <div className="flex flex-wrap items-center gap-3 lg:gap-4">
              {process.map((step, index) => (
                <div key={step} className="flex items-center gap-3 lg:gap-4">
                  <span className="text-lg lg:text-xl font-display text-[#334F5A]">
                    {step}
                  </span>
                  {index < process.length - 1 && (
                    <span className="text-[#AAD7E6]">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* The 4 pillars */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-24">
        <div className="grid md:grid-cols-2 gap-6">
          {pillars.map((pillar, index) => (
            <ScrollReveal
              key={pillar.number}
              direction="up"
              duration={0.9}
              delay={index * 0.08}
              scale={0.97}
            >
              <div className="group relative flex flex-col h-full p-8 lg:p-10 rounded-2xl border border-foreground/10 bg-white transition-all duration-500 hover:border-foreground/30 hover:shadow-[0_8px_40px_-12px_rgba(51,79,90,0.15)]">
                <span className="font-mono text-xs text-[#AAD7E6] mb-6">
                  {pillar.number} / 04
                </span>
                <h2 className="text-2xl lg:text-3xl font-display text-[#334F5A] mb-2 leading-tight">
                  {pillar.title}
                </h2>
                <p className="text-sm font-mono text-muted-foreground mb-5">
                  {pillar.lead}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {pillar.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {pillar.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-[#334F5A]"
                    >
                      <span className="text-[#AAD7E6] mt-0.5 shrink-0">—</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6 border-t border-foreground/8">
                  <p className="font-mono text-xs text-muted-foreground">
                    {pillar.proof}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Selected work — dark section */}
      <section className="relative z-10 bg-[#334F5A] px-6 lg:px-12 py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto">

          <ScrollReveal direction="up" duration={0.7}>
            <div className="flex items-center gap-4 mb-16">
              <span className="w-12 h-px bg-white/30" />
              <span className="font-mono text-xs text-white/50 uppercase tracking-wider">
                Selected work
              </span>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-0 lg:divide-x divide-white/10">
            {selectedWork.map((project, index) => (
              <ScrollReveal
                key={project.title}
                direction="up"
                duration={0.85}
                delay={index * 0.09}
              >
                <div className="lg:px-10 first:lg:pl-0 last:lg:pr-0">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-xs text-[#AAD7E6]/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-white/25 ml-auto">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-display text-white leading-tight mb-4">
                    {project.title}
                  </h3>

                  <p className="text-sm text-white/55 leading-relaxed">
                    {project.detail}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="up" duration={1}>
            <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-tight">
              Have a project
              <br />
              in mind?
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" duration={0.9} delay={0.1}>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Whether you need a strategy, a study, a training programme, or
                simply a conversation about where your organisation is heading —
                we&apos;re here for all of it.
              </p>
              <a
                href="/contact-us"
                className="inline-flex items-center gap-3 font-mono text-sm text-[#334F5A] group"
              >
                <span>Get in touch</span>
                <span className="text-[#AAD7E6] group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
