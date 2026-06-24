import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { PageBackground } from "@/components/layout/page-background";
import { FooterSection } from "@/components/layout/footer";
import { speakingThemes, speakingFormats } from "@/lib/services-content";
import { ReferencesGallery } from "@/components/sections/references/references-gallery";

export const metadata: Metadata = {
  title: "Appearances",
  description:
    "Where Novitatis shows up: keynotes, panels, podcasts and exhibitions on AI and digital tourism, plus what we speak about and how to book a talk.",
};

const halo =
  "absolute -inset-x-8 -inset-y-6 -z-10 backdrop-blur-sm bg-background/60 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)]";

export default function AppearancesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <PageBackground />

      {/* 1 — HERO (the pitch) */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 pt-28 pb-8 lg:pt-32 lg:pb-10">
        <div className="relative isolate">
          <span aria-hidden className={halo} />
          <span className="font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block mb-5">
            Appearances
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-[#334F5A] leading-[1.04] max-w-[18ch]">
            Talks built on our own research.
          </h1>
          <p className="mt-7 text-lg lg:text-xl text-[#334F5A]/80 leading-relaxed max-w-[64ch]">
            Novitatis is a research-led voice on AI and the digital future of
            tourism. We speak in Hungarian and English, from conference keynotes to
            closed-door workshops with destination teams, and the talks now travel
            internationally. Every one is built on our own primary data, the same
            work that runs through our consulting, our peer-reviewed publishing and
            an active PhD on the team.
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

      {/* 2 — WHAT WE SPEAK ABOUT */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 py-12 lg:py-16">
        <div className="relative isolate inline-block mb-10 lg:mb-12">
          <span aria-hidden className={halo} />
          <h2 className="font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block">
            What we speak about
          </h2>
        </div>
        <div className="grid gap-4">
          {speakingThemes.map((t) => (
            <div
              key={t.number}
              className="grid md:grid-cols-12 gap-y-4 gap-x-8 lg:gap-x-12 p-6 lg:p-8 rounded-2xl bg-white border border-foreground/10"
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

      {/* 3 — WHERE WE'VE SHOWN UP (full filterable record) */}
      <section className="relative z-10 max-w-[1300px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="relative isolate inline-block mb-8 lg:mb-10">
          <span aria-hidden className={halo} />
          <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05]">
            Where we&apos;ve shown up.
          </h2>
        </div>
        <ReferencesGallery />
      </section>

      {/* 4 — FORMATS */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 py-12 lg:py-16">
        <div className="relative isolate inline-block mb-8">
          <span aria-hidden className={halo} />
          <h2 className="font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block">
            Formats
          </h2>
        </div>
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
