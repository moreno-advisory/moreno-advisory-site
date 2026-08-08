"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { ArrowRight, Clock, ExternalLink, Rss, Globe, BookOpen } from "lucide-react";
import type { NewsItem } from "@/lib/rss";
import { cn } from "@/lib/utils";

const editorialPosts = [
  { slug: "building-strategic-partnerships-global-market", titleEn: "Building Strategic Partnerships in a Complex Global Market", titlePt: "Construindo Parcerias Estratégicas num Mercado Global Complexo", excerptEn: "In an era of market fragmentation and geopolitical uncertainty, the ability to forge and sustain strategic alliances is more valuable than ever.", excerptPt: "Em uma era de fragmentação de mercado e incerteza geopolítica, a capacidade de forjar e sustentar alianças estratégicas é mais valiosa do que nunca.", category: "Strategic Partnerships", readTime: 6, publishedAt: "2026-06-15" },
  { slug: "international-expansion-five-mistakes", titleEn: "5 Critical Mistakes Companies Make When Expanding Internationally", titlePt: "5 Erros Críticos das Empresas na Expansão Internacional", excerptEn: "Most international expansion failures are predictable. We've identified the five mistakes that derail even the most promising expansions.", excerptPt: "A maioria dos fracassos de expansão internacional são previsíveis. Identificamos os cinco erros que comprometem até as expansões mais promissoras.", category: "International Expansion", readTime: 8, publishedAt: "2026-06-08" },
  { slug: "commercial-intelligence-competitive-advantage", titleEn: "How Commercial Intelligence Creates Sustainable Competitive Advantage", titlePt: "Como a Inteligência Comercial Cria Vantagem Competitiva Sustentável", excerptEn: "Companies that systematically convert market data into actionable intelligence consistently outperform their peers.", excerptPt: "Empresas que sistematicamente convertem dados de mercado em inteligência acionável superam consistentemente seus concorrentes.", category: "Market Intelligence", readTime: 5, publishedAt: "2026-05-28" },
];

const categoryColors: Record<string, string> = {
  "Strategic Partnerships": "bg-blue-50 text-blue-700",
  "International Expansion": "bg-green-50 text-green-700",
  "Market Intelligence": "bg-purple-50 text-purple-700",
  "Business Development": "bg-amber-50 text-amber-700",
  "Leadership": "bg-rose-50 text-rose-700",
  "Business": "bg-navy-50 text-navy-700",
  "Negócios": "bg-navy-50 text-navy-700",
  "Mercados": "bg-blue-50 text-blue-700",
  "Economia": "bg-green-50 text-green-700",
  "Markets": "bg-blue-50 text-blue-700",
  "default": "bg-gray-100 text-gray-600",
};

function getCatColor(cat: string) {
  return categoryColors[cat] ?? categoryColors["default"];
}

interface Props {
  news: NewsItem[];
}

export default function BlogPageContent({ news }: Props) {
  const t = useTranslations("blog");
  const locale = useLocale();
  const lp = (path: string) => `/${locale}${path}`;
  const isPt = locale === "pt";

  const [activeTab, setActiveTab] = useState<"all" | "editorial" | "news">("all");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const tabs = [
    { id: "all", labelEn: "All", labelPt: "Todos" },
    { id: "editorial", labelEn: "Moreno Insights", labelPt: "Moreno Insights" },
    { id: "news", labelEn: "Market Intelligence", labelPt: "Inteligência de Mercado" },
  ] as const;

  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[45vh] flex items-end pb-16 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #070E2B 0%, #0D1B40 50%, #1B3A8C 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="container-custom relative z-10 pt-36">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-gold-500" />
            <span className="section-label">{t("heroLabel")}</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white font-semibold leading-tight max-w-2xl">
            {t("heroTitle")}{" "}<span className="text-gradient-gold">{t("heroTitleHighlight")}</span>
          </h1>
          <p className="mt-5 text-white/60 text-xl max-w-xl">{t("heroSubtitle")}</p>
        </div>
      </section>

      {/* Content */}
      <section ref={ref} className="section-padding bg-white">
        <div className="container-custom">

          {/* Tabs */}
          <div className="flex items-center gap-2 mb-12 border-b border-gray-100 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-semibold transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-navy-950 text-white"
                    : "text-gray-500 hover:text-navy-800 hover:bg-gray-50"
                )}
              >
                {tab.id === "editorial" && <BookOpen className="h-3.5 w-3.5" />}
                {tab.id === "news" && <Rss className="h-3.5 w-3.5" />}
                {isPt ? tab.labelPt : tab.labelEn}
                {tab.id === "news" && news.length > 0 && (
                  <span className="bg-gold-500 text-navy-950 text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {news.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Editorial Posts */}
          {(activeTab === "all" || activeTab === "editorial") && (
            <div className="mb-16">
              {activeTab === "all" && (
                <div className="flex items-center gap-3 mb-8">
                  <BookOpen className="h-5 w-5 text-navy-800" />
                  <h2 className="font-display text-2xl font-semibold text-navy-950">
                    {isPt ? "Artigos Moreno Advisory" : "Moreno Advisory Articles"}
                  </h2>
                </div>
              )}

              {/* Featured */}
              <Link href={lp(`/blog/${editorialPosts[0].slug}`)}
                className="group block mb-8 bg-gray-50 rounded-sm border border-gray-100 hover:border-navy-200 hover:shadow-card-hover transition-all duration-300 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="bg-navy-950 aspect-video lg:aspect-auto lg:min-h-[280px] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 50%, #1B3A8C 0%, #0D1B40 70%)" }} />
                    <Image
                      src="/assets/logo-main.png"
                      alt="Moreno Advisory"
                      width={240}
                      height={96}
                      className="relative z-10 w-48 lg:w-56 h-auto object-contain brightness-0 invert opacity-90"
                    />
                    <div className="absolute bottom-4 left-4 z-10">
                      <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-sm", getCatColor(editorialPosts[0].category))}>
                        {editorialPosts[0].category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <h3 className="font-display text-2xl lg:text-3xl font-semibold text-navy-950 group-hover:text-royal-DEFAULT transition-colors leading-tight mb-4">
                      {isPt ? editorialPosts[0].titlePt : editorialPosts[0].titleEn}
                    </h3>
                    <p className="text-gray-500 leading-relaxed mb-6 text-sm">
                      {isPt ? editorialPosts[0].excerptPt : editorialPosts[0].excerptEn}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-gray-400 text-xs">
                        <Clock className="h-3 w-3" /> {editorialPosts[0].readTime} {t("minRead")}
                      </span>
                      <span className="text-gold-500 text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        {t("readMore")} <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Other editorial */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {editorialPosts.slice(1).map((post, idx) => (
                  <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: idx * 0.1 }}>
                    <Link href={lp(`/blog/${post.slug}`)}
                      className="group flex flex-col border border-gray-100 rounded-sm hover:border-navy-200 hover:shadow-card hover:bg-gray-50/50 transition-all duration-300 overflow-hidden h-full">
                      <div className="bg-navy-950 h-40 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 40% 50%, #1B3A8C 0%, #0D1B40 70%)" }} />
                        <Image
                          src="/assets/logo-main.png"
                          alt="Moreno Advisory"
                          width={180}
                          height={72}
                          className="relative z-10 w-36 h-auto object-contain brightness-0 invert opacity-90"
                        />
                        <div className="absolute bottom-3 left-3 z-10">
                          <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-sm", getCatColor(post.category))}>
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-display text-lg font-semibold text-navy-950 group-hover:text-royal-DEFAULT transition-colors leading-snug mb-3">
                          {isPt ? post.titlePt : post.titleEn}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">
                          {isPt ? post.excerptPt : post.excerptEn}
                        </p>
                        <div className="flex items-center gap-3 text-gray-400 text-xs mt-4 pt-4 border-t border-gray-100">
                          <span>{post.publishedAt}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime} {t("minRead")}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Live News Feed */}
          {(activeTab === "all" || activeTab === "news") && (
            <div>
              {activeTab === "all" && (
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <Rss className="h-5 w-5 text-gold-500" />
                    <h2 className="font-display text-2xl font-semibold text-navy-950">
                      {isPt ? "Inteligência de Mercado" : "Market Intelligence"}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    {isPt ? "Atualizado a cada 30 min" : "Updated every 30 min"}
                  </div>
                </div>
              )}

              {news.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-gray-200 rounded-sm">
                  <Globe className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-400">
                    {isPt ? "Carregando últimas notícias..." : "Loading latest news..."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {news.map((item, idx) => (
                    <motion.a
                      key={idx}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: idx * 0.04 }}
                      className="group flex flex-col border border-gray-100 rounded-sm hover:border-navy-200 hover:shadow-card transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
                    >
                      {/* Source bar */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-sm", getCatColor(item.category))}>
                            {item.category}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">{item.source}</span>
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-semibold text-navy-900 text-sm leading-snug mb-3 group-hover:text-royal-DEFAULT transition-colors line-clamp-3">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-gray-500 text-xs leading-relaxed flex-1 line-clamp-3 mb-3">
                            {item.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                          <span className="text-gray-400 text-xs">{item.pubDate}</span>
                          <span className="flex items-center gap-1 text-gold-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            {isPt ? "Ler" : "Read"} <ExternalLink className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              )}

              {news.length > 0 && (
                <p className="mt-6 text-center text-xs text-gray-400">
                  {isPt
                    ? "Fontes: Exame, InfoMoney, Valor Econômico, G1 Economia, Agência Brasil"
                    : "Sources: BBC Business, Harvard Business Review, The New York Times, Financial Times, Wall Street Journal"}
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
