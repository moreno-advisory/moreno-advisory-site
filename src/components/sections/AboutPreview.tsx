"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getValues } from "@/lib/getLocaleData";

export default function AboutPreview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const t = useTranslations("aboutPreview");
  const locale = useLocale();
  const lp = (path: string) => `/${locale}${path}`;
  const values = getValues(locale);
  const differentiators = t.raw("differentiators") as string[];

  return (
    <section ref={ref} className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -32 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <p className="section-label mb-4">{t("label")}</p>
            <h2 className="font-display text-display-md text-navy-950 font-semibold leading-tight">
              {t("title")}{" "}<span className="text-royal-DEFAULT">{t("titleHighlight")}</span>
            </h2>
            <p className="mt-6 text-gray-500 text-lg leading-relaxed">{t("text1")}</p>
            <p className="mt-4 text-gray-500 leading-relaxed">{t("text2")}</p>

            <ul className="mt-8 space-y-3">
              {differentiators.map((item, idx) => (
                <motion.li key={idx} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 0.3 + idx * 0.08 }} className="flex items-start gap-3 text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.7 }} className="mt-10">
              <Link href={lp("/about")} className="btn-outline group inline-flex">
                {t("cta")} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 32 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
            <div className="relative bg-navy-950 rounded-sm p-8 lg:p-10 overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #1B3A8C 0%, transparent 60%)" }} />
              <div className="relative z-10">
                <p className="section-label mb-6">{t("valuesLabel")}</p>
                <div className="grid grid-cols-2 gap-4">
                  {values.map((value, idx) => (
                    <motion.div key={value.title} initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.4 + idx * 0.07 }}
                      className="bg-white/5 hover:bg-white/8 rounded-sm p-4 transition-colors duration-200">
                      <p className="text-gold-400 font-semibold text-sm mb-1">{value.title}</p>
                      <p className="text-white/40 text-xs leading-relaxed line-clamp-2">{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white rounded-sm shadow-card p-5 border border-gray-100 max-w-[180px]">
              <p className="text-3xl font-display font-bold text-navy-950">{t("experienceValue")}</p>
              <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{t("experienceLabel")}</p>
            </motion.div>
            <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-gold-500/30 rounded-sm" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
