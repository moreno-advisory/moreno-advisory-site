"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send, CheckCircle, AlertCircle, Mail, Phone,
  MapPin, Linkedin, MessageCircle, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";
import { getServices } from "@/lib/getLocaleData";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(20),
  honeypot: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactPageContent() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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

  const faqItems = locale === "pt" ? [
    { q: "Com que rapidez vocês respondem às consultas?", a: "Respondemos a todas as consultas em até 24 horas úteis. Para assuntos urgentes, entre em contato diretamente via WhatsApp." },
    { q: "Vocês trabalham com startups?", a: "Com certeza. Temos uma prática dedicada para startups de alto crescimento, com serviços específicos para empresas em estágios mais iniciais." },
    { q: "Quais regiões vocês cobrem?", a: "A Moreno Advisory está baseada em Mairinque, SP, Brasil, e atua com uma perspectiva prática para empresas explorando novos mercados B2B." },
    { q: "Como os engajamentos são precificados?", a: "Nossa precificação é adaptada ao escopo e à complexidade de cada engajamento. Oferecemos modelos por projeto, retainer e vinculados ao desempenho." },
  ] : [
    { q: "How quickly do you respond to inquiries?", a: "We respond to all inquiries within 24 business hours. For urgent matters, you can reach us directly via WhatsApp." },
    { q: "Do you work with startups?", a: "Absolutely. We have a dedicated practice for high-growth startups with services designed for earlier-stage companies." },
    { q: "What regions do you cover?", a: "Moreno Advisory is based in Mairinque, São Paulo, Brazil, with a practical perspective for companies exploring new B2B markets." },
    { q: "How are engagements priced?", a: "Our pricing is tailored to each engagement's scope and complexity. We offer project-based, retainer, and performance-linked models." },
  ];

  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[50vh] flex items-end pb-16 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #070E2B 0%, #0D1B40 50%, #1B3A8C 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="container-custom relative z-10 pt-36">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gold-500" />
              <span className="section-label">{t("heroLabel")}</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-white font-semibold leading-tight max-w-2xl">
              {t("heroTitle")}{" "}<span className="text-gradient-gold">{t("heroTitleHighlight")}</span>
            </h1>
            <p className="mt-5 text-white/60 text-xl max-w-xl">{t("heroSubtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={ref} className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Sidebar */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="space-y-5">
              {[
                { icon: Mail, label: t("email"), value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}`, action: "→" },
                { icon: Phone, label: t("phone"), value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}`, action: "→" },
                { icon: MessageCircle, label: "WhatsApp", value: locale === "pt" ? "Fale conosco" : "Chat with us", href: `https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}`, action: "→" },
                { icon: Linkedin, label: "LinkedIn", value: "Moreno Advisory", href: SITE_CONFIG.linkedin, action: "→" },
                { icon: MapPin, label: locale === "pt" ? "Localização" : "Location", value: address, href: null, action: null },
              ].map(({ icon: Icon, label, value, href, action }) => (
                <div key={label} className="bg-gray-50 rounded-sm border border-gray-100 p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-sm bg-navy-950 text-gold-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-xs font-semibold text-navy-600 uppercase tracking-widest">{label}</p>
                  </div>
                  <p className="text-navy-800 font-medium text-sm mt-1">{value}</p>
                  {href && action && (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-gold-500 text-xs mt-2 hover:text-gold-600 font-medium transition-colors">
                      {locale === "pt" ? "Acessar" : "Access"} {action}
                    </a>
                  )}
                </div>
              ))}

              <div className="bg-navy-950 rounded-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-gold-400" />
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">{t("businessHours")}</p>
                </div>
                <p className="text-white/80 text-sm">{t("businessHoursValue")}</p>
                <p className="text-gold-400 text-sm font-medium">{t("businessHoursTime")}</p>
                <p className="text-white/40 text-xs mt-2">{t("businessHoursNote")}</p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-2">
              <div className="bg-white rounded-sm border border-gray-100 shadow-card p-8">
                <h2 className="font-display text-2xl font-semibold text-navy-950 mb-2">{t("formTitle")}</h2>
                <p className="text-gray-500 text-sm mb-8">{t("formSubtitle")}</p>

                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center text-center py-16">
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-5">
                      <CheckCircle className="h-10 w-10 text-green-500" />
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
                        <label className="block text-xs font-semibold text-navy-700 uppercase tracking-wider mb-2">{t("country")}</label>
                        <input {...register("country")} placeholder={locale === "pt" ? "País" : "Country"} className={inputCls(false)} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-700 uppercase tracking-wider mb-2">{t("service")}</label>
                      <select {...register("service")} className={cn(inputCls(false), "text-gray-600")}>
                        <option value="">{t("selectService")}</option>
                        {services.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-700 uppercase tracking-wider mb-2">{t("message")} *</label>
                      <textarea {...register("message")} rows={5} placeholder={t("messagePlaceholder")}
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

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <p className="section-label mb-4">{t("faqLabel")}</p>
            <h2 className="font-display text-display-sm text-navy-950 font-semibold">{t("faqTitle")}</h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-sm border border-gray-100 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left">
                  <span className="font-semibold text-navy-900 text-sm">{faq.q}</span>
                  <span className={cn("text-gold-500 text-lg transition-transform duration-200", openFaq === idx && "rotate-45")}>+</span>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50">
                    <p className="pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
