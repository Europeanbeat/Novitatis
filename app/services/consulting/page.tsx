import type { Metadata } from "next";
import { practices } from "@/lib/services-content";
import { ServiceDetail } from "@/components/sections/services/service-detail";

const practice = practices.find((p) => p.slug === "consulting")!;

export const metadata: Metadata = {
  title: practice.title,
  description: practice.description,
};

export default function ConsultingPage() {
  return <ServiceDetail slug="consulting" />;
}
