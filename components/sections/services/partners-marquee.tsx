import { ScrollReveal } from "@/components/ui/scroll-reveal";

// Partner logos in a continuous marquee. The track holds the logo set twice and
// the .marquee keyframes translate it -50%, so the loop is seamless. Pauses on
// hover so logos can be read; edge masks fade the strip in and out.
const partners = [
  { src: "/images/references/partners/visithungary.jpeg", name: "Visit Hungary" },
  { src: "/images/references/partners/mtu.png", name: "Magyar Turisztikai Ügynökség" },
  { src: "/images/references/partners/mtsz.png", name: "Magyar Turisztikai Szövetség" },
  { src: "/images/references/partners/visit-balaton.png", name: "VisitBalaton365" },
  { src: "/images/references/partners/pannon-egyetem.png", name: "Pannon Egyetem" },
  { src: "/images/references/partners/sze.png", name: "Széchenyi István Egyetem" },
  { src: "/images/references/partners/gellenhaza.png", name: "Gellénháza" },
  { src: "/images/references/partners/fenyves.png", name: "Balatonfenyves" },
];

export function PartnersMarquee() {
  return (
    <section className="relative z-10 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <ScrollReveal direction="up" duration={0.8}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
            <div>
              <span className="font-mono text-xs text-[#334F5A]/55 uppercase tracking-wider block mb-4">
                Partners
              </span>
              <h2 className="text-3xl lg:text-4xl font-display text-[#334F5A] leading-[1.05] max-w-[20ch]">
                Organisations we work with.
              </h2>
            </div>
            <p className="text-[#334F5A]/70 leading-relaxed max-w-[38ch] lg:text-right">
              National bodies, destinations, universities and municipalities
              across Hungarian tourism.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal direction="up" duration={0.8} delay={0.1}>
        <div className="relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max marquee hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
                {partners.map((p) => (
                  <div
                    key={`${copy}-${p.name}`}
                    className="group mx-3 flex h-28 w-48 lg:h-32 lg:w-56 shrink-0 items-center justify-center rounded-2xl bg-white border border-foreground/10 p-6 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:border-[#AAD7E6] hover:shadow-[0_12px_32px_-16px_rgba(51,79,90,0.25)]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.src}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain grayscale opacity-60 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
