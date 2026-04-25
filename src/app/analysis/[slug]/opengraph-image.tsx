import { notFound } from "next/navigation";
import {
  formatDisplayDate,
  getAnalysisPostBySlug,
  getAnalysisPosts,
} from "@/lib/content";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return getAnalysisPosts().map((post) => ({ slug: post.slug }));
}

export default async function AnalysisOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getAnalysisPostBySlug(slug);

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
