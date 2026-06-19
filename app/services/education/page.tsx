import type { Metadata } from "next";
import { practices } from "@/lib/services-content";
import { ServiceDetail } from "@/components/sections/services/service-detail";

const practice = practices.find((p) => p.slug === "education")!;

export const metadata: Metadata = {
  title: practice.title,
  description: practice.description,
};

export default function EducationPage() {
  return <ServiceDetail slug="education" />;
}
