import type { Service, Industry, Stat, NavItem } from "@/types";

export const SITE_CONFIG = {
  name: "Moreno Advisory",
  tagline: "Founder-led B2B Advisory",
  slogan: "Qualified conversations. Human outreach. Practical business development.",
  description:
    "Founder-led B2B advisory helping companies build qualified opportunities through LinkedIn outreach, prospect research, decision-maker mapping, and strategic partnerships.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://morenoadvisory.com",
  email: "cemoreno@morenoadvisory.com",
  phone: "+55 11 9 1068-5040",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511910685040",
  linkedin: "https://www.linkedin.com/company/moreno-advisory",
  address: {
    en: "Mairinque, São Paulo, Brazil",
    pt: "Mairinque, SP, Brasil",
    city: "Mairinque",
    region: "São Paulo",
    country: "BR",
  },
} as const;

export const NAVIGATION: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Business Development", href: "/services/business-development" },
      { label: "Executive Business Partnership", href: "/services/executive-business-partnership" },
      { label: "Strategic Partnerships", href: "/services/strategic-partnerships" },
      { label: "Global Lead Generation", href: "/services/global-lead-generation" },
      { label: "International Expansion", href: "/services/international-expansion" },
      { label: "Business Consulting", href: "/services/business-consulting" },
      { label: "Commercial Intelligence", href: "/services/commercial-intelligence" },
      { label: "International Representation", href: "/services/international-representation" },
    ],
  },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const STATS: Stat[] = [
  { value: "7", suffix: "+", label: "Years in Sales & BD" },
  { value: "3", suffix: "", label: "Core Outreach Pillars" },
];

export const SERVICES: Service[] = [
  {
    id: "business-development",
    title: "B2B Lead Generation",
    slug: "business-development",
    shortDescription: "Targeted prospect research and decision-maker mapping based on your ICP, market, and business goals.",
    description:
      "This service helps B2B companies understand who they should approach, which accounts fit their market, and how to organize qualified prospect lists for outreach.",
    icon: "TrendingUp",
    benefits: [
      "Prospect research based on your ICP",
      "Decision-maker mapping for target accounts",
      "Cleaner lists before outreach begins",
      "Commercial context for new market conversations",
      "Practical organization of opportunities",
    ],
    process: [
      { step: 1, title: "ICP Review", description: "Review your offer, audience, market, and business goals." },
      { step: 2, title: "Target Mapping", description: "Identify companies and decision-makers that match your criteria." },
      { step: 3, title: "Lead Organization", description: "Structure lead information so outreach can be clear and focused." },
      { step: 4, title: "Opportunity Review", description: "Review responses and refine the target direction as needed." },
    ],
    metaTitle: "B2B Lead Generation | Moreno Advisory",
    metaDescription: "Targeted B2B lead generation, prospect research, and decision-maker mapping for companies entering new markets.",
  },
  {
    id: "executive-business-partnership",
    title: "LinkedIn Outreach",
    slug: "executive-business-partnership",
    shortDescription: "Human, personalized outreach designed to start qualified conversations with the right people.",
    description:
      "LinkedIn outreach support focused on relevant decision-makers, personalized messaging, and follow-up that feels human rather than automated.",
    icon: "Briefcase",
    benefits: [
      "Personalized LinkedIn outreach messages",
      "Follow-up sequences written with context",
      "Human tone for first conversations",
      "Clear tracking of responses",
      "Support turning interest into next steps",
    ],
    process: [
      { step: 1, title: "Message Direction", description: "Clarify offer, audience, and positioning before outreach begins." },
      { step: 2, title: "Outreach Writing", description: "Create personalized LinkedIn messages and follow-ups." },
      { step: 3, title: "Conversation Tracking", description: "Organize replies, interest, objections, and next steps." },
      { step: 4, title: "Iteration", description: "Adjust messaging based on real market responses." },
    ],
    metaTitle: "LinkedIn Outreach | Moreno Advisory",
    metaDescription: "Human LinkedIn outreach for B2B companies that need qualified conversations with the right decision-makers.",
  },
  {
    id: "strategic-partnerships",
    title: "Strategic Partnerships",
    slug: "strategic-partnerships",
    shortDescription: "Identifying and opening conversations with potential partners, agencies, distributors, referral channels, or expansion opportunities.",
    description:
      "This service helps companies map potential partnership paths and open clear conversations with organizations that may become partners, agencies, distributors, referral channels, or expansion allies.",
    icon: "Handshake",
    benefits: [
      "Partner and channel mapping",
      "Clear criteria for potential fit",
      "Personalized first conversations",
      "Support organizing partner responses",
      "Practical next-step recommendations",
    ],
    process: [
      { step: 1, title: "Partner Criteria", description: "Define the types of partners and channels that make sense for your goals." },
      { step: 2, title: "Market Mapping", description: "Identify organizations that match the partnership criteria." },
      { step: 3, title: "Outreach", description: "Open human, contextual conversations with potential partners." },
      { step: 4, title: "Pipeline Review", description: "Organize replies, qualify fit, and clarify next steps." },
    ],
    metaTitle: "Strategic Partnerships | Moreno Advisory",
    metaDescription: "Map and open strategic B2B partnership conversations with agencies, distributors, referral channels, and expansion partners.",
  },
  {
    id: "global-lead-generation",
    title: "Global Lead Generation",
    slug: "global-lead-generation",
    shortDescription: "Structured support for identifying and organizing qualified B2B prospects in selected markets.",
    description:
      "Global lead generation is kept focused and practical: clarify the ICP, map target accounts, identify decision-makers, and support organized outreach for selected markets.",
    icon: "Globe",
    benefits: [
      "ICP-based prospect lists",
      "Decision-maker research",
      "LinkedIn-first outreach support",
      "Organized lead data for follow-up",
      "Clear review of responses and fit",
    ],
    process: [
      { step: 1, title: "ICP Definition", description: "Detailed profiling of your ideal customer across firmographic and behavioral dimensions." },
      { step: 2, title: "Target Mapping", description: "Research accounts and contacts aligned with the ICP." },
      { step: 3, title: "Outreach Support", description: "Create human messages and follow-ups for selected prospects." },
      { step: 4, title: "Pipeline Organization", description: "Track replies, interest, and qualified next steps." },
    ],
    metaTitle: "Global Lead Generation | Moreno Advisory",
    metaDescription: "Generate and organize qualified B2B prospects through ICP research, decision-maker mapping, and LinkedIn outreach support.",
  },
  {
    id: "international-expansion",
    title: "International Expansion",
    slug: "international-expansion",
    shortDescription: "Practical support for companies exploring new markets through research, positioning, and first conversations.",
    description:
      "International expansion support is focused on the early commercial side: understanding the market, identifying relevant targets, and opening conversations with context and cultural awareness.",
    icon: "MapPin",
    benefits: [
      "Market and audience review",
      "Early target account mapping",
      "Partner and channel research",
      "Localized outreach context",
      "Clear organization of commercial next steps",
    ],
    process: [
      { step: 1, title: "Market Context", description: "Review where your offer may fit and what conversations are worth testing." },
      { step: 2, title: "Target Direction", description: "Map companies, partners, and channels relevant to the market." },
      { step: 3, title: "Outreach Preparation", description: "Adapt messaging to the market and decision-maker context." },
      { step: 4, title: "Conversation Review", description: "Organize responses and identify practical next steps." },
    ],
    metaTitle: "International Expansion Strategy | Moreno Advisory",
    metaDescription: "Explore new B2B markets through prospect research, partner mapping, and contextual outreach support.",
  },
  {
    id: "business-consulting",
    title: "Business Consulting",
    slug: "business-consulting",
    shortDescription: "Practical advisory for refining your offer, outreach direction, and commercial development process.",
    description:
      "Business consulting is offered as practical support around positioning, market approach, prospecting workflow, and the commercial decisions needed before outreach begins.",
    icon: "BarChart3",
    benefits: [
      "Clear review of your offer and market",
      "Practical commercial recommendations",
      "Support prioritizing target audiences",
      "Simple outreach workflow design",
      "Founder-led strategic perspective",
    ],
    process: [
      { step: 1, title: "Commercial Review", description: "Review offer, audience, current outreach, and business goals." },
      { step: 2, title: "Opportunity Mapping", description: "Identify where the clearest conversation opportunities may exist." },
      { step: 3, title: "Recommendations", description: "Document practical steps for outreach and business development." },
      { step: 4, title: "Support", description: "Help organize the first actions and review the market response." },
    ],
    metaTitle: "Business Consulting Services | Moreno Advisory",
    metaDescription: "Practical B2B consulting for offer clarity, prospecting direction, and business development workflow.",
  },
  {
    id: "commercial-intelligence",
    title: "Commercial Intelligence",
    slug: "commercial-intelligence",
    shortDescription: "Focused prospect, account, and decision-maker research to support better commercial conversations.",
    description:
      "Commercial intelligence focuses on the information needed for better outreach: who to approach, why they may be relevant, and how to frame the first conversation with context.",
    icon: "Search",
    benefits: [
      "Prospect and account research",
      "Decision-maker context",
      "Market and positioning signals",
      "Partner and channel research",
      "Inputs for more relevant outreach",
    ],
    process: [
      { step: 1, title: "Research Brief", description: "Define the market, accounts, and questions that matter for outreach." },
      { step: 2, title: "Prospect Research", description: "Collect relevant company, contact, and context signals." },
      { step: 3, title: "Synthesis", description: "Turn research into practical outreach angles and priorities." },
      { step: 4, title: "Delivery", description: "Organize the findings for action and follow-up." },
    ],
    metaTitle: "Commercial Intelligence | Moreno Advisory",
    metaDescription: "Focused commercial intelligence, prospect research, and decision-maker mapping for B2B outreach.",
  },
  {
    id: "international-representation",
    title: "International Business Representation",
    slug: "international-representation",
    shortDescription: "Support representing your company in early commercial conversations with international prospects or partners.",
    description:
      "International representation is positioned as early-stage commercial support: opening conversations, organizing responses, and helping your company communicate with clarity in selected markets.",
    icon: "Users",
    benefits: [
      "Contextual outreach in selected markets",
      "Clear communication with prospects or partners",
      "Support organizing responses and next steps",
      "Founder-led attention to message quality",
      "Practical international B2B perspective",
    ],
    process: [
      { step: 1, title: "Market Briefing", description: "Review your offer, positioning, and target customer profiles." },
      { step: 2, title: "Message Alignment", description: "Adapt outreach language to the market and business context." },
      { step: 3, title: "Conversation Support", description: "Open and organize early commercial conversations." },
      { step: 4, title: "Follow-Up Review", description: "Track replies and clarify next steps." },
    ],
    metaTitle: "International Business Representation | Moreno Advisory",
    metaDescription: "International B2B representation support for early prospect, partner, and market conversations.",
  },
];

export const INDUSTRIES: Industry[] = [
  {
    id: "technology",
    title: "Technology & SaaS",
    description: "Helping tech companies accelerate global adoption and build enterprise sales pipelines across international markets.",
    icon: "Cpu",
    challenges: ["Market fragmentation", "Localization complexity", "Enterprise procurement cycles"],
    solutions: ["Go-to-market strategy for new regions", "Partner ecosystem development", "Enterprise BD programs"],
  },
  {
    id: "healthcare",
    title: "Healthcare & Life Sciences",
    description: "Navigating regulatory complexity and building trusted partnerships in the healthcare and life sciences sector.",
    icon: "HeartPulse",
    challenges: ["Regulatory compliance", "Long sales cycles", "Trust and credentialing requirements"],
    solutions: ["Market access strategy", "Distributor and partner identification", "Regulatory pathway advisory"],
  },
  {
    id: "finance",
    title: "Financial Services",
    description: "Supporting fintech innovators and traditional financial institutions in expanding across regulated global markets.",
    icon: "DollarSign",
    challenges: ["Regulatory barriers", "Trust and brand recognition", "Competitive incumbents"],
    solutions: ["Regulatory market mapping", "Institutional partnership programs", "Brand positioning for new markets"],
  },
  {
    id: "real-estate",
    title: "Real Estate & PropTech",
    description: "Connecting real estate developers, investors, and proptech companies with cross-border opportunities.",
    icon: "Building2",
    challenges: ["Cross-border investment complexity", "Local market knowledge", "Investor relationship management"],
    solutions: ["International investor outreach", "Local market intelligence", "Deal origination and facilitation"],
  },
  {
    id: "manufacturing",
    title: "Manufacturing & Industry",
    description: "Enabling industrial companies to identify new markets, build distribution networks, and optimize their global supply chain.",
    icon: "Factory",
    challenges: ["Distribution channel development", "Local compliance", "Pricing competitiveness"],
    solutions: ["Distributor identification and vetting", "Market entry feasibility", "Supply chain partner sourcing"],
  },
  {
    id: "logistics",
    title: "Logistics & Supply Chain",
    description: "Driving commercial growth for logistics, freight, and supply chain companies in competitive international corridors.",
    icon: "Truck",
    challenges: ["Route and corridor development", "Customer acquisition at scale", "Operational partnerships"],
    solutions: ["Lane-specific BD programs", "Shipper prospecting campaigns", "Strategic carrier partnerships"],
  },
  {
    id: "energy",
    title: "Energy & Cleantech",
    description: "Accelerating commercial traction for energy companies and cleantech innovators across emerging and developed markets.",
    icon: "Zap",
    challenges: ["Policy and regulatory navigation", "Long project development cycles", "Capital and partner access"],
    solutions: ["Stakeholder and government engagement", "Private sector partnership development", "Project pipeline origination"],
  },
  {
    id: "startups",
    title: "Startups & Scale-ups",
    description: "Providing the BD muscle and strategic guidance that high-growth startups need to cross-borders successfully.",
    icon: "Rocket",
    challenges: ["Limited BD resources", "Brand awareness in new markets", "Investor and partner access"],
    solutions: ["Fractional BD leadership", "Market validation programs", "Investor and accelerator introductions"],
  },
  {
    id: "professional-services",
    title: "Professional Services",
    description: "Helping law firms, consulting practices, accounting, and advisory firms build international client books.",
    icon: "Scale",
    challenges: ["Relationship-driven sales complexity", "Geographic credibility", "Cross-border referral development"],
    solutions: ["Cross-border referral programs", "Brand positioning for international markets", "BD enablement programs"],
  },
];

export const VALUES = [
  {
    icon: "Shield",
    title: "Integrity",
    description: "We operate with unwavering ethical standards, transparency, and accountability in every engagement.",
  },
  {
    icon: "Eye",
    title: "Transparency",
    description: "Clear communication, honest assessment, and complete visibility into every aspect of our work.",
  },
  {
    icon: "Award",
    title: "Excellence",
    description: "We keep the work organized, thoughtful, and aligned with the quality each conversation deserves.",
  },
  {
    icon: "Lightbulb",
    title: "Innovation",
    description: "We constantly challenge conventional approaches and bring creative, forward-thinking solutions to complex problems.",
  },
  {
    icon: "Globe2",
    title: "International Perspective",
    description: "A practical view from Brazil for selected markets and international B2B conversations.",
  },
  {
    icon: "Target",
    title: "Commercial Focus",
    description: "Every engagement is organized around clearer targets, better outreach, and real commercial conversations.",
  },
];
