"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { TrendingUp, Briefcase, Handshake, Globe, MapPin, BarChart3, Search, Users, ArrowRight } from "lucide-react";
import { getServices } from "@/lib/getLocaleData";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Briefcase, Handshake, Globe, MapPin, BarChart3, Search, Users,
};

export default function ServicesPageContent() {
  const t = useTranslations("services");
  const locale = useLocale();
  const lp = (path: string) => `/${locale}${path}`;
  const services = getServices(locale);

  return (
    <>
      <section className="relative min-h-[55vh] flex items-end pb-20 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #070E2B 0%, #0D1B40 50%, #1B3A8C 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="container-custom relative z-10 pt-40">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-gold-500" />
            <span className="section-label">{t("heroLabel")}</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-semibold leading-tight max-w-3xl">
            {t("heroTitle")}{" "}<span className="text-gradient-gold">{t("heroTitleHighlight")}</span>
          </h1>
          <p className="mt-6 text-white/60 text-xl max-w-2xl leading-relaxed">{t("heroSubtitle")}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || TrendingUp;
              return (
                <Link key={service.id} href={lp(`/services/${service.slug}`)}
                  className="group flex flex-col border border-gray-100 rounded-sm hover:border-navy-900 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                  <div className="p-8">
                    <div className="flex items-center justify-center w-14 h-14 rounded-sm bg-navy-50 text-navy-900 group-hover:bg-navy-900 group-hover:text-gold-400 transition-all duration-300 mb-6">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="font-display text-2xl font-semibold text-navy-950 mb-3">{service.title}</h2>
                    <p className="text-gray-500 leading-relaxed text-sm">{service.shortDescription}</p>
                  </div>
                  <div className="mt-auto px-8 pb-6 border-t border-gray-100 pt-5">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {service.benefits.slice(0, 2).map((b, i) => (
                          <span key={i} className="text-xs bg-navy-50 text-navy-700 px-2 py-0.5 rounded-sm">
                            {b.split(" ").slice(0, 3).join(" ")}...
                          </span>
                        ))}
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-gold-500 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-3" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-gray-50">
        <div className="container-custom text-center">
          <p className="section-label mb-4">{t("notSureLabel")}</p>
          <h2 className="font-display text-display-sm text-navy-950 font-semibold mb-4">{t("notSureTitle")}</h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-8">{t("notSureText")}</p>
          <Link href={lp("/contact")} className="btn-primary group inline-flex">
            {t("consultationCta")} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
