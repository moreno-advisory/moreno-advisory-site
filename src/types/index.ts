export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  benefits: string[];
  process: ProcessStep[];
  metaTitle: string;
  metaDescription: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface Industry {
  id: string;
  title: string;
  description: string;
  icon: string;
  challenges: string[];
  solutions: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
  country: string;
  image?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  author: Author;
  publishedAt: string;
  readTime: number;
  featuredImage?: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface Author {
  name: string;
  title: string;
  image?: string;
}

export type BlogCategory =
  | "Business Development"
  | "Strategic Partnerships"
  | "International Expansion"
  | "Market Intelligence"
  | "Leadership"
  | "Industry Insights";

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  service?: string;
  message: string;
  honeypot?: string;
}

export interface NewsletterForm {
  email: string;
  name?: string;
}

export interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}
