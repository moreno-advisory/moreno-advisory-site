"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLocale, useTranslations } from "next-intl";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { getStats } from "@/lib/getLocaleData";

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const t = useTranslations("stats");
  const locale = useLocale();
  const stats = getStats(locale);

  return (
    <section ref={ref} className="relative py-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0D1B40 0%, #1B3A8C 50%, #0D1B40 100%)" }}>
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />

      <div className="container-custom relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <p className="section-label mb-3">{t("label")}</p>
          <h2 className="font-display text-display-md text-white font-semibold">{t("title")}</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`flex flex-col items-center text-center px-6 py-4 ${idx < stats.length - 1 ? "lg:border-r lg:border-white/10" : ""}`}>
              <div className="stat-number text-white">
                {inView ? (
                  <AnimatedCounter end={parseInt(stat.value)} prefix={stat.prefix} suffix={stat.suffix} />
                ) : (
                  <span>{stat.prefix}{stat.value}{stat.suffix}</span>
                )}
              </div>
              <div className="mt-3 h-0.5 w-8 bg-gold-500/60 rounded-full" />
              <p className="mt-3 text-white/55 text-sm tracking-widest uppercase font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
