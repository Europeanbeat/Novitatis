import { Navigation } from "@/components/layout/navigation";
import { PageBackground } from "@/components/layout/page-background";
import { FooterSection } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { BrandsSection } from "@/components/sections/brands-section";
import { SelectedWork } from "@/components/sections/selected-work";
import { AudienceSection } from "@/components/sections/audience-section";
import { PartnersMarquee } from "@/components/sections/services/partners-marquee";
import { CtaSection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <PageBackground animated />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BrandsSection />
      <SelectedWork />
      <AudienceSection />
      <PartnersMarquee />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
