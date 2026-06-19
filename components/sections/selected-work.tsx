import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { references } from "@/lib/references-content";

// Three flagship moments from the references library, with photographs, as
// proof on the homepage. Titles and metadata come from the library; only the
// photo choice is curated here.
const picks: { slug: string; img: string }[] = [
  {
    slug: "ai4tourism-itb-berlin-2026-exhibitor",
    img: "/images/references/itb-berlin-2026/ai4tourism-itb-berlin-2026-hall61-stand-03.jpg",
  },
  {
    slug: "digitalization-sustainability-earth-day-conference-balaton-2026",
    img: "/images/references/foldnap-2026/foldnapi-konferencia-balaton-2026-kozonseg.jpg",
  },
  {
    slug: "ai-based-solutions-tourism-digiturismo-podcast",
    img: "/images/references/digiturismo-ai-2026/digiturismo-ai-podcast-schmutz-adam-studio-01.jpg",
  },
];

export function SelectedWork() {
  const items = picks
    .map((p) => {
      const ref = references.find((r) => r.slug === p.slug);
      return ref ? { ...p, ref } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  if (items.length === 0) return null;

  return (
    <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
      <ScrollReveal direction="up" duration={0.8}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs text-[#334F5A]/70 uppercase tracking-wider block mb-4">
              Selected work
            </span>
            <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05] max-w-[16ch]">
              The work behind the words.
            </h2>
          </div>
          <Link
            href="/references"
            className="group inline-flex items-center gap-2 font-mono text-sm text-[#334F5A] shrink-0"
          >
            <span className="link-sweep">All projects</span>
            <span className="text-[#AAD7E6] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1.5">
              &rarr;
            </span>
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-5">
        {items.map(({ slug, img, ref }, i) => (
          <ScrollReveal key={slug} direction="up" duration={0.8} delay={i * 0.08}>
            <Link
              href={`/references/${slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-foreground/10 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:border-[#AAD7E6] hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-28px_rgba(51,79,90,0.4)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={ref.imageAlt || ref.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover grayscale-[30%] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-[#334F5A]/25 mix-blend-multiply pointer-events-none" />
              </div>
              <div className="flex flex-col flex-1 p-6 lg:p-7">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#334F5A]/[0.06] text-[#334F5A]/70">
                    {ref.typeLabel}
                  </span>
                  <span className="font-mono text-xs text-[#334F5A]/65">{ref.year}</span>
                </div>
                <h3 className="font-display text-xl text-[#334F5A] leading-snug mb-5 line-clamp-3">
                  {ref.title}
                </h3>
                <span className="mt-auto inline-flex items-center gap-2 font-mono text-xs text-[#334F5A]">
                  <span className="link-sweep">Read the story</span>
                  <span className="text-[#AAD7E6] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
