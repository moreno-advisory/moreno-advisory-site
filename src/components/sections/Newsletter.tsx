"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const t = useTranslations("newsletter");
  const locale = useLocale();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section ref={ref} className="relative overflow-hidden py-20"
      style={{ background: "linear-gradient(135deg, #0D1B40 0%, #1B3A8C 100%)" }}>
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="section-label mb-4">{t("label")}</p>
          <h2 className="font-display text-3xl md:text-4xl text-white font-semibold mb-4">{t("title")}</h2>
          <p className="text-white/55 mb-8">{t("subtitle")}</p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 text-white"
            >
              <CheckCircle className="h-6 w-6 text-gold-400" />
              <p className="text-lg">{t("successText")}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("placeholder")}
                required
                className="flex-1 px-5 py-3.5 bg-white/8 border border-white/15 rounded-sm text-white placeholder:text-white/35 focus:outline-none focus:border-gold-500/50 focus:bg-white/10 text-sm transition-all"
              />
              <button type="submit" disabled={status === "loading"} className="btn-primary whitespace-nowrap disabled:opacity-70">
                {status === "loading" ? t("subscribing") : (
                  <>{t("subscribe")} <ArrowRight className="h-4 w-4" /></>
                )}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-3 text-red-400 text-sm">{t("errorText")}</p>
          )}
          <p className="mt-4 text-white/25 text-xs">{t("disclaimer")}</p>
        </motion.div>
      </div>
    </section>
  );
}
