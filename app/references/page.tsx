import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { PageBackground } from "@/components/layout/page-background";
import { FooterSection } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Halo } from "@/components/sections/services/_halo";
import { ProjectsGallery } from "@/components/sections/projects/projects-gallery";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Delivered tourism work across consulting, education and development: research studies, strategies, training and digital builds. Filter by service and open the executive summaries.",
};

export default function OurProjectsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <PageBackground />

      <section className="relative z-10 max-w-[1300px] mx-auto px-6 lg:px-12 pt-32 pb-20 lg:pb-28">
        {/* Hero */}
        <ScrollReveal direction="up" duration={0.8}>
          <div className="relative isolate max-w-[60ch] mb-10 lg:mb-14">
            <Halo />
            <span className="font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block mb-5">
              Our Projects
            </span>
            <h1 className="text-5xl md:text-7xl font-display text-[#334F5A] leading-[0.98]">
              The work behind the method.
            </h1>
            <p className="mt-6 text-lg text-[#334F5A]/80 leading-relaxed">
              A record of delivered work across consulting, education and
              development: research studies, destination strategies, training and
              digital builds. Open any project for a short summary, with the full
              executive report a click away where one exists.
            </p>
          </div>
        </ScrollReveal>

        {/* Filterable gallery */}
        <ScrollReveal direction="up" duration={0.8}>
          <ProjectsGallery />
        </ScrollReveal>
      </section>

      <FooterSection />
    </main>
  );
}
