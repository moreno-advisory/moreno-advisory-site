"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight, CheckCircle2,
  TrendingUp, Briefcase, Handshake, Globe, MapPin,
  BarChart3, Search, Users
} from "lucide-react";
import { getServiceBySlug, getServices } from "@/lib/getLocaleData";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Briefcase, Handshake, Globe, MapPin, BarChart3, Search, Users,
};

interface ServiceDetailProps {
  slug: string;
}

export default function ServiceDetail({ slug }: ServiceDetailProps) {
  const locale = useLocale();
  const t = useTranslations("services");
  const service = getServiceBySlug(slug, locale);
  const { ref: contentRef, inView: contentInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: processRef, inView: processInView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const { ref: relatedRef, inView: relatedInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const lp = (path: string) => `/${locale}${path}`;

  if (!service) return null;

  const Icon = iconMap[service.icon] || TrendingUp;
  const allServices = getServices(locale);
  const relatedServices = allServices.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #070E2B 0%, #0D1B40 50%, #1B3A8C 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="container-custom relative z-10 pt-40">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <nav className="flex items-center gap-2 text-white/40 text-sm mb-6">
              <Link href={lp("/")} className="hover:text-white/70 transition-colors">{locale === "pt" ? "Início" : "Home"}</Link>
              <span>/</span>
              <Link href={lp("/services")} className="hover:text-white/70 transition-colors">{locale === "pt" ? "Serviços" : "Services"}</Link>
              <span>/</span>
              <span className="text-white/70">{service.title}</span>
            </nav>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gold-500" />
              <span className="section-label">{t("advisoryService")}</span>
            </div>
            <div className="flex items-start gap-6 max-w-3xl">
              <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-sm bg-gold-500/20 text-gold-400">
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-semibold leading-tight">{service.title}</h1>
                <p className="mt-4 text-white/60 text-xl leading-relaxed">{service.shortDescription}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description + Benefits */}
      <section ref={contentRef} className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={contentInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="lg:col-span-3">
              <p className="section-label mb-4">{t("overview")}</p>
              <h2 className="font-display text-display-sm text-navy-950 font-semibold mb-6">{t("whatDelivers")}</h2>
              <p className="text-gray-500 text-lg leading-relaxed">{service.description}</p>
              <div className="mt-10 flex gap-4">
                <Link href={lp("/contact")} className="btn-primary group">
                  {t("discussNeeds")} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} animate={contentInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-2">
              <div className="bg-gray-50 rounded-sm border border-gray-100 p-8">
                <p className="section-label mb-5">{t("keyBenefits")}</p>
                <ul className="space-y-4">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section ref={processRef} className="section-padding bg-navy-950">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
            <p className="section-label mb-4">{t("ourApproach")}</p>
            <h2 className="font-display text-display-md text-white font-semibold">{t("howWeWork")}</h2>
            <p className="mt-4 text-white/50 max-w-xl mx-auto">{t("processSubtitle")}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, idx) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 24 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: idx * 0.1 }} className="relative">
                <div className="bg-white/5 hover:bg-white/8 rounded-sm p-6 h-full transition-colors duration-200 border border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-4xl font-bold text-white/10">{String(step.step).padStart(2, "0")}</span>
                    <div className="h-0.5 w-6 bg-gold-500/50" />
                  </div>
                  <h3 className="font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
                </div>
                {idx < service.process.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ArrowRight className="h-4 w-4 text-gold-500/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section ref={relatedRef} className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={relatedInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-12">
            <p className="section-label mb-4">{t("exploreMore")}</p>
            <h2 className="font-display text-display-sm text-navy-950 font-semibold">{t("relatedServices")}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((related, idx) => {
              const RelatedIcon = iconMap[related.icon] || TrendingUp;
              return (
                <motion.div key={related.id} initial={{ opacity: 0, y: 20 }} animate={relatedInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: idx * 0.08 }}>
                  <Link href={lp(`/services/${related.slug}`)}
                    className={cn("group flex flex-col p-6 bg-white rounded-sm border border-gray-100 hover:border-navy-900 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1")}>
                    <div className="flex items-center justify-center w-10 h-10 rounded-sm bg-navy-50 text-navy-800 group-hover:bg-navy-900 group-hover:text-gold-400 transition-all duration-300 mb-4">
                      <RelatedIcon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-navy-900 mb-2">{related.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">{related.shortDescription}</p>
                    <div className="mt-4 flex items-center gap-1 text-gold-500 text-xs font-semibold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {t("learnMore")} <ArrowRight className="h-3 w-3" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link href={lp("/services")} className="btn-outline group inline-flex">
              {t("relatedServicesAll")} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm bg-white">
        <div className="container-custom">
          <div className="bg-navy-950 rounded-sm p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 30% 70%, #1B3A8C 0%, transparent 60%)" }} />
            <div className="relative z-10">
              <p className="section-label mb-4">{locale === "pt" ? "Pronto para Começar?" : "Ready to Begin?"}</p>
              <h2 className="font-display text-3xl md:text-4xl text-white font-semibold mb-4">
                {t("ctaTitle")} {service.title} {t("ctaTitleSuffix")}
              </h2>
              <p className="text-white/50 max-w-xl mx-auto mb-8">{t("ctaText")}</p>
              <Link href={lp("/contact")} className="btn-primary group inline-flex">
                {t("ctaButton")} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
