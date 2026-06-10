import { Navigation } from "@/components/layout/navigation";
import { PageBackground } from "@/components/layout/page-background";
import { ManifestoSection } from "@/components/sections/manifesto-section";

// Temporary preview route for the manifesto section. Delete once the section
// is approved and wired into the homepage.
export default function ManifestoPreview() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <PageBackground />
      <div className="h-[60vh] flex items-end justify-center pb-10">
        <p className="font-mono text-xs text-[#334F5A]/50">
          Scroll: the manifesto below lights up word by word
        </p>
      </div>
      <ManifestoSection />
      <div className="h-[50vh]" />
    </main>
  );
}
