"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  TrendingUp, Briefcase, Handshake, Globe, MapPin,
  BarChart3, Search, Users, ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getServices } from "@/lib/getLocaleData";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Briefcase, Handshake, Globe, MapPin, BarChart3, Search, Users,
};

export default function ServicesOverview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const t = useTranslations("services");
  const locale = useLocale();
  const lp = (path: string) => `/${locale}${path}`;
  const services = getServices(locale).slice(0, 3);

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="section-label mb-4">{t("sectionLabel")}</p>
          <h2 className="font-display text-display-md text-navy-950 font-semibold leading-tight">
            {t("title")}{" "}
            <span className="text-royal-DEFAULT">{t("titleHighlight")}</span>
          </h2>
          <p className="mt-6 text-gray-500 text-lg leading-relaxed">{t("subtitle")}</p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon] || TrendingUp;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
              >
                <Link
                  href={lp(`/services/${service.slug}`)}
                  className={cn(
                    "group flex flex-col p-6 rounded-sm border border-gray-100 bg-white",
                    "hover:border-navy-900 hover:shadow-card-hover transition-all duration-300 h-full hover:-translate-y-1"
                  )}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-sm bg-navy-50 text-navy-900 group-hover:bg-navy-900 group-hover:text-gold-400 transition-all duration-300 mb-5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-navy-900 text-base leading-snug mb-3">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{service.shortDescription}</p>
                  <div className="mt-4 flex items-center gap-1 text-gold-500 text-xs font-semibold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {t("learnMore")} <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link href={lp("/services")} className="btn-outline group inline-flex">
            {t("exploreAll")} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
