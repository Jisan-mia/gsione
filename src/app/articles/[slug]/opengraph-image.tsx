import { notFound } from "next/navigation";
import {
  formatDisplayDate,
  getBlogPostBySlug,
  getBlogPosts,
} from "@/lib/content";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export default async function ArticleOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const meta = [post.author, post.category, formatDisplayDate(post.publishedAt)]
    .filter(Boolean)
    .join(" • ");

  return renderOgImage({
    eyebrow: post.category,
    title: post.title,
    description: post.excerpt,
    meta,
  });
}
