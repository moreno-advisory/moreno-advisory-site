"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight, Target, Eye, CheckCircle2,
  Shield, Award, Lightbulb, Globe2, Quote
} from "lucide-react";
import { getValues } from "@/lib/getLocaleData";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Shield, Eye, Award, Lightbulb, Globe2, Target,
};

const methodology = [
  { step: "01", titleKey: "method1Title" as const, descKey: "method1Desc" as const },
  { step: "02", titleKey: "method2Title" as const, descKey: "method2Desc" as const },
  { step: "03", titleKey: "method3Title" as const, descKey: "method3Desc" as const },
  { step: "04", titleKey: "method4Title" as const, descKey: "method4Desc" as const },
  { step: "05", titleKey: "method5Title" as const, descKey: "method5Desc" as const },
];

export default function AboutContent() {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: founderRef, inView: founderInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: missionRef, inView: missionInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: valuesRef, inView: valuesInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: methodRef, inView: methodInView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const t = useTranslations("about");
  const locale = useLocale();
  const lp = (path: string) => `/${locale}${path}`;
  const values = getValues(locale);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef}
        className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden"
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
              {t("heroTitle")}{" "}
              <span className="text-gradient-gold">{t("heroTitleHighlight")}</span>
            </h1>
            <p className="mt-6 text-white/60 text-xl max-w-2xl leading-relaxed">{t("heroSubtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* ── FOUNDER SECTION ── */}
      <section ref={founderRef} className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={founderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center lg:items-start"
            >
              {/* Photo */}
              <div className="relative">
                <div className="w-72 h-80 rounded-sm overflow-hidden shadow-navy-lg relative">
                  <Image
                    src="/assets/perfil.png"
                    alt="Carlos Eduardo Moreno — Founder, Moreno Advisory"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
                {/* Gold frame accent */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold-500/40 rounded-sm pointer-events-none" />
                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 bg-navy-950 rounded-sm p-4 shadow-navy"
                >
                  <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-0.5">{t("founderBadge")}</p>
                  <p className="text-white font-display text-base font-semibold">Carlos E. Moreno</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Bio text */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={founderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <p className="section-label mb-4">{t("founderLabel")}</p>
              <h2 className="font-display text-display-md text-navy-950 font-semibold leading-tight mb-2">
                {t("founderTitle")}
              </h2>
              <p className="text-royal-DEFAULT font-semibold text-lg mb-6">{t("founderSubtitle")}</p>

              <div className="space-y-4 text-gray-500 leading-relaxed text-base">
                <p>{t("founderPara1")}</p>
                <p>{t("founderPara2")}</p>
              </div>

              {/* Pull quote */}
              <div className="my-8 relative pl-6 border-l-2 border-gold-500">
                <Quote className="absolute -top-1 -left-3 h-5 w-5 text-gold-500 bg-white" />
                <p className="font-display text-xl text-navy-950 font-medium italic leading-relaxed">
                  {t("founderQuote")}
                </p>
                <p className="text-gold-500 text-sm font-semibold mt-3">— Carlos Eduardo Moreno</p>
              </div>

              <div className="space-y-4 text-gray-500 leading-relaxed text-base">
                <p>{t("founderPara3")}</p>
              </div>

              {/* Pillars */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {(t.raw("founderPillars") as string[]).map((pillar, i) => (
                  <div key={i} className="flex items-center gap-2 bg-navy-50 rounded-sm px-3 py-2">
                    <CheckCircle2 className="h-4 w-4 text-gold-500 flex-shrink-0" />
                    <span className="text-navy-800 text-xs font-medium">{pillar}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story + Mission/Vision */}
      <section ref={missionRef} className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={missionInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
              <p className="section-label mb-4">{t("storyLabel")}</p>
              <h2 className="font-display text-display-md text-navy-950 font-semibold leading-tight mb-6">
                {t("storyTitle")}<br />{t("storyTitle2")}
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>{t("story1")}</p>
                <p>{t("story2")}</p>
                <p>{t("story3")}</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} animate={missionInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-6">
              {[
                { icon: Target, title: t("missionTitle"), text: t("missionText"), color: "bg-navy-50 text-navy-800" },
                { icon: Eye, title: t("visionTitle"), text: t("visionText"), color: "bg-gold-50 text-gold-700" },
              ].map(({ icon: Icon, title, text, color }) => (
                <div key={title} className="bg-white rounded-sm p-8 border border-gray-100">
                  <div className={cn("inline-flex p-3 rounded-sm mb-4", color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-navy-950 mb-3">{title}</h3>
                  <p className="text-gray-500 leading-relaxed">{text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="section-padding bg-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
            <p className="section-label mb-4">{t("valuesLabel")}</p>
            <h2 className="font-display text-display-md text-navy-950 font-semibold">{t("valuesTitle")}</h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">{t("valuesSubtitle")}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, idx) => {
              const Icon = iconMap[value.icon] || CheckCircle2;
              return (
                <motion.div key={value.title} initial={{ opacity: 0, y: 24 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-gray-50 rounded-sm border border-gray-100 p-8 hover:shadow-card hover:border-navy-100 transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 rounded-sm bg-navy-950 text-gold-400 mb-5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-navy-950 mb-3">{value.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section ref={methodRef} className="section-padding bg-navy-950">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={methodInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
            <p className="section-label mb-4">{t("methodologyLabel")}</p>
            <h2 className="font-display text-display-md text-white font-semibold">{t("methodologyTitle")}</h2>
            <p className="mt-4 text-white/50 max-w-xl mx-auto">{t("methodologySubtitle")}</p>
          </motion.div>
          <div className="space-y-0">
            {methodology.map((step, idx) => (
              <motion.div key={step.step} initial={{ opacity: 0, x: idx % 2 === 0 ? -24 : 24 }} animate={methodInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={cn("flex flex-col md:flex-row items-start gap-6 py-8 border-b border-white/8 last:border-0", idx % 2 === 1 && "md:flex-row-reverse")}>
                <div className="flex-shrink-0">
                  <span className="font-display text-6xl font-bold text-white/8 select-none">{step.step}</span>
                </div>
                <div className="flex-1 md:py-2">
                  <div className="h-0.5 w-8 bg-gold-500/60 mb-4" />
                  <h3 className="font-display text-2xl text-white font-semibold mb-3">{t(step.titleKey)}</h3>
                  <p className="text-white/50 leading-relaxed max-w-lg">{t(step.descKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="font-display text-display-sm text-navy-950 font-semibold mb-6">{t("ctaTitle")}</h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-8">{t("ctaText")}</p>
          <div className="flex items-center justify-center gap-4">
            <Link href={lp("/contact")} className="btn-primary group">
              {t("ctaButton")} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href={lp("/services")} className="btn-outline">{t("servicesButton")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
