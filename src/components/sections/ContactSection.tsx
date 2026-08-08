"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";
import { getServices } from "@/lib/getLocaleData";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(20),
  honeypot: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const t = useTranslations("contact");
  const locale = useLocale();
  const services = getServices(locale);
  const address = locale === "pt" ? SITE_CONFIG.address.pt : SITE_CONFIG.address.en;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (data.honeypot) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (res.ok) { setStatus("success"); reset(); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const inputCls = (err: boolean) => cn(
    "w-full px-4 py-3 border rounded-sm text-sm bg-gray-50 focus:bg-white transition-colors focus:outline-none focus:ring-1",
    err ? "border-red-300 focus:ring-red-300" : "border-gray-200 focus:border-navy-400 focus:ring-navy-400"
  );

  return (
    <section ref={ref} className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-4">{t("heroLabel")}</p>
          <h2 className="font-display text-display-md text-navy-950 font-semibold">
            {t("heroTitle")}{" "}<span className="text-royal-DEFAULT">{t("heroTitleHighlight")}</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">{t("heroSubtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="bg-navy-950 rounded-sm p-8 flex flex-col gap-6 h-full">
              <div>
                <p className="section-label mb-3">{t("heroLabel")}</p>
                <h3 className="font-display text-2xl text-white font-semibold">
                  {t("formSubtitle")}
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: t("email"), value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
                  { icon: Phone, label: t("phone"), value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
                  { icon: MapPin, label: locale === "pt" ? "Localização" : "Location", value: address, href: null },
                  { icon: Linkedin, label: "LinkedIn", value: "Moreno Advisory", href: SITE_CONFIG.linkedin },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 group">
                    <div className="p-2.5 rounded-sm bg-white/5 group-hover:bg-gold-500/20 transition-colors flex-shrink-0">
                      <Icon className="h-4 w-4 text-gold-400" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="text-white/80 text-sm hover:text-gold-400 transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-white/80 text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-6 border-t border-white/8">
                <p className="text-white/30 text-xs leading-relaxed">{t("privacy")}</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-sm border border-gray-100 p-8 shadow-card">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-navy-950 mb-2">{t("successTitle")}</h3>
                  <p className="text-gray-500 max-w-sm">{t("successText")}</p>
                  <button onClick={() => setStatus("idle")} className="mt-6 text-sm text-navy-600 hover:text-gold-500 transition-colors">
                    {t("sendAnother")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <input {...register("honeypot")} type="text" className="hidden" tabIndex={-1} />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-navy-700 uppercase tracking-wider mb-2">{t("firstName")} *</label>
                      <input {...register("firstName")} placeholder="Carlos" className={inputCls(!!errors.firstName)} />
                      {errors.firstName && <p className="mt-1 text-red-500 text-xs">{t("required")}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy-700 uppercase tracking-wider mb-2">{t("lastName")} *</label>
                      <input {...register("lastName")} placeholder="Moreno" className={inputCls(!!errors.lastName)} />
                      {errors.lastName && <p className="mt-1 text-red-500 text-xs">{t("required")}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-navy-700 uppercase tracking-wider mb-2">{t("email")} *</label>
                      <input {...register("email")} type="email" placeholder="email@empresa.com" className={inputCls(!!errors.email)} />
                      {errors.email && <p className="mt-1 text-red-500 text-xs">{t("required")}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy-700 uppercase tracking-wider mb-2">{t("phone")}</label>
                      <input {...register("phone")} type="tel" placeholder="+55 11 9 0000-0000" className={inputCls(false)} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-navy-700 uppercase tracking-wider mb-2">{t("company")}</label>
                      <input {...register("company")} placeholder={locale === "pt" ? "Empresa" : "Company"} className={inputCls(false)} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy-700 uppercase tracking-wider mb-2">{t("service")}</label>
                      <select {...register("service")} className={cn(inputCls(false), "text-gray-600")}>
                        <option value="">{t("selectService")}</option>
                        {services.map((s) => (
                          <option key={s.slug} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-700 uppercase tracking-wider mb-2">{t("message")} *</label>
                    <textarea {...register("message")} rows={4} placeholder={t("messagePlaceholder")}
                      className={cn(inputCls(!!errors.message), "resize-none")} />
                    {errors.message && (
                      <p className="mt-1 text-red-500 text-xs">
                        {errors.message.type === "too_small" ? t("messageTooShort") : t("required")}
                      </p>
                    )}
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-sm px-4 py-3 text-sm">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />{t("errorText")}
                    </div>
                  )}

                  <button type="submit" disabled={status === "loading"}
                    className="w-full btn-primary justify-center disabled:opacity-70">
                    {status === "loading" ? (
                      <><span className="animate-spin h-4 w-4 border-2 border-navy-900 border-t-transparent rounded-full" /> {t("sending")}</>
                    ) : (
                      <>{t("submit")} <Send className="h-4 w-4" /></>
                    )}
                  </button>

                  <p className="text-gray-400 text-xs text-center">{t("privacy")}</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
