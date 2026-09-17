"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Linkedin, Mail, Phone, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { SITE_CONFIG } from "@/lib/constants";
import { getServices } from "@/lib/getLocaleData";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("footer");
  const locale = useLocale();
  const allServices = getServices(locale);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const lp = (path: string) => `/${locale}${path}`;
  const address = locale === "pt" ? SITE_CONFIG.address.pt : SITE_CONFIG.address.en;

  const companyLinks = [
    { label: t("company.0.label"), href: lp("/about") },
    { label: t("company.1.label"), href: lp("/services") },
    { label: t("company.2.label"), href: lp("/industries") },
    { label: t("company.3.label"), href: lp("/blog") },
    { label: t("company.4.label"), href: lp("/contact") },
  ];

  const legalLinks = [
    { label: t("legal.privacy"), href: "/privacy-policy" },
    { label: t("legal.terms"), href: lp("/terms") },
    { label: t("legal.cookies"), href: lp("/cookies") },
  ];

  async function handleNewsletterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail, locale }),
      });

      if (!response.ok) {
        setNewsletterStatus("error");
        return;
      }

      setNewsletterStatus("success");
      setNewsletterEmail("");
    } catch {
      setNewsletterStatus("error");
    }
  }

  return (
    <footer className="bg-navy-950 text-white">
      {/* CTA Band */}
      <div className="border-t border-white/5 bg-gradient-to-r from-navy-950 via-royal-dark to-navy-950">
        <div className="container-custom py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <p className="section-label mb-3">{t("ctaLabel")}</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white">
                {t("ctaTitle")}{" "}
                <span className="text-gradient-gold">{t("ctaTitleHighlight")}</span>
              </h2>
              <p className="mt-3 text-white/60 text-lg max-w-xl">{t("ctaText")}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={lp("/contact")} className="btn-primary whitespace-nowrap">{t("ctaButton")}</Link>
              <Link href={lp("/services")} className="btn-secondary whitespace-nowrap">{t("servicesButton")}</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-white/8">
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href={lp("/")}>
                <Logo variant="light" className="h-12 w-auto mb-6" />
              </Link>
              <p className="text-white/55 text-sm leading-relaxed max-w-sm mb-8">
                {SITE_CONFIG.description.slice(0, 180)}...
              </p>

              <div className="space-y-3">
                <a href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 text-white/55 hover:text-gold-400 transition-colors text-sm group">
                  <Mail className="h-4 w-4 text-gold-500/70 group-hover:text-gold-400 flex-shrink-0" />
                  {SITE_CONFIG.email}
                </a>
                <a href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-3 text-white/55 hover:text-gold-400 transition-colors text-sm group">
                  <Phone className="h-4 w-4 text-gold-500/70 group-hover:text-gold-400 flex-shrink-0" />
                  {SITE_CONFIG.phone}
                </a>
                <div className="flex items-start gap-3 text-white/55 text-sm">
                  <MapPin className="h-4 w-4 text-gold-500/70 flex-shrink-0 mt-0.5" />
                  <span>{address}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-sm bg-white/5 hover:bg-gold-500 hover:text-navy-950 text-white/60 transition-all duration-300"
                  aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href={`mailto:${SITE_CONFIG.email}`}
                  className="p-2.5 rounded-sm bg-white/5 hover:bg-gold-500 hover:text-navy-950 text-white/60 transition-all duration-300"
                  aria-label="Email">
                  <Mail className="h-4 w-4" />
                </a>
                <a href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-sm bg-white/5 hover:bg-gold-500 hover:text-navy-950 text-white/60 transition-all duration-300"
                  aria-label="WhatsApp">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
                <span className="h-0.5 w-4 bg-gold-500 inline-block" />{t("servicesTitle")}
              </h4>
              <ul className="space-y-3">
                {allServices.map((service) => (
                  <li key={service.slug}>
                    <Link href={lp(`/services/${service.slug}`)}
                      className="text-white/50 hover:text-gold-400 text-sm transition-colors duration-200 flex items-center gap-2 group">
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-gold-500" />
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
                <span className="h-0.5 w-4 bg-gold-500 inline-block" />{t("companyTitle")}
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}
                      className="text-white/50 hover:text-gold-400 text-sm transition-colors duration-200 flex items-center gap-2 group">
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-gold-500" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
                <span className="h-0.5 w-4 bg-gold-500 inline-block" />{t("newsletterTitle")}
              </h4>
              <p className="text-white/50 text-sm mb-4 leading-relaxed">{t("newsletterText")}</p>
              {newsletterStatus === "success" ? (
                <div className="flex items-center gap-2 rounded-sm border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-white">
                  <CheckCircle className="h-4 w-4 text-gold-400" />
                  <span>{t("newsletterDisclaimer")}</span>
                </div>
              ) : (
                <form className="flex flex-col gap-3" onSubmit={handleNewsletterSubmit}>
                  <input
                    type="email"
                    placeholder="email@empresa.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-sm text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 focus:bg-white/8 transition-all duration-200"
                    required
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === "loading"}
                    className="px-4 py-2.5 bg-gold-500 hover:bg-gold-400 text-navy-950 text-sm font-semibold rounded-sm transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {newsletterStatus === "loading" ? t("newsletterButton") : t("newsletterButton")} <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
              {newsletterStatus === "error" && (
                <p className="mt-3 text-xs text-red-300">Newsletter subscription failed. Please try again.</p>
              )}
              <p className="text-white/25 text-xs mt-3">{t("newsletterDisclaimer")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/35 text-xs">
              © {currentYear} Moreno Advisory. {t("copyright")}
            </p>
            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className="text-white/35 hover:text-white/60 text-xs transition-colors duration-200">
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-white/20 text-xs">{t("tagline")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
