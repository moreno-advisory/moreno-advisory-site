import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getNews } from "@/lib/rss";
import BlogPageContent from "@/app/blog/BlogPageContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: `${t("heroTitle")} ${t("heroTitleHighlight")} | Moreno Advisory`,
    description: t("heroSubtitle"),
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const news = await getNews(locale).catch(() => []);
  return <BlogPageContent news={news} />;
}
