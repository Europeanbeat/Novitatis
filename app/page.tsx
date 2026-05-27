import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import { PageBackground } from "@/components/landing/background";
export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">

      <Navigation />
      <PageBackground />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <InfrastructureSection />
      <IntegrationsSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}

// What I understand that  pretty much schema for the main page import all the nesscary ocmpintetn i guess this one that is showed in the main page... I see that it has only references this functions is here  althogugh what i dont undestand  how is this actually one that showcased in hte main where that is set  actually ?  
