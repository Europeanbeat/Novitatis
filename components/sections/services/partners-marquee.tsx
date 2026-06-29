import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Halo } from "@/components/sections/services/_halo";
import { getServicesContent } from "@/lib/services-content";
import type { Locale } from "@/lib/i18n/config";

// Partner logos in a continuous marquee. The track holds the logo set twice and
// the .marquee keyframes translate it -50%, so the loop is seamless. Pauses on
// hover so logos can be read; edge masks fade the strip in and out.
// `url` is the organisation's website the logo links to. Verify each before
// going live; correct any that point to the wrong page.
const partners = [
  { src: "/images/references/partners/visithungary.jpeg", name: "Visit Hungary", url: "https://visithungary.com" },
  { src: "/images/references/partners/mtu.png", name: "Magyar Turisztikai Ügynökség", url: "https://mtu.gov.hu" },
  { src: "/images/references/partners/mtsz.png", name: "Magyar Turisztikai Szövetség", url: "https://turisztikaiszovetseg.hu" },
  { src: "/images/references/partners/visit-balaton.png", name: "VisitBalaton365", url: "https://visitbalaton365.hu" },
  { src: "/images/references/partners/pannon-egyetem.png", name: "Pannon Egyetem", url: "https://uni-pannon.hu" },
  { src: "/images/references/partners/sze.png", name: "Széchenyi István Egyetem", url: "https://uni-sze.hu" },
  { src: "/images/references/partners/gellenhaza.png", name: "Gellénháza", url: "https://gellenhaza.hu" },
  { src: "/images/references/partners/fenyves.png", name: "Balatonfenyves", url: "https://balatonfenyves.hu" },
  { src: "/images/references/interreg.png", name: "Interreg Europe Smart Tour", url: "https://www.interregeurope.eu/smart-tour" },
  { src: "/images/references/veszprem_varmegye_vallalkozasfejlesztesi_alapitvany.png", name: "Veszprém Vármegyei Vállalkozásfejlesztési Alapítvány", url: "https://www.vmva.hu" },
  { src: "/images/references/balaton_integracio_kozhasznu_nonprofit_kft.png", name: "Balatoni Integrációs Közhasznú Nonprofit Kft", url: "https://www.balatonregion.hu" },
  { src: "/images/references/winesofcrete.png", name: "Wines of Crete", url: "https://www.winesofcrete.gr" },
];

export function PartnersMarquee({ locale }: { locale: Locale }) {
  const { ui } = getServicesContent(locale);
  return (
    <section className="relative z-10 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <ScrollReveal direction="up" duration={0.8}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
            <div className="relative isolate">
              <Halo className="-inset-x-5 -inset-y-4" />
              <span className="font-mono text-xs text-[#334F5A]/70 uppercase tracking-wider block mb-4">
                {ui.partners.eyebrow}
              </span>
              <h2 className="text-3xl lg:text-4xl font-display text-[#334F5A] leading-[1.05] max-w-[20ch]">
                {ui.partners.heading}
              </h2>
            </div>
            <p className="relative isolate text-[#334F5A]/70 leading-relaxed max-w-[38ch] lg:text-right">
              <Halo className="-inset-x-5 -inset-y-4" />
              {ui.partners.lead}
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
                  <a
                    key={`${copy}-${p.name}`}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={copy === 1 ? -1 : undefined}
                    aria-label={`${ui.partners.visit} ${p.name}`}
                    className="group mx-3 flex h-[134px] w-[230px] lg:h-[154px] lg:w-[269px] shrink-0 items-center justify-center rounded-2xl bg-white border border-foreground/10 p-5 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:border-[#AAD7E6] hover:shadow-[0_12px_32px_-16px_rgba(51,79,90,0.25)]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.src}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                    />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
