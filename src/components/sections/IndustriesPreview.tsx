"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Cpu, HeartPulse, DollarSign, Building2, Factory,
  Truck, Zap, Rocket, Scale, ArrowRight
} from "lucide-react";
import { getIndustries } from "@/lib/getLocaleData";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Cpu, HeartPulse, DollarSign, Building2, Factory, Truck, Zap, Rocket, Scale,
};

export default function IndustriesPreview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const t = useTranslations("industries");
  const locale = useLocale();
  const lp = (path: string) => `/${locale}${path}`;
  const industries = getIndustries(locale);

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-14">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="max-w-xl">
            <p className="section-label mb-4">{t("heroLabel")}</p>
            <h2 className="font-display text-display-md text-navy-950 font-semibold leading-tight">
              {t("heroTitle")}{" "}<span className="text-royal-DEFAULT">{t("heroTitleHighlight")}</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            <Link href={lp("/industries")} className="btn-outline group inline-flex mt-2">
              {t("ctaButton")} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {industries.map((industry, idx) => {
            const Icon = iconMap[industry.icon] || Cpu;
            return (
              <motion.div key={industry.id} initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: idx * 0.05 }}>
                <Link href={`${lp("/industries")}#${industry.id}`}
                  className={cn("group flex flex-col items-center text-center p-5 rounded-sm border border-gray-100 hover:border-navy-900 hover:shadow-card transition-all duration-300 hover:-translate-y-0.5")}>
                  <div className="flex items-center justify-center w-10 h-10 rounded-sm bg-navy-50 text-navy-800 group-hover:bg-navy-900 group-hover:text-gold-400 transition-all duration-300 mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-navy-800 font-medium text-sm leading-snug group-hover:text-navy-950">{industry.title}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
