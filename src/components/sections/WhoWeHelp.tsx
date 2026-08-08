"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";

export default function WhoWeHelp() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });
  const t = useTranslations("whoWeHelp");
  const items = t.raw("items") as string[];

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="section-label mb-4">{t("label")}</p>
            <h2 className="font-display text-display-md text-navy-950 font-semibold leading-tight">
              {t("title")}{" "}
              <span className="text-royal-DEFAULT">{t("titleHighlight")}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-start gap-3 rounded-sm border border-gray-100 bg-gray-50 p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-500" />
                <p className="text-sm leading-relaxed text-navy-800">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
