"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type FormStatus = "idle" | "sending" | "success" | "error";

type FormCopy = {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  organization: string;
  organizationPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  send: string;
  sending: string;
  success: string;
  error: string;
};

export function ContactForm({ t }: { t: FormCopy }) {
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
          {t.name}
        </label>
        <input id="name" type="text" name="name" required placeholder={t.namePlaceholder} className={inputClass} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-mono text-muted-foreground">
          {t.email}
        </label>
        <input id="email" type="email" name="email" required placeholder={t.emailPlaceholder} className={inputClass} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="organization" className="text-sm font-mono text-muted-foreground">
          {t.organization}
        </label>
        <input id="organization" type="text" name="organization" placeholder={t.organizationPlaceholder} className={inputClass} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-mono text-muted-foreground">
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={t.messagePlaceholder}
          className="px-4 py-3 rounded-lg border border-foreground/15 bg-white text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/40 transition-colors resize-none"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group mt-2 disabled:opacity-60"
      >
        {status === "sending" ? t.sending : t.send}
        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
      </Button>

      {status === "success" && (
        <p className="text-sm text-[#334F5A] font-mono">
          {t.success}
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600 font-mono">
          {t.error}
        </p>
      )}
    </form>
  );
}
