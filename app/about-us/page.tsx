import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { FooterSection } from "@/components/layout/footer";
import { PageBackground } from "@/components/layout/page-background";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Novitatis is a strategic and innovation advisory network for tourism. We help the players of tourism make good decisions built on research, data and creative thinking — and turn them into sustainable development.",
};

const values = [
  {
    title: "An advisory network, not a classic firm",
    description:
      "We bring the best-fit experts to every project — researchers, developers, economists, designers and tourism professionals working together. That ensures the highest-qualified person on every task, and solutions that truly work.",
  },
  {
    title: "We work with creative energy",
    description:
      "We treat every engagement as our own. We don't just advise — we create, experiment and develop, and we keep working until a real, usable solution is born.",
  },
  {
    title: "Innovation focus, international inspiration",
    description:
      "We continuously watch international trends and best practices, then adapt, tailor and apply them to local projects — always fit to the real operating environment.",
  },
];

const stats = [
  { value: "10+", label: "years of experience" },
  { value: "60+", label: "strategy & development projects" },
  { value: "HU & EU", label: "national and regional reach" },
];

export default function AboutUsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <PageBackground />
      <Navigation />

      {/* Hero */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-40 pb-16">
        <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
          <span className="w-12 h-px bg-foreground/30" />
          About Us
        </span>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[0.95] mb-8">
          Innovation, strategy and
          <br />
          <span className="text-muted-foreground">development in tourism.</span>
        </h1>

        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
          Novitatis is a strategic and innovation advisory network that supports
          tourism and its related fields in making good decisions — built on
          research, data and creative thinking — and turning them into
          achievable, sustainable development.
        </p>
      </section>

      {/* Why Novitatis — values */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-20">
        <h2 className="text-3xl lg:text-4xl font-display text-[#334F5A] mb-12">
          Why Novitatis?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="relative p-8 rounded-2xl border border-foreground/10 bg-white"
            >
              <span className="font-mono text-xs text-[#AAD7E6] block mb-6">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-display text-[#334F5A] mb-4 leading-tight">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Results in numbers */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-24">
        <div className="flex flex-wrap gap-12 pt-12 border-t border-foreground/10">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-3">
              <span className="text-4xl lg:text-5xl font-display text-[#334F5A]">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
