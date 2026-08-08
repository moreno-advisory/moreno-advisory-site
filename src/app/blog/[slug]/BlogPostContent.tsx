"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function BlogPostContent({ slug }: { slug: string }) {
  const t = useTranslations("blog");
  const locale = useLocale();
  const lp = (path: string) => `/${locale}${path}`;
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <section className="relative min-h-[50vh] flex items-end pb-16 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #070E2B 0%, #0D1B40 60%, #1B3A8C 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="container-custom relative z-10 pt-36">
          <nav className="flex items-center gap-2 text-white/40 text-sm mb-6">
            <Link href={lp("/")} className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <Link href={lp("/blog")} className="hover:text-white/70 transition-colors">{t("heroLabel")}</Link>
            <span>/</span>
            <span className="text-white/70 truncate max-w-xs">{title}</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl text-white font-semibold leading-tight max-w-3xl">{title}</h1>
          <div className="mt-5 flex items-center gap-4 text-white/40 text-sm">
            <span>Moreno Advisory</span><span>·</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 6 {t("minRead")}</span>
            <span>·</span><span>June 2026</span>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <Link href={lp("/blog")} className="inline-flex items-center gap-2 text-gray-400 hover:text-navy-800 text-sm mb-10 transition-colors">
            <ArrowLeft className="h-4 w-4" /> {t("backToInsights")}
          </Link>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-500 text-xl leading-relaxed font-light">
              This article is currently being prepared by our editorial team. Subscribe to our newsletter to be notified when new content is published.
            </p>
            <div className="my-10 p-8 bg-navy-950 rounded-sm not-prose">
              <p className="section-label mb-3">{t("comingSoon")}</p>
              <h3 className="font-display text-2xl text-white font-semibold mb-4">{t("inProgress")}</h3>
              <p className="text-white/50 mb-6">{t("subscribeText")}</p>
              <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-sm text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50" />
                <button type="submit" className="btn-primary">{t("notifyMe")}</button>
              </form>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
            <p className="text-gray-400 text-sm">{t("shareArticle")}</p>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE_CONFIG.url}/${locale}/blog/${slug}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-sm text-sm text-gray-600 hover:border-navy-900 hover:text-navy-900 transition-all duration-200">
              <Share2 className="h-3.5 w-3.5" /> LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
