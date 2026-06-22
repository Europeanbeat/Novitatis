import Link from "next/link";

// Brand cards for use inside a sub-page section. Clean and roomy: the brand name
// set in the serif rather than logo images, which sit inconsistently at this size
// (two are wordmarks, Turizmus Tudástár is an icon-style mark).
type Brand = {
  id: string;
  name: string;
  url: string;
  audience: string;
  description: string;
};

export const brands: Brand[] = [
  {
    id: "visible-tourism",
    name: "Visible Tourism",
    url: "visibletourism.com",
    audience: "TDM · DMO · tourism businesses",
    description:
      "Digital visibility for destinations (TDM, DMO), on a Google-based infrastructure.",
  },
  {
    id: "turizmus-tudastar",
    name: "Turizmus Tudástár",
    url: "turizmustudastar.hu",
    audience: "Tourism SMEs",
    description:
      "A knowledge platform and Google Business Profile mentoring for tourism SMEs.",
  },
  {
    id: "ai4tourism",
    name: "AI4Tourism",
    url: "ai4tourism.com",
    audience: "Tourism players",
    description:
      "An AI mentoring programme: practical AI for people working in tourism.",
  },
];

export function BrandCards() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {brands.map((brand) => (
        <Link
          key={brand.id}
          href={`/brands?brand=${brand.id}`}
          className="group flex flex-col rounded-2xl border border-foreground/10 bg-white p-8 lg:p-9 transition-all duration-500 hover:border-[#AAD7E6] hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_rgba(51,79,90,0.3)]"
        >
          <span className="font-mono text-[11px] text-[#334F5A]/60 uppercase tracking-wider block mb-6">
            {brand.audience}
          </span>
          <h3 className="font-display text-2xl lg:text-3xl text-[#334F5A] leading-tight mb-3">
            {brand.name}
          </h3>
          <p className="text-[15px] text-[#334F5A]/70 leading-relaxed mb-8 flex-1">
            {brand.description}
          </p>
          <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#334F5A]/80">
            <span>{brand.url}</span>
            <span className="inline-flex items-center gap-1.5 font-medium text-[#334F5A]">
              Explore
              <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
