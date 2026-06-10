import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { FooterSection } from "@/components/layout/footer";
import { PageBackground } from "@/components/layout/page-background";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Novitatis. Let's talk about how we can support your tourism strategy, development or education goals.",
};

export default function ContactUsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <PageBackground />
      <Navigation />

      <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-40 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: intro + contact info, with a soft halo so the background
              lines do not fight the text */}
          <div className="relative isolate">
            <span
              aria-hidden
              className="absolute -inset-x-10 -inset-y-8 -z-10 backdrop-blur-sm bg-background/60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
            />
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-12 h-px bg-foreground/30" />
              Contact
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[0.95] mb-8">
              Let&apos;s talk.
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-md mb-12">
              Get in touch and let&apos;s discuss how we can help, whether
              it&apos;s strategy, development or education.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#AAD7E6]" />
                <a href="mailto:info@novitatis.hu" className="font-mono text-sm text-[#334F5A] hover:underline">
                  info@novitatis.hu
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#AAD7E6]" />
                <a href="tel:+36204282140" className="font-mono text-sm text-[#334F5A] hover:underline">
                  +36 20 428 21 40
                </a>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="w-full">
            <ContactForm />
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
