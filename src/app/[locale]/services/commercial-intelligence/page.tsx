import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/getLocaleData";
import ServiceDetail from "@/components/sections/ServiceDetail";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const service = getServiceBySlug("commercial-intelligence", locale);
  if (!service) return {};
  return { title: service.metaTitle, description: service.metaDescription };
}

export default function ServicePage() {
  return <ServiceDetail slug="commercial-intelligence" />;
}
