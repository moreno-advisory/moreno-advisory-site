"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Cpu, HeartPulse, DollarSign, Building2, Factory,
  Truck, Zap, Rocket, Scale, CheckCircle2, ArrowRight
} from "lucide-react";
import { getIndustries } from "@/lib/getLocaleData";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Cpu, HeartPulse, DollarSign, Building2, Factory, Truck, Zap, Rocket, Scale,
};

export default function IndustriesContent() {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: listRef, inView: listInView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const t = useTranslations("industries");
  const locale = useLocale();
  const lp = (path: string) => `/${locale}${path}`;
  const industries = getIndustries(locale);

  return (
    <>
      <section ref={heroRef}
        className="relative min-h-[55vh] flex items-end pb-20 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #070E2B 0%, #0D1B40 50%, #1B3A8C 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="container-custom relative z-10 pt-40">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gold-500" />
              <span className="section-label">{t("heroLabel")}</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-semibold leading-tight max-w-3xl">
              {t("heroTitle")}{" "}<span className="text-gradient-gold">{t("heroTitleHighlight")}</span>
            </h1>
            <p className="mt-6 text-white/60 text-xl max-w-2xl leading-relaxed">{t("heroSubtitle")}</p>
          </motion.div>
        </div>
      </section>

      <section ref={listRef} className="section-padding bg-white">
        <div className="container-custom">
          <div className="space-y-8">
            {industries.map((industry, idx) => {
              const Icon = iconMap[industry.icon] || Cpu;
              return (
                <motion.div key={industry.id} id={industry.id}
                  initial={{ opacity: 0, y: 24 }} animate={listInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: idx * 0.07 }}
                  className={cn("grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 lg:p-10 rounded-sm border border-gray-100 hover:border-navy-200 hover:shadow-card transition-all duration-300",
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50/50")}>
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-sm bg-navy-950 text-gold-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-navy-950 mb-2">{industry.title}</h2>
                      <p className="text-gray-500 text-sm leading-relaxed">{industry.description}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-navy-700 uppercase tracking-widest mb-3">{t("challenges")}</p>
                    <ul className="space-y-2">
                      {industry.challenges.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />{c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-navy-700 uppercase tracking-widest mb-3">{t("solutions")}</p>
                    <ul className="space-y-2">
                      {industry.solutions.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="h-4 w-4 text-gold-500 flex-shrink-0 mt-0.5" />{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-gray-50">
        <div className="container-custom text-center">
          <p className="section-label mb-4">{t("ctaLabel")}</p>
          <h2 className="font-display text-display-sm text-navy-950 font-semibold mb-4">{t("ctaTitle")}</h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-8">{t("ctaText")}</p>
          <Link href={lp("/contact")} className="btn-primary group inline-flex">
            {t("ctaButton")} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
