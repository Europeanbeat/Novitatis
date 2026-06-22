import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/navigation";
import { FooterSection } from "@/components/layout/footer";
import { speakingThemes, speakingFormats } from "@/lib/services-content";

export const metadata: Metadata = {
  title: "Public speaking",
  description:
    "Research-led talks on AI and digital tourism: AI search visibility, online presence, data-driven destination management and measurable sustainability. In Hungarian and English.",
};

const halo =
  "absolute -inset-x-8 -inset-y-6 -z-10 backdrop-blur-sm bg-background/60 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)]";

export default function PublicSpeakingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />

      {/* 1 — HERO (summary pitch; specifics live on Appearances) */}
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
            Public speaking
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-[#334F5A] leading-[1.04] max-w-[18ch]">
            Talks built on our own research.
          </h1>
          <p className="mt-7 text-lg lg:text-xl text-[#334F5A]/80 leading-relaxed max-w-[64ch]">
            Adam Schmutz speaks on the digital future of tourism in Hungarian and
            English, from conference keynotes to closed-door workshops with
            destination teams. Every talk is research-led: the arguments come from
            our own primary data on how destinations and providers behave online,
            the same work that runs through our peer-reviewed publishing and an
            active PhD at the University of Pannonia.
          </p>
          <p className="mt-5 text-lg text-[#334F5A]/80 leading-relaxed max-w-[64ch]">
            Around a decade of consulting sits underneath it, so the room hears
            where the field is going and what a destination can do next. We are a
            national reference point for AI search visibility and the digital
            presence of destinations, and the talks now travel internationally.
          </p>
        </div>
      </section>

      {/* 2 — WHAT WE SPEAK ABOUT */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 py-12 lg:py-16">
        <h2 className="font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block mb-10 lg:mb-12">
          What we speak about
        </h2>
        <div className="border-t border-foreground/10">
          {speakingThemes.map((t) => (
            <div
              key={t.number}
              className="grid md:grid-cols-12 gap-y-4 gap-x-8 lg:gap-x-12 py-10 lg:py-14 border-b border-foreground/10"
            >
              <div className="md:col-span-5 flex items-start gap-5">
                <span className="font-mono text-sm text-[#AAD7E6] pt-1.5 shrink-0">
                  {t.number}
                </span>
                <h3 className="font-display text-3xl lg:text-[2.5rem] leading-[1.05] text-[#334F5A]">
                  {t.title}
                </h3>
              </div>
              <div className="md:col-span-7 md:pt-1.5">
                <p className="text-lg lg:text-xl text-[#334F5A]/80 leading-relaxed max-w-[56ch]">
                  {t.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 — FORMATS */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 py-12 lg:py-16">
        <h2 className="font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block mb-8">
          Formats
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {speakingFormats.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-white border border-foreground/10 p-6"
            >
              <p className="font-display text-xl text-[#334F5A] leading-snug mb-2">
                {f.title}
              </p>
              <p className="text-sm text-[#334F5A]/70 leading-relaxed">{f.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 — THE RECORD LIVES ON APPEARANCES (single, clear affordance) */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 py-8 lg:py-10">
        <Link
          href="/appearances"
          className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-[#f9fbff] border border-foreground/10 p-7 lg:p-9 transition-colors hover:border-[#AAD7E6]"
        >
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#AAD7E6] block mb-2">
              Track record
            </span>
            <p className="font-display text-xl lg:text-2xl text-[#334F5A] leading-snug max-w-[40ch]">
              See the full record of keynotes, panels, podcasts and exhibitions.
            </p>
          </div>
          <span className="font-mono text-sm text-[#334F5A] shrink-0 inline-flex items-center gap-2">
            Appearances
            <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1.5">
              &rarr;
            </span>
          </span>
        </Link>
      </section>

      {/* 5 — CTA */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 py-16 lg:py-24">
        <div className="relative isolate">
          <span aria-hidden className={halo} />
          <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05] max-w-[20ch]">
            Planning an event or a team session?
          </h2>
          <p className="mt-6 text-lg text-[#334F5A]/80 leading-relaxed max-w-[56ch]">
            Tell us the audience and the date, and we will propose a talk.
          </p>
          <div className="mt-9">
            <a
              href="mailto:info@novitatis.hu"
              className="inline-flex items-center gap-3 rounded-full bg-[#334F5A] text-white font-mono text-sm px-7 py-3.5 group transition-colors hover:bg-[#283d46]"
            >
              <span>Invite us to speak</span>
              <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
