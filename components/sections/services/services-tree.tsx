import { practices } from "@/lib/services-content";

// Services as a tree: one shared root (the method) branching into the four
// practices. Connectors drawn with thin rules; collapses to a clean grid on mobile.
export function ServicesTree() {
  return (
    <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
      <div className="max-w-[60ch] mb-14 lg:mb-20">
        <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05]">
          One method. Four branches.
        </h2>
        <p className="mt-5 text-lg text-[#334F5A]/80 leading-relaxed">
          Every practice grows from the same research-first method. They share a
          root, and feed each other.
        </p>
      </div>

      <div className="flex flex-col items-center">
        {/* Root */}
        <div className="rounded-full bg-[#334F5A] px-6 py-3 font-mono text-xs text-white">
          Research-first method
        </div>
        {/* Trunk */}
        <div className="w-px h-10 bg-foreground/20" />

        {/* Branches */}
        <div className="relative w-full pt-10">
          <div className="hidden lg:block absolute top-0 left-[12.5%] right-[12.5%] h-px bg-foreground/20" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
            {practices.map((p) => (
              <a
                key={p.slug}
                href={`/services/${p.slug}`}
                className="group relative flex flex-col rounded-2xl border border-foreground/12 bg-white p-6 shadow-[0_24px_60px_-44px_rgba(51,79,90,0.4)] transition-colors hover:border-[#AAD7E6]"
              >
                {/* Stub up to the rail */}
                <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 -top-10 w-px h-10 bg-foreground/20 transition-colors group-hover:bg-[#AAD7E6]" />

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-mono text-xs text-[#AAD7E6]">{p.number}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#334F5A]/55">
                    {p.tag}
                  </span>
                </div>
                <h3 className="font-display text-xl lg:text-2xl text-[#334F5A] leading-tight mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-[#334F5A]/75 leading-relaxed mb-6">{p.lead}</p>

                <span className="mt-auto inline-flex items-center gap-2 font-mono text-xs text-[#334F5A]">
                  Explore
                  <span className="text-[#AAD7E6] transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
