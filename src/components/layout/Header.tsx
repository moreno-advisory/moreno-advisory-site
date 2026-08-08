"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getServices } from "@/lib/getLocaleData";
import Logo from "@/components/ui/Logo";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");
  const services = getServices(locale);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const localePath = (path: string) => `/${locale}${path}`;

  const navigation = [
    { label: t("home"), href: localePath("/") },
    { label: t("about"), href: localePath("/about") },
    {
      label: t("services"),
      href: localePath("/services"),
      children: services.map((s) => ({
        label: s.title,
        href: localePath(`/services/${s.slug}`),
      })),
    },
    { label: t("industries"), href: localePath("/industries") },
    { label: t("insights"), href: localePath("/blog") },
    { label: t("contact"), href: localePath("/contact") },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsMobileOpen(false);
      setActiveDropdown(null);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isActive = (href: string) => {
    if (href === localePath("/")) return pathname === localePath("/");
    return pathname.startsWith(href);
  };

  const headerBg = isScrolled
    ? "bg-white/95 backdrop-blur-md shadow-navy-sm border-b border-gray-100"
    : "bg-transparent";

  const logoVariant = isScrolled ? "dark" : "light";
  const navTextColor = isScrolled ? "text-navy-900" : "text-white";
  const navHoverColor = isScrolled ? "hover:text-gold-500" : "hover:text-gold-400";

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500", headerBg)}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href={localePath("/")} className="flex-shrink-0 relative z-10">
            <Logo variant={logoVariant} className="h-12 lg:h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.children ? (
                  <button
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 rounded-sm",
                      navTextColor, navHoverColor,
                      isActive(item.href) && "text-gold-500"
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", activeDropdown === item.label && "rotate-180")} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 rounded-sm block animated-underline",
                      navTextColor, navHoverColor,
                      isActive(item.href) && "text-gold-500"
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                      className="absolute top-full left-0 mt-2 w-72 bg-white rounded-sm shadow-card-hover border border-gray-100 overflow-hidden"
                    >
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "flex items-center justify-between px-5 py-3 text-sm text-navy-800 hover:bg-gray-50 hover:text-gold-600 transition-all duration-150 group",
                              isActive(child.href) && "bg-navy-50 text-gold-500 font-medium"
                            )}
                          >
                            <span>{child.label}</span>
                            <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                          </Link>
                        ))}
                        <div className="px-5 pt-3 pb-3 border-t border-gray-100 mt-2">
                          <Link
                            href={localePath("/services")}
                            className="text-xs text-navy-600 hover:text-gold-500 font-medium transition-colors flex items-center gap-1"
                          >
                            {t("viewAllServices")} <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA + Lang + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher isScrolled={isScrolled} />

            <Link
              href={localePath("/contact")}
              className={cn(
                "hidden lg:inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold tracking-wide uppercase rounded-sm transition-all duration-300",
                isScrolled
                  ? "bg-navy-900 text-white hover:bg-gold-500 hover:text-navy-950"
                  : "bg-gold-500 text-navy-950 hover:bg-gold-400"
              )}
            >
              {t("getInTouch")}
            </Link>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={cn(
                "lg:hidden p-2 rounded-sm transition-colors duration-200",
                isScrolled ? "text-navy-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
              )}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden fixed inset-0 top-20 bg-navy-950 overflow-y-auto z-40"
          >
            <nav className="container-custom py-6 flex flex-col gap-1">
              <LanguageSwitcher mobile />
              {navigation.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  {item.children ? (
                    <MobileDropdown item={item} pathname={pathname} />
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-4 py-4 text-lg font-medium text-white/80 hover:text-gold-400 border-b border-white/5 transition-colors duration-200",
                        isActive(item.href) && "text-gold-400"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-6"
              >
                <Link href={localePath("/contact")} className="btn-primary w-full justify-center">
                  {t("getInTouch")}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileDropdown({
  item,
  pathname,
}: {
  item: { label: string; href: string; children?: { label: string; href: string }[] };
  pathname: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = pathname.startsWith(item.href);

  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between w-full px-4 py-4 text-lg font-medium transition-colors duration-200",
          isActive ? "text-gold-400" : "text-white/80 hover:text-gold-400"
        )}
      >
        <span>{item.label}</span>
        <ChevronDown className={cn("h-5 w-5 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && item.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-4">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 text-base text-white/60 hover:text-gold-400 transition-colors duration-200",
                    pathname === child.href && "text-gold-400 font-medium"
                  )}
                >
                  <span className="h-0.5 w-3 bg-gold-500/40 inline-block flex-shrink-0" />
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
