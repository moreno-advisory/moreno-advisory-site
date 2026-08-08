"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const trustCards = ["experience", "outbound", "focus"] as const;

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const lp = (path: string) => `/${locale}${path}`;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-bg">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(27,58,140,0.8) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)" }} />
        <motion.div
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 0.04, rotate: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[700px] h-[700px]"
        >
          <CompassSVG />
        </motion.div>
        <div className="absolute top-0 left-0 w-px h-40 bg-gradient-to-b from-transparent via-gold-500/30 to-transparent translate-x-40" />
        <div className="absolute top-0 right-0 w-40 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent translate-y-40" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-32 pb-20 text-center">
        {/* Label */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
          className="inline-flex items-center gap-3 mb-8">
          <span className="h-px w-10 bg-gold-500" />
          <span className="section-label">{t("tagline")}</span>
          <span className="h-px w-10 bg-gold-500" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.25}
          className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white leading-[1.08] tracking-tight max-w-5xl mx-auto">
          {t("headline1")}{" "}
          <span className="text-gradient-gold">{t("headline2")}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.4}
          className="mt-8 text-white/65 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          {t("subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.55}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={lp("/contact")} className="btn-primary group">
            {t("cta1")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link href={lp("/services")} className="btn-secondary group">
            {t("cta2")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Focus Strip */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.7}
          className="mt-16 pt-8 border-t border-white/8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {trustCards.map((card) => {
            const main = t(`stats.${card}.main`);
            return (
              <div
                key={card}
                className="group text-left rounded-sm border border-white/10 bg-gradient-to-br from-white/[0.095] via-white/[0.055] to-white/[0.025] px-5 py-5 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-colors duration-300 hover:border-gold-500/35 hover:bg-white/[0.08]"
              >
                <p className={`font-display text-2xl lg:text-3xl font-bold leading-none text-white ${main.includes("B2B") ? "b2b-display" : ""}`}>
                  {main}
                </p>
                <p className="mt-3 min-h-10 text-[11px] font-semibold tracking-[0.18em] uppercase leading-relaxed text-gold-500">
                  {t(`stats.${card}.title`)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/58">
                  {t(`stats.${card}.description`)}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/30 text-xs tracking-widest uppercase">{t("scroll")}</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-5 w-5 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function CompassSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="100" cy="100" r="95" stroke="white" strokeWidth="1" />
      <circle cx="100" cy="100" r="75" stroke="white" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="55" stroke="white" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="35" stroke="white" strokeWidth="0.5" />
      <line x1="100" y1="5" x2="100" y2="195" stroke="white" strokeWidth="0.5" />
      <line x1="5" y1="100" x2="195" y2="100" stroke="white" strokeWidth="0.5" />
      <line x1="33" y1="33" x2="167" y2="167" stroke="white" strokeWidth="0.3" />
      <line x1="167" y1="33" x2="33" y2="167" stroke="white" strokeWidth="0.3" />
      <polygon points="100,20 105,100 100,95 95,100" fill="white" opacity="0.8" />
      <polygon points="100,180 105,100 100,105 95,100" fill="white" opacity="0.4" />
      <polygon points="20,100 100,95 105,100 100,105" fill="white" opacity="0.4" />
      <polygon points="180,100 100,95 95,100 100,105" fill="white" opacity="0.6" />
      <circle cx="100" cy="100" r="6" fill="white" opacity="0.8" />
    </svg>
  );
}
