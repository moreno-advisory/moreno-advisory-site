import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ServicesOverview from "@/components/sections/ServicesOverview";
import HowWeWork from "@/components/sections/HowWeWork";
import WhoWeHelp from "@/components/sections/WhoWeHelp";
import AboutPreview from "@/components/sections/AboutPreview";
import WorldPresence from "@/components/sections/WorldPresence";
import TrustSection from "@/components/sections/TrustSection";
import ContactSection from "@/components/sections/ContactSection";
import Newsletter from "@/components/sections/Newsletter";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "pt"
    ? "Moreno Advisory | Prospecção B2B e LinkedIn Outreach"
    : "Moreno Advisory | B2B Lead Generation & LinkedIn Outreach";
  const description = locale === "pt"
    ? "Advisory B2B founder-led que ajuda empresas a criar oportunidades qualificadas por meio de prospecção estratégica, LinkedIn outreach, mapeamento de decisores e parcerias estratégicas."
    : "Founder-led B2B advisory helping companies build qualified opportunities through LinkedIn outreach, prospect research, decision-maker mapping, and strategic partnerships.";

  return {
    title,
    description,
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <HowWeWork />
      <WhoWeHelp />
      <AboutPreview />
      <WorldPresence />
      <TrustSection />
      <ContactSection />
      <Newsletter />
    </>
  );
}
