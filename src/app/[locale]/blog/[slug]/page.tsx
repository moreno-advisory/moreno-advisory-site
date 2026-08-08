import type { Metadata } from "next";
import BlogPostContent from "@/app/blog/[slug]/BlogPostContent";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${title} | Moreno Advisory Insights`,
    description: `Strategic insights on ${title} from Moreno Advisory.`,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug } = await params;
  return <BlogPostContent slug={slug} />;
}
