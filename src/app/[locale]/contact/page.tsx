import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactPageContent from "@/app/contact/ContactPageContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: `${t("heroTitle")} ${t("heroTitleHighlight")} | Moreno Advisory`,
    description: t("heroSubtitle"),
  };
}

export default function ContactPage() {
  return <ContactPageContent />;
}
