import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/navigation";
import { PageBackground } from "@/components/layout/page-background";
import { FooterSection } from "@/components/layout/footer";
import { RelatedProjects } from "@/components/sections/services/related-projects";
import { BrandCards } from "@/components/sections/services/brand-cards";

export const metadata: Metadata = {
  title: "Education & mentoring",
  description:
    "AI and digital training, courses and one-to-one mentoring that build capability inside tourism teams and SMEs, under ai4tourism, Turizmus Tudástár and Visible Tourism.",
};

const halo =
  "absolute -inset-x-8 -inset-y-6 -z-10 backdrop-blur-sm bg-background/60 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)]";

// The services we provide (offerings), in the consulting-page voice. The specific
// trainings and clients live in "Our Projects", not here.
const services = [
  {
    title: "AI training for tourism teams",
    body: "What changes when a team can actually use AI in its daily work? We run training that takes a tourism team through prompting, content, data and reporting, and image generation, applied to the real tasks a destination faces. People leave able to fold these tools into the work they already do.",
  },
  {
    title: "Google Business Profile courses",
    body: "Most travellers meet a tourism business on Google long before they reach its website. Through our Turizmus Tudástár courses, providers learn to set up and optimise their Google Business Profile, manage reviews and online reputation, read their performance, and stay findable as AI reshapes search. Built for owners and small teams who run their own listing.",
  },
  {
    title: "One-to-one mentoring",
    body: "What does this business need to fix first? In personal mentoring sessions we work through an organisation's Google presence with the people who manage it, and close with a scored report that rates where it stands and sets out the fixes in priority order. Each session is shaped around the business in front of us.",
  },
  {
    title: "Online visibility",
    body: "How visible is a destination or provider when someone searches, or asks an AI? Under Visible Tourism we teach the practice behind it: GEO and AEO, Google Maps presence, and appearing in AI-driven search, alongside audits that show where you currently stand. The focus is skills a team can apply to its own listings and content.",
  },
  {
    title: "Workshops & product development",
    body: "Where do providers most often lose ground? Our workshops cover product and package development, online presence and the digital skills providers need day to day. Designed for groups of tourism businesses, they turn shared challenges into skills a team can put to work at once.",
  },
];

export default function EducationPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <PageBackground />

      {/* 1 — HERO */}
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
            Education &amp; mentoring
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-[#334F5A] leading-[1.04] max-w-[20ch]">
            We teach tourism teams to work with AI and run their own online
            presence.
          </h1>
          <p className="mt-7 text-lg lg:text-xl text-[#334F5A]/80 leading-relaxed max-w-[64ch]">
            Destinations, national tourism organisations and the providers in
            their ecosystem, down to individual SMEs, come to us to build the
            skills their work now demands. We train teams to put AI to use in
            their real tasks, and we show smaller businesses how to own their
            visibility in search, on Google Maps and in AI answers.
          </p>
        </div>

        <div className="relative isolate w-fit mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-[#334F5A]/70">
          <span aria-hidden className={halo} />
          <a href="#what" className="hover:text-[#334F5A] transition-colors">
            What we do
          </a>
          <span className="text-[#AAD7E6]">·</span>
          <a href="#brands" className="hover:text-[#334F5A] transition-colors">
            Our brands
          </a>
        </div>
      </section>

      {/* 2 — WHAT WE DO */}
      <section
        id="what"
        className="relative z-10 max-w-[1100px] mx-auto px-6 py-12 lg:py-16 scroll-mt-28"
      >
        <h2 className="relative isolate w-fit font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block mb-10 lg:mb-12">
          <span aria-hidden className={halo} />
          What we do
        </h2>
        <div className="grid gap-4">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="grid md:grid-cols-12 gap-y-4 gap-x-8 lg:gap-x-12 rounded-2xl bg-white border border-foreground/10 p-6 lg:p-8"
            >
              <div className="md:col-span-5 flex items-start gap-5">
                <span className="font-mono text-sm text-[#AAD7E6] pt-1.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-3xl lg:text-[2.5rem] leading-[1.05] text-[#334F5A]">
                  {s.title}
                </h3>
              </div>
              <div className="md:col-span-7 md:pt-1.5">
                <p className="text-lg lg:text-xl text-[#334F5A]/80 leading-relaxed max-w-[56ch]">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 — OUR BRANDS */}
      <section
        id="brands"
        className="relative z-10 max-w-[1100px] mx-auto px-6 py-12 lg:py-16 scroll-mt-28"
      >
        <span className="relative isolate w-fit font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block mb-8">
          <span aria-hidden className={halo} />
          Our brands
        </span>
        <BrandCards />
      </section>

      {/* 4 — OUR PROJECTS: the specific trainings live here */}
      <div className="relative z-10 pt-12 lg:pt-20">
        <RelatedProjects practiceSlug="education" />
      </div>

      {/* 5 — CTA */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 py-16 lg:py-24">
        <div className="relative isolate">
          <span aria-hidden className={halo} />
          <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05] max-w-[20ch]">
            Want to build capability in your team?
          </h2>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-3 rounded-full bg-[#334F5A] text-white font-mono text-sm px-7 py-3.5 group"
            >
              <span>Let&apos;s work together</span>
              <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </Link>
            <Link
              href="/references"
              className="inline-flex items-center gap-2 font-mono text-sm text-[#334F5A]/80 hover:text-[#334F5A] transition-colors px-2"
            >
              <span>See Our Projects</span>
              <span className="text-[#AAD7E6]">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
