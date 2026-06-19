import Link from "next/link";
import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { FooterSection } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Halo } from "@/components/sections/services/_halo";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Novitatis is a specialist advisory network for the tourism sector. We combine strategy, research and technology to help destinations, public institutions and tourism businesses develop on solid evidence.",
};

const values = [
  {
    title: "An advisory network, not a fixed firm",
    body: "We bring the best-fit experts to every project: researchers, developers, economists, designers and tourism professionals. The most qualified person works on each task, and the result reflects it.",
  },
  {
    title: "Research-first, hands-on in delivery",
    body: "We start from evidence and stay involved through implementation. We do not just advise; we build, test and refine until there is a usable result.",
  },
  {
    title: "International perspective, local fit",
    body: "We track international trends and best practice, then adapt them to the realities of each destination and the environment it operates in.",
  },
];

// First names only: more international, easier to address (UX review).
const team = [
  {
    name: "Adam",
    role: "Founder & tourism strategy consultant · PhD candidate",
    photo: "/images/adam_schmutz_card.jpg",
    bio: "Adam works at the intersection of tourism, technology and entrepreneurship. His doctoral research feeds directly into Novitatis's consulting across Europe, keeping recommendations grounded in evidence.",
    pos: "object-[25%_1%]"
  },
  {
    name: "Bence",
    role: "Partner · Project lead · Full-stack developer",
    photo: "/images/bence.webp",
    bio: "Bence leads the technical delivery behind Novitatis projects: digital systems, mapping and integrations. With an MA in tourism and a developer's background, he turns the real constraints destinations face into working systems.",
    pos: "object-[25%_1%]"
  },
  {
    name: "Vivi",
    role: "UX/UI researcher · Advisor",
    photo: "/images/vivi.jpeg",
    bio: "Vivi studies how destinations are presented digitally and how travellers experience them in practice. Her MA applied design-thinking methodology to the visitor-centred development of tourism SMEs, and she connects perception and experience through data-informed design.",
    pos: "object-[20%_50%]"
  },
  {
    name: "Eszter",
    role: "UX/UI researcher · Data analyst · PhD candidate",
    photo: "/images/eszter.jpeg",
    bio: "Eszter turns destination data into structured, scalable strategy. Her PhD research focuses on digital experience systems in the public sector.",
  },
];

const stats = [
  { value: "10+", label: "years of experience" },
  { value: "60+", label: "strategy & development projects" },
  { value: "4", label: "countries with projects & talks" },
];

export default function AboutUsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />

      {/* Hero */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-12 lg:pb-16">
        <ScrollReveal direction="up" duration={0.7}>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-12 h-px bg-foreground/30" />
            About us
          </span>
        </ScrollReveal>
        <ScrollReveal direction="up" duration={1} delay={0.05}>
          <h1 className="relative isolate text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[0.97] text-[#334F5A] max-w-[18ch]">
            <Halo className="-inset-x-12 -inset-y-10" />
            Strategy, research and technology for tourism.
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" duration={0.9} delay={0.12}>
          <p className="relative isolate mt-7 text-xl text-muted-foreground leading-relaxed max-w-[56ch]">
            <Halo />
            Novitatis is a specialist advisory network that helps the tourism
            sector make decisions built on research, data and creative thinking,
            and turn them into achievable, durable development.
          </p>
        </ScrollReveal>
      </section>

      {/* What sets us apart — promoted above the story (UX review: one of the
          strongest messages, so lead with it). */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 py-10 lg:py-14">
        <div className="relative isolate px-2 lg:px-4 mb-8">
          <Halo className="-inset-x-6 -inset-y-4" />
          <span className="font-mono text-xs text-[#334F5A]/65 uppercase tracking-wider block mb-4">
            What sets us apart
          </span>
          <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-tight max-w-[20ch]">
            How we are different from a classic consultancy.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10 rounded-2xl overflow-hidden border border-foreground/10">
          {values.map((value, index) => (
            <ScrollReveal key={value.title} direction="up" duration={0.8} delay={index * 0.08}>
              <div className="h-full bg-white p-8 lg:p-10">
                <span className="font-mono text-xs text-[#AAD7E6] block mb-6">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl lg:text-2xl text-[#334F5A] leading-tight mb-4">
                  {value.title}
                </h3>
                <p className="text-sm text-[#334F5A]/65 leading-relaxed">{value.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Our story */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 py-10 lg:py-14">
        <div className="bg-white rounded-[2rem] border border-foreground/10 shadow-[0_30px_80px_-50px_rgba(51,79,90,0.3)] p-8 lg:p-14">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <span className="font-mono text-xs text-[#334F5A]/65 uppercase tracking-wider block mb-4">
                Our story
              </span>
              <h2 className="text-3xl lg:text-4xl font-display text-[#334F5A] leading-tight">
                Built to cut through the complexity.
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-5 text-[#334F5A]/70 leading-relaxed lg:text-lg">
              <p>
                Novitatis began from a simple observation: tourism development too
                often runs on intuition and generic advice, when the sector
                deserves decisions built on evidence. We set out to combine
                rigorous research with creative, practical development for the
                people who shape destinations.
              </p>
              <p>
                We work with destination management organisations, tourism boards,
                municipalities and public institutions, alongside the tourism
                businesses that operate within them. Several of us are PhD candidates
                and published researchers, so high-level planning, evidence and
                on-the-ground delivery sit in the same room: clear deliverables,
                honest communication, and solutions that work in the field.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 lg:mt-16 pt-10 border-t border-foreground/10 flex flex-wrap gap-10 lg:gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-3">
                <span className="text-4xl lg:text-5xl font-display text-[#334F5A]">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground max-w-[16ch]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the team */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 py-10 lg:py-16">
        <div className="relative isolate px-2 lg:px-4 mb-10 lg:mb-12">
          <Halo className="-inset-x-6 -inset-y-4" />
          <span className="font-mono text-xs text-[#334F5A]/65 uppercase tracking-wider block mb-4">
            Meet the team
          </span>
          <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-tight max-w-[20ch]">
            Strategy and delivery, in the same team.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {team.map((member, index) => (
            <ScrollReveal key={member.name} direction="up" duration={0.85} delay={index * 0.07} scale={0.98}>
              <article className="group h-full flex flex-col bg-white rounded-[1.5rem] border border-foreground/10 overflow-hidden transition-all duration-400 hover:border-[#AAD7E6] hover:shadow-[0_20px_60px_-24px_rgba(51,79,90,0.25)]">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f9fbff]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.photo}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className={`object-cover ${member.pos ?? ""} w-full h-full`}
                  />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="font-display text-xl text-[#334F5A] leading-tight">
                    {member.name}
                  </h3>
                  <p className="font-mono text-[11px] font-medium text-[#334F5A]/85 mt-1.5 mb-4">
                    {member.role}
                  </p>
                  <p className="text-sm text-[#334F5A]/65 leading-relaxed">{member.bio}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <ScrollReveal direction="up" duration={0.9} scale={0.98}>
          <div className="relative overflow-hidden rounded-3xl bg-[#334F5A] px-8 lg:px-16 py-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <h2 className="text-4xl lg:text-6xl font-display text-white leading-[1.02]">
                Work with
                <br />
                <span className="text-white/55">Novitatis.</span>
              </h2>
              <div className="lg:pl-8">
                <p className="text-white/65 leading-relaxed mb-8 max-w-[46ch]">
                  Tell us about the project or question you are facing in tourism
                  development. We will tell you whether and how we can help.
                </p>
                <Link
                  href="/contact-us"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#AAD7E6] text-[#334F5A] font-mono text-sm px-6 py-3.5 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Get in touch
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <FooterSection />
    </main>
  );
}
