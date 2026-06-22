import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Halo } from "@/components/sections/services/_halo";

// Editorial manifesto hero: one confident statement, centred, the floating
// background lines reading through a halo. The message is the design.
export function ServicesHero() {
  return (
    <section className="relative z-10 min-h-[78dvh] flex flex-col items-center justify-center text-center max-w-[1100px] mx-auto px-6 pt-24 pb-20">
      <ScrollReveal direction="up" duration={0.7}>
        <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
          <span className="w-10 h-px bg-foreground/30" />
          Services
          <span className="w-10 h-px bg-foreground/30" />
        </span>
      </ScrollReveal>

      <ScrollReveal direction="up" duration={1} delay={0.05}>
        <h1 className="relative isolate text-5xl md:text-7xl lg:text-[5.5rem] font-display tracking-tight leading-[0.98] text-[#334F5A]">
          <Halo className="-inset-x-16 -inset-y-12" />
          Turn destination data into
          <br />
          <span className="text-muted-foreground">strategic advantage.</span>
        </h1>
      </ScrollReveal>

      <ScrollReveal direction="up" duration={0.9} delay={0.15}>
        <p className="relative isolate mt-8 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-[48ch]">
          <Halo />
          Tailor-made digital solutions and data for DMOs and tourism SMEs.
        </p>
      </ScrollReveal>

    </section>
  );
}
