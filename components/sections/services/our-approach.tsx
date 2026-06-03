import { ScrollReveal } from "@/components/ui/scroll-reveal";

const principles = [
  {
    title: "A specialist network",
    body: "We assemble the right senior experts around each problem, rather than staffing it from a fixed bench.",
  },
  {
    title: "Research-first",
    body: "Every engagement starts from evidence: field work, data and analysis before any recommendation.",
  },
  {
    title: "One method, four practices",
    body: "The same sequence runs across all four practices, so consulting, development, education and speaking connect rather than sit apart.",
  },
];

// Factual framework section: how the firm is organised. No sales claims.
export function OurApproach() {
  return (
    <section className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 py-10 lg:py-14">
      <div className="bg-white rounded-[2rem] border border-foreground/10 shadow-[0_30px_80px_-50px_rgba(51,79,90,0.3)] p-8 lg:p-14">
        <ScrollReveal direction="up" duration={0.8}>
          <div className="max-w-[60ch] mb-10 lg:mb-12">
            <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-tight">
              A specialist network, not a fixed bench.
            </h2>
            <p className="mt-5 text-[#334F5A]/80 leading-relaxed">
              Novitatis combines strategy with design-thinking research for the
              tourism sector. We bring in the experts each problem needs, work from
              evidence, and run the same method across everything we do.
            </p>
          </div>
        </ScrollReveal>

        <div className="border-t border-foreground/10">
          {principles.map((p, index) => (
            <ScrollReveal key={p.title} direction="up" duration={0.8} delay={index * 0.08}>
              <div className="grid md:grid-cols-12 gap-3 md:gap-8 items-baseline border-b border-foreground/10 py-7 lg:py-9">
                <span className="md:col-span-1 font-mono text-sm text-[#AAD7E6]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="md:col-span-4 font-display text-xl lg:text-2xl text-[#334F5A] leading-tight">
                  {p.title}
                </h3>
                <p className="md:col-span-7 text-[#334F5A]/75 leading-relaxed max-w-[60ch]">
                  {p.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
