import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { FooterSection } from "@/components/layout/footer";
import { RelatedProjects } from "@/components/sections/services/related-projects";
import {
  practices,
  speakingThemes,
  speakingFormats,
  speakingEvents,
  speakingStats,
} from "@/lib/services-content";

const practice = practices.find((p) => p.slug === "public-speaking")!;

export const metadata: Metadata = {
  title: "Public speaking",
  description:
    "Keynotes, panels and workshops on AI, digital visibility and data-driven tourism. Every talk is built on our own primary research, on Hungarian and international stages.",
};

const halo =
  "absolute -inset-x-8 -inset-y-6 -z-10 backdrop-blur-sm bg-background/60 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)]";

export default function PublicSpeakingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />

      {/* 1 — HERO */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 pt-28 pb-16 lg:pt-32 lg:pb-20">
        <a
          href="/services"
          className="font-mono text-sm text-[#334F5A]/70 inline-flex items-center gap-2 mb-10 hover:text-[#334F5A] transition-colors"
        >
          <span className="text-[#AAD7E6]">&larr;</span> All services
        </a>

        <div className="relative isolate">
          <span aria-hidden className={halo} />
          <span className="font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block mb-5">
            {practice.tag}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-[#334F5A] leading-[1.02] max-w-[16ch]">
            We speak from our own research,{" "}
            <span className="text-[#334F5A]/45">not borrowed slides.</span>
          </h1>
          <p className="mt-7 text-lg lg:text-xl text-[#334F5A]/80 leading-relaxed max-w-[60ch]">
            Keynotes, panels and workshops on AI, digital visibility and
            data-driven tourism. Every talk is built on primary research we ran
            ourselves, so your audience leaves with evidence, not hype.
          </p>
        </div>

        {/* Proof strip */}
        <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-[#334F5A]/70">
          <span>ITB Berlin</span>
          <span className="text-[#AAD7E6]">·</span>
          <span>Edinburgh</span>
          <span className="text-[#AAD7E6]">·</span>
          <span>Interreg Europe, France</span>
          <span className="text-[#AAD7E6]">·</span>
          <span>20+ stages</span>
        </div>
      </section>

      {/* 2 — THE OPENING PROBLEM (blur backing so text doesn't sit on the lines) */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 py-12 lg:py-16">
        <div className="relative isolate max-w-[68ch]">
          <span
            aria-hidden
            className="absolute -inset-5 lg:-inset-7 -z-10 rounded-[2rem] bg-background/55 backdrop-blur-sm"
          />
          <div className="space-y-6 text-lg text-[#334F5A]/80 leading-relaxed">
            <p>
              Every tourism conference now has an AI session. Most of them sell a
              tool, or sell optimism, and leave the room exactly where it started.
              The audience nods, and nobody changes anything on Monday.
            </p>
            <p>
              We do the opposite. We bring numbers from the field: 73 Lake Balaton
              businesses studied, more than 1,300 provider websites analysed, a
              national real-time data system explained from the inside. The talk
              gives your audience something they can act on, because it started as
              research, not as a pitch.
            </p>
          </div>
        </div>
      </section>

      {/* 3 — WHAT WE SPEAK ABOUT */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 py-12 lg:py-16">
        <h2 className="font-mono text-xs text-[#334F5A]/70 uppercase tracking-wider mb-10">
          What we speak about
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {speakingThemes.map((theme) => (
            <div
              key={theme.number}
              className="rounded-2xl bg-white border border-foreground/10 p-7 lg:p-8"
            >
              <span className="font-mono text-xs text-[#AAD7E6]">
                {theme.number}
              </span>
              <h3 className="mt-3 font-display text-2xl text-[#334F5A] leading-tight">
                {theme.title}
              </h3>
              <p className="mt-4 text-[15px] text-[#334F5A]/75 leading-relaxed">
                {theme.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 — WHY IT IS DIFFERENT */}
      <section className="relative z-10 bg-[#f9fbff] border-y border-foreground/8 py-16 lg:py-24 mt-6">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05] max-w-[18ch]">
            The data is ours. So is the plain language.
          </h2>
          <p className="mt-6 text-lg text-[#334F5A]/80 leading-relaxed max-w-[62ch]">
            Two things set our talks apart. First, the evidence is original:
            peer-reviewed studies in Turizmus Bulletin and Akadémiai Kiadó,
            primary surveys of Lake Balaton businesses, our own destination work.
            Second, we translate it, so the message lands with a county
            enterprise foundation and with an international DMO audience alike.
          </p>

          <figure className="mt-10 max-w-[60ch]">
            <blockquote className="font-display italic text-2xl lg:text-3xl text-[#334F5A]/85 leading-snug">
              &ldquo;Many similar trainings don&rsquo;t translate the professional
              message into the language of the average user. You found the common
              voice perfectly, so everyone could understand the information.&rdquo;
            </blockquote>
            <figcaption className="mt-4 font-mono text-xs uppercase tracking-wider text-[#334F5A]/70">
              Szilvia Mihály, VisitBalaton365
            </figcaption>
          </figure>

          <div className="mt-12 grid sm:grid-cols-3 gap-px bg-foreground/10 rounded-2xl overflow-hidden border border-foreground/10">
            {[
              ["Peer-reviewed research", "Turizmus Bulletin 2025 · Akadémiai Kiadó 2023"],
              ["Spoken in English abroad", "United Kingdom · France · Germany"],
              ["Representing real destinations", "VisitBalaton365 · Interreg Europe"],
            ].map(([title, sub]) => (
              <div key={title} className="bg-white p-6">
                <p className="text-[15px] font-medium text-[#334F5A] leading-snug">
                  {title}
                </p>
                <p className="mt-1.5 font-mono text-[11px] text-[#334F5A]/70 leading-relaxed">
                  {sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — FORMATS */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 py-16 lg:py-20">
        <h2 className="font-mono text-xs text-[#334F5A]/70 uppercase tracking-wider mb-10">
          What you can book
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {speakingFormats.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-white border border-foreground/10 p-6"
            >
              <h3 className="font-display text-xl text-[#334F5A] leading-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-[#334F5A]/75 leading-relaxed">
                {f.blurb}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 font-mono text-xs text-[#334F5A]/70 uppercase tracking-wider">
          Available in Hungarian and English
        </p>
      </section>

      {/* 6 — SELECTED APPEARANCES (the speaking showcase) */}
      <section className="relative z-10 py-16 lg:py-20">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05] max-w-[16ch]">
              Selected appearances.
            </h2>
            <a
              href="/references"
              className="font-mono text-sm text-[#334F5A] inline-flex items-center gap-2 group"
            >
              <span>View all appearances</span>
              <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </a>
          </div>

          <div className="grid gap-px bg-foreground/10 rounded-2xl overflow-hidden border border-foreground/10">
            {speakingEvents.map((e) => (
              <a
                key={e.title}
                href="/references"
                className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 bg-white hover:bg-[#f9fbff] transition-colors p-6 lg:p-7"
              >
                <span className="font-mono text-xs text-[#AAD7E6] md:w-24 shrink-0 pt-1">
                  {e.date}
                </span>
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <h3 className="font-display text-xl lg:text-2xl text-[#334F5A] leading-tight">
                      {e.title}
                    </h3>
                    {e.intl && (
                      <span className="mt-1 shrink-0 font-mono text-[10px] uppercase tracking-wider text-[#334F5A]/45 border border-foreground/15 rounded-full px-2 py-0.5">
                        Intl
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-[#334F5A]/70">
                    {e.place}
                  </p>
                  <p className="mt-3 text-[15px] text-[#334F5A]/75 leading-relaxed max-w-[70ch]">
                    {e.blurb}
                  </p>
                </div>
                <span className="hidden md:block text-[#AAD7E6] self-center transition-transform duration-300 group-hover:translate-x-1.5">
                  &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — STAT STRIP */}
      <section className="relative z-10 bg-[#334F5A] py-14 lg:py-20">
        <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {speakingStats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl lg:text-6xl text-white leading-none">
                {s.value}
              </p>
              <p className="mt-3 text-sm text-[#AAD7E6] leading-snug max-w-[22ch]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8 — PROOF: case studies pulled from the projects library */}
      <div className="relative z-10 pt-16 lg:pt-24">
        <RelatedProjects practiceSlug="public-speaking" />
      </div>

      {/* 9 — CLOSING / CTA */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 pb-20 lg:pb-28">
        <div className="relative isolate">
          <span aria-hidden className={halo} />
          <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05] max-w-[20ch]">
            Looking for a speaker who brings the evidence?
          </h2>
          <p className="mt-6 text-lg text-[#334F5A]/80 leading-relaxed max-w-[56ch]">
            Tell us your audience and the question you want answered. We will
            bring a talk built on real research, in Hungarian or English.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="mailto:info@novitatis.hu"
              className="inline-flex items-center gap-3 rounded-full bg-[#334F5A] text-white font-mono text-sm px-7 py-3.5 group"
            >
              <span>Invite us to speak</span>
              <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </a>
            <a
              href="/references"
              className="inline-flex items-center gap-2 font-mono text-sm text-[#334F5A]/80 hover:text-[#334F5A] transition-colors px-2"
            >
              <span>See all our projects</span>
              <span className="text-[#AAD7E6]">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
