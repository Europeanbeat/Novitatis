import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { references, type Reference } from "@/lib/references-content";

// Projects behind each service, pulled from the references library. Each
// service filters the shared pool its own way; the same project may rightly
// appear under two services (a talk about AI supports both speaking and
// development).
const filters: Record<string, (r: Reference) => boolean> = {
  consulting: (r) =>
    r.type === "publication" || r.tags.some((t) => /strateg/i.test(t)),
  development: (r) =>
    r.tags.some((t) => /\bai\b|digital|visibility/i.test(t)) &&
    (r.type === "exhibition" || r.type === "publication" || r.type === "workshop"),
  education: (r) => r.type === "workshop",
  "public-speaking": (r) => ["talk", "panel", "podcast"].includes(r.type),
};

export function RelatedProjects({ practiceSlug }: { practiceSlug: string }) {
  const match = filters[practiceSlug];
  if (!match) return null;
  const projects = references
    .filter(match)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order)
    .slice(0, 3);
  if (projects.length === 0) return null;

  return (
    <section className="relative z-10 max-w-[1100px] mx-auto px-6 pb-24">
      <ScrollReveal direction="up" duration={0.8}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs text-[#334F5A]/55 uppercase tracking-wider block mb-3">
              Proof
            </span>
            <h2 className="text-2xl lg:text-4xl font-display text-[#334F5A] leading-[1.05]">
              Projects behind this service.
            </h2>
          </div>
          <a
            href="/references"
            className="group inline-flex items-center gap-2 font-mono text-sm text-[#334F5A] shrink-0"
          >
            <span className="link-sweep">All projects</span>
            <span className="text-[#AAD7E6] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1.5">
              &rarr;
            </span>
          </a>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-5">
        {projects.map((r, i) => (
          <ScrollReveal key={r.slug} direction="up" duration={0.8} delay={i * 0.08}>
            <a
              href={`/references/${r.slug}`}
              className="group flex h-full flex-col rounded-2xl bg-white border border-foreground/10 p-7 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:border-[#AAD7E6] hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-24px_rgba(51,79,90,0.35)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#334F5A]/[0.06] text-[#334F5A]/70">
                  {r.typeLabel}
                </span>
                <span className="font-mono text-xs text-[#334F5A]/50">{r.year}</span>
              </div>
              <h3 className="font-display text-xl text-[#334F5A] leading-snug mb-3">
                {r.title}
              </h3>
              <p className="text-sm text-[#334F5A]/70 leading-relaxed line-clamp-3 mb-6">
                {r.summary}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 font-mono text-xs text-[#334F5A]">
                <span className="link-sweep">Read the story</span>
                <span className="text-[#AAD7E6] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
