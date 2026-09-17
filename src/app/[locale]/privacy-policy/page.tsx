import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Moreno Advisory",
  description:
    "Privacy Policy for Moreno Advisory, including information about website usage, personal data, digital services and authorized LinkedIn integrations.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/privacy-policy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sections = [
  {
    title: "Introduction",
    paragraphs: [
      "Moreno Advisory respects the privacy of visitors, clients, business contacts and users who interact with our website, communications and authorized digital integrations.",
      "This Privacy Policy explains how personal information may be collected, used, stored and protected when individuals interact with Moreno Advisory through our website and authorized digital services.",
    ],
  },
  {
    title: "Information We May Collect",
    paragraphs: [
      "We may collect information voluntarily provided by users, including name, email address, company, job title, telephone number and information submitted through contact forms or direct communications.",
      "We may also collect limited technical information associated with website usage, such as browser type, device information, IP address and website interaction data, where applicable.",
    ],
  },
  {
    title: "How We Use Information",
    paragraphs: ["Information may be used to:"],
    items: [
      "respond to inquiries and business communications;",
      "provide requested information or services;",
      "maintain professional and commercial relationships;",
      "improve our website, communications and services;",
      "perform legitimate administrative and operational activities;",
      "comply with applicable legal and regulatory obligations.",
    ],
  },
  {
    title: "LinkedIn Integration",
    paragraphs: [
      "Moreno Advisory may use authorized LinkedIn APIs and integrations to manage its own LinkedIn presence.",
      "These integrations may be used to:",
    ],
    items: [
      "publish and manage Moreno Advisory content;",
      "manage authorized social interactions;",
      "review comments and reactions;",
      "access Page and content performance analytics;",
      "support internal editorial planning;",
      "administer Moreno Advisory's LinkedIn Company Page.",
    ],
    closing: [
      "Information obtained through LinkedIn APIs will only be used for authorized social media management and related internal operations.",
      "LinkedIn data obtained through these integrations will not be sold, used for unauthorized prospecting, used to build advertising audiences, resold as data, or used for unauthorized profile or CRM enrichment.",
      "Use of LinkedIn data is also subject to LinkedIn's applicable API terms, platform policies and user authorization requirements.",
    ],
  },
  {
    title: "Data Sharing",
    paragraphs: [
      "Moreno Advisory does not sell personal information.",
      "Information may be shared with service providers or technology platforms only when reasonably necessary to operate our website, communications, business systems or authorized integrations, subject to applicable contractual and legal protections.",
    ],
  },
  {
    title: "Data Retention",
    paragraphs: [
      "Personal information is retained only for as long as reasonably necessary for the purposes described in this Privacy Policy, contractual requirements, legitimate business purposes or applicable legal obligations.",
    ],
  },
  {
    title: "Data Security",
    paragraphs: [
      "Moreno Advisory applies reasonable administrative and technical measures intended to protect information against unauthorized access, disclosure, alteration or loss.",
    ],
  },
  {
    title: "International Services",
    paragraphs: [
      "Because Moreno Advisory works with international clients, partners and technology providers, information may in some circumstances be processed using systems or service providers located in different countries, subject to applicable data protection requirements.",
    ],
  },
  {
    title: "Your Rights",
    paragraphs: [
      "Depending on applicable law, individuals may have rights concerning their personal data, including requesting access, correction, updating or deletion of information held by Moreno Advisory.",
      "Requests may be submitted using the contact information below.",
    ],
  },
  {
    title: "Third-Party Services",
    paragraphs: [
      "Our website and digital operations may use third-party platforms and services.",
      "Their handling of information may be governed by their own privacy policies and terms.",
    ],
  },
  {
    title: "Updates to This Policy",
    paragraphs: [
      "Moreno Advisory may update this Privacy Policy when necessary to reflect changes in our operations, technologies, legal requirements or digital integrations.",
      "The current version will remain available at:",
    ],
    link: "https://morenoadvisory.com/privacy-policy",
  },
  {
    title: "Contact",
    paragraphs: ["For privacy-related requests, please contact Moreno Advisory at:"],
    email: SITE_CONFIG.email,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="hero-bg pt-36 pb-20 lg:pt-44 lg:pb-28">
        <div className="container-custom">
          <p className="section-label mb-4">Moreno Advisory</p>
          <h1 className="font-display text-5xl font-semibold text-white md:text-6xl">Privacy Policy</h1>
        </div>
      </section>

      <main className="container-custom max-w-4xl section-padding-sm">
        <div className="space-y-10 text-navy-800">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-3xl font-semibold text-navy-950">{section.title}</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-navy-700">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.items && (
                  <ul className="list-disc space-y-2 pl-6">
                    {section.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
                {section.closing?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.link && <p><a className="text-navy-900 underline decoration-gold-500 underline-offset-4" href={section.link}>{section.link}</a></p>}
                {section.email && <p><a className="text-navy-900 underline decoration-gold-500 underline-offset-4" href={`mailto:${section.email}`}>{section.email}</a></p>}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-14 border-t border-gray-200 pt-6 text-sm text-navy-600">Last updated: September 17, 2026</p>
      </main>
    </>
  );
}
