"use client";

import React from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  isScrolled?: boolean;
  mobile?: boolean;
}

export default function LanguageSwitcher({ isScrolled = false, mobile = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  if (mobile) {
    return (
      <div className="flex items-center gap-1 px-4 py-3 border-b border-white/5">
        <span className="text-white/40 text-xs uppercase tracking-wider mr-2">Language</span>
        {(["en", "pt"] as const).map((l) => (
          <button
            key={l}
            onClick={() => switchLocale(l)}
            className={cn(
              "px-3 py-1 text-sm font-semibold rounded-sm transition-all duration-200",
              locale === l
                ? "bg-gold-500 text-navy-950"
                : "text-white/50 hover:text-white/80"
            )}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-0.5 border border-white/15 rounded-sm overflow-hidden">
      {(["en", "pt"] as const).map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={cn(
            "px-2.5 py-1 text-xs font-bold tracking-wide transition-all duration-200",
            locale === l
              ? "bg-gold-500 text-navy-950"
              : isScrolled
              ? "text-navy-600 hover:text-navy-900 hover:bg-gray-100"
              : "text-white/60 hover:text-white hover:bg-white/10"
          )}
          aria-label={`Switch to ${l === "en" ? "English" : "Português"}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
