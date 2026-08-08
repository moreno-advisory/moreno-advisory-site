import type { Service, Industry, Stat } from "@/types";
import { SERVICES, INDUSTRIES, STATS, VALUES } from "./constants";
import { SERVICES_PT, INDUSTRIES_PT, STATS_PT, VALUES_PT } from "./constants.pt";

export function getServices(locale: string): Service[] {
  return locale === "pt" ? SERVICES_PT : SERVICES;
}

export function getIndustries(locale: string): Industry[] {
  return locale === "pt" ? INDUSTRIES_PT : INDUSTRIES;
}

export function getStats(locale: string): Stat[] {
  return (locale === "pt" ? STATS_PT : STATS) as Stat[];
}

export function getValues(locale: string): typeof VALUES {
  return locale === "pt" ? (VALUES_PT as typeof VALUES) : VALUES;
}

export function getServiceBySlug(slug: string, locale: string): Service | null {
  return getServices(locale).find((s) => s.slug === slug) ?? null;
}
