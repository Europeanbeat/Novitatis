import { ScrollReveal } from "@/components/ui/scroll-reveal";

const halo =
  "absolute -inset-x-8 -inset-y-8 -z-10 backdrop-blur-sm bg-background/55 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_88%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_88%)]";

// Editorial closing statement: the brand identity line from the booklet,
// "not a classic consultancy, a specialist network".
export function ClosingStatement() {
  return (
    <section className="relative z-10 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#AAD7E6]/15 blur-[140px] pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-36">
        <img
          src="/images/abstract-shape.svg"
          aria-hidden
          alt=""
          className="absolute bottom-0 left-0 right-0 w-full opacity-30 pointer-events-none [mask-image:linear-gradient(to_top,black_0%,transparent_80%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,transparent_80%)]"
        />
        <ScrollReveal direction="up" duration={1}>
          <div className="relative isolate">
            <span aria-hidden className={halo} />
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display text-[#334F5A] leading-[1.02] max-w-[20ch]">
              Not a classic consultancy.
              <br />
              <span className="text-muted-foreground">A specialist network.</span>
            </h2>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-[58ch]">
              We research, advise, build and embed. We bring in the specialist each
              problem needs, and work towards long-term partnerships with the
              organisations we advise.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
