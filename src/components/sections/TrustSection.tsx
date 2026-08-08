"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";

export default function TrustSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const t = useTranslations("trust");
  const items = t.raw("items") as string[];

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="section-label mb-4">{t("label")}</p>
          <h2 className="font-display text-display-md text-navy-950 font-semibold">{t("title")}</h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="rounded-sm border border-gray-100 bg-gray-50 p-6"
            >
              <CheckCircle2 className="h-6 w-6 text-gold-500" />
              <p className="mt-5 text-sm leading-relaxed text-navy-800">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
