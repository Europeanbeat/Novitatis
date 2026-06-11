import Link from "next/link";
import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { FooterSection } from "@/components/layout/footer";
import { PageBackground } from "@/components/layout/page-background";
import { practices } from "@/lib/services-content";
import { RelatedProjects } from "@/components/sections/services/related-projects";

const practice = practices.find((p) => p.slug === "public-speaking")!;

export const metadata: Metadata = {
  title: practice.title,
  description: practice.description,
};

export default function PublicSpeakingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <PageBackground />
      <Navigation />

      <section className="relative z-10 max-w-[1100px] mx-auto px-6 pt-28 pb-24">
        <Link
          href="/services"
          className="font-mono text-sm text-[#334F5A]/70 inline-flex items-center gap-2 mb-10"
        >
          <span className="text-[#AAD7E6]">&larr;</span> All services
        </Link>
        <span className="font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block mb-4">
          {practice.tag}
        </span>
        <h1 className="text-4xl md:text-6xl font-display text-[#334F5A] leading-[1.02] max-w-[18ch]">
          {practice.title}
        </h1>
        <p className="mt-6 text-lg text-[#334F5A]/80 leading-relaxed max-w-[60ch]">
          {practice.description}
        </p>
      </section>

      <RelatedProjects practiceSlug="public-speaking" />

      <FooterSection />
    </main>
  );
}
