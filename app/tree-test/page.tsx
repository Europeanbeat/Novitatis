import { Navigation } from "@/components/layout/navigation";
import { ShredderTree } from "@/components/sections/services/shredder-tree";

export default function TreeTestPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <Navigation />

      <section className="relative z-10 max-w-[760px] mx-auto px-6 pt-40 pb-24 text-center">
        <h1 className="font-display text-4xl lg:text-5xl text-[#334F5A] leading-[1.05]">
          Shredder tree (test)
        </h1>
        <p className="mt-4 text-lg text-[#334F5A]/70">
          Scroll down: the scattered strips slide together to assemble the tree,
          then shred apart again as you keep going.
        </p>
      </section>

      {/* The shredder provides its own scroll anchor (250vh) below this. */}
      <ShredderTree />

      <section className="relative z-10 h-[40vh]" />
    </main>
  );
}
