"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLocale, useTranslations } from "next-intl";
import { MapPin } from "lucide-react";

const regions = [
  { name: "Based in Brazil", namePt: "Base no Brasil", text: "Mairinque, São Paulo, Brazil, with local context and practical B2B relationship-building.", textPt: "Mairinque, SP, Brasil, com contexto local e construção prática de relacionamentos B2B.", color: "#C9A84C" },
  { name: "Selected Markets", namePt: "Mercados Selecionados", text: "Commercial perspective for companies exploring new market conversations.", textPt: "Perspectiva comercial para empresas explorando conversas em novos mercados.", color: "#2462C2" },
  { name: "International B2B", namePt: "B2B Internacional", text: "Outreach shaped with context, clarity, and cultural awareness.", textPt: "Outreach com contexto, clareza e sensibilidade cultural.", color: "#1B3A8C" },
];

export default function WorldPresence() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const t = useTranslations("worldPresence");
  const locale = useLocale();

  return (
    <section ref={ref} className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">{t("label")}</p>
          <h2 className="font-display text-display-md text-navy-950 font-semibold">
            {t("title")}
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {regions.map((region, idx) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + idx * 0.07 }}
              className="bg-white rounded-sm border border-gray-100 p-6 hover:shadow-card transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4" style={{ color: region.color }} />
                <p className="text-navy-900 font-semibold text-sm">
                  {locale === "pt" ? region.namePt : region.name}
                </p>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                {locale === "pt" ? region.textPt : region.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
