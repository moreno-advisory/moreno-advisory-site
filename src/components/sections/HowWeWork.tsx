"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";

export default function HowWeWork() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });
  const t = useTranslations("howWeWork");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section ref={ref} className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="section-label mb-4">{t("label")}</p>
          <h2 className="font-display text-display-md text-navy-950 font-semibold leading-tight">
            {t("title")}{" "}
            <span className="text-royal-DEFAULT">{t("titleHighlight")}</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="rounded-sm border border-gray-100 bg-white p-6"
            >
              <span className="font-display text-3xl font-semibold text-gold-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-base font-semibold text-navy-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
