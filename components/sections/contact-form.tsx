"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setStatus("success");
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "h-12 px-4 rounded-lg border border-foreground/15 bg-white text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/40 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-[#f9fbff] border border-foreground/10 rounded-2xl p-6 lg:p-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-mono text-muted-foreground">
          Name
        </label>
        <input id="name" type="text" name="name" required placeholder="Your name" className={inputClass} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-mono text-muted-foreground">
          Email
        </label>
        <input id="email" type="email" name="email" required placeholder="you@email.com" className={inputClass} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="organization" className="text-sm font-mono text-muted-foreground">
          Organization
        </label>
        <input id="organization" type="text" name="organization" placeholder="Company / organization" className={inputClass} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-mono text-muted-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="How can we help?"
          className="px-4 py-3 rounded-lg border border-foreground/15 bg-white text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/40 transition-colors resize-none"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group mt-2 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send message"}
        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
      </Button>

      {status === "success" && (
        <p className="text-sm text-[#334F5A] font-mono">
          Thank you! We&apos;ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600 font-mono">
          Something went wrong. Please try again, or email info@novitatis.hu.
        </p>
      )}
    </form>
  );
}
