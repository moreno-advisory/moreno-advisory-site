import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ServicesPageContent from "@/app/services/ServicesPageContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: `${t("heroTitle")} ${t("heroTitleHighlight")} | Moreno Advisory`,
    description: t("heroSubtitle"),
  };
}

export default function ServicesPage() {
  return <ServicesPageContent />;
}
