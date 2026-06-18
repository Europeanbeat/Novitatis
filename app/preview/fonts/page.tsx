import { Archivo, Hanken_Grotesk, Schibsted_Grotesk } from "next/font/google";

// Font specimen preview: the same real headlines in three free grotesks that
// approximate Suisse Int'l (Haven's font), next to the current Instrument
// Serif, all with the tight display treatment (-0.03em, line-height 0.9).
// Temporary route; delete after a decision.

const archivo = Archivo({ subsets: ["latin", "latin-ext"], variable: "--spec-archivo" });
const hanken = Hanken_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--spec-hanken" });
const schibsted = Schibsted_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--spec-schibsted" });

const candidates = [
  { name: "Current: Instrument Serif", cls: "font-display", note: "what you have today" },
  { name: "Archivo", cls: archivo.className, note: "closest to Suisse, sturdy and neutral" },
  { name: "Hanken Grotesk", cls: hanken.className, note: "softer, friendlier corners" },
  { name: "Schibsted Grotesk", cls: schibsted.className, note: "more character, editorial edge" },
];

export default function FontPreview() {
  return (
    <main className="min-h-screen bg-background px-6 lg:px-12 py-16 space-y-20 max-w-[1200px] mx-auto">
      <p className="font-mono text-xs text-[#334F5A]/55 uppercase tracking-wider">
        Font specimen, temporary preview
      </p>
      {candidates.map((c) => (
        <section key={c.name} className="border-t border-foreground/10 pt-8">
          <p className="font-mono text-xs text-[#AAD7E6] mb-6">
            {c.name} <span className="text-[#334F5A]/50">({c.note})</span>
          </p>
          <h1
            className={`${c.cls} text-6xl lg:text-[5.5rem] text-[#334F5A] tracking-[-0.03em] leading-[0.92] font-medium`}
          >
            The future of tourism,
            <br />
            that inspires.
          </h1>
          <h2 className={`${c.cls} mt-8 text-3xl lg:text-4xl text-[#334F5A] tracking-[-0.02em]`}>
            Four services. In depth.
          </h2>
          <p className="mt-6 text-lg text-[#334F5A]/75 leading-relaxed max-w-[58ch]">
            We help destinations and tourism businesses decide what to do next,
            then build the digital and AI tools to do it. (Body text stays
            Instrument Sans in every variant.)
          </p>
        </section>
      ))}
    </main>
  );
}
