import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import matter from "gray-matter";
import { cache } from "react";
import { siteConfig, siteUrl } from "@/lib/site";

const contentRoot = path.join(process.cwd(), "content");
const blogRoot = path.join(contentRoot, "articles");
const trainingRoot = path.join(contentRoot, "training");

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  publishedAt?: string;
  sourceLabel?: string;
  sourceUrl?: string;
  featured: boolean;
  tags: string[];
  content: string;
  readingTime: string;
  updatedAt?: string;
}

export interface TrainingProgram {
  slug: string;
  title: string;
  summary: string;
  level: string;
  duration: string;
  format: string;
  publishedAt?: string;
  featured: boolean;
  audience: string[];
  focusAreas: string[];
  outcomes: string[];
  content: string;
  updatedAt?: string;
}

function readMarkdownFiles(directory: string) {
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const fullPath = path.join(directory, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const stats = fs.statSync(fullPath);
      const parsed = matter(raw);

      return {
        slug: path.basename(file, ".md"),
        updatedAt: stats.mtime.toISOString(),
        ...parsed,
      };
    });
}

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function getDateTimestamp(date?: string) {
  return date ? new Date(date).getTime() : 0;
}

function sortByDate<T extends { publishedAt?: string; slug: string }>(
  items: T[],
) {
  return items
    .map((item) => ({
      item,
      timestamp: getDateTimestamp(item.publishedAt),
    }))
    .sort((left, right) => {
      if (left.timestamp === right.timestamp) {
        return left.item.slug.localeCompare(right.item.slug);
      }

      return right.timestamp - left.timestamp;
    })
    .map(({ item }) => item);
}

function sortByDateThenFeatured<
  T extends { publishedAt?: string; featured: boolean; slug: string },
>(items: T[]) {
  return items
    .map((item) => ({
      item,
      timestamp: getDateTimestamp(item.publishedAt),
    }))
    .sort((left, right) => {
      if (left.timestamp !== right.timestamp) {
        return right.timestamp - left.timestamp;
      }

      if (left.item.featured !== right.item.featured) {
        return Number(right.item.featured) - Number(left.item.featured);
      }

      return left.item.slug.localeCompare(right.item.slug);
    })
    .map(({ item }) => item);
}

export const getBlogPosts = cache((): BlogPost[] => {
  const posts = readMarkdownFiles(blogRoot).map(
    ({ slug, data, content, updatedAt }) => {
      const frontmatter = data as Omit<
        BlogPost,
        "slug" | "content" | "readingTime"
      >;

      return {
        ...frontmatter,
        slug,
        content,
        readingTime: getReadingTime(content),
        updatedAt,
      };
    },
  );

  return sortByDate(posts);
});

export const getFeaturedBlogPosts = cache(() =>
  getBlogPosts().filter((post) => post.featured),
);

export const getBlogPostBySlug = cache((slug: string) =>
  getBlogPosts().find((post) => post.slug === slug),
);

export const getTrainingPrograms = cache((): TrainingProgram[] => {
  const programs = readMarkdownFiles(trainingRoot).map(
    ({ slug, data, content, updatedAt }) => {
      const frontmatter = data as Omit<TrainingProgram, "slug" | "content">;

      return {
        ...frontmatter,
        slug,
        content,
        updatedAt,
      };
    },
  );

  return sortByDateThenFeatured(programs);
});

export const getFeaturedTrainingPrograms = cache(() =>
  getTrainingPrograms().filter((program) => program.featured),
);

export const getTrainingProgramBySlug = cache((slug: string) =>
  getTrainingPrograms().find((program) => program.slug === slug),
);

export function formatDisplayDate(date?: string) {
  if (!date) {
    return "Undated";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function getMetadataImageUrl(pathName = "/opengraph-image") {
  if (pathName.startsWith("http://") || pathName.startsWith("https://")) {
    return pathName;
  }

  return `${siteUrl}${pathName.startsWith("/") ? pathName : `/${pathName}`}`;
}

export function getBaseMetadata({
  title,
  description,
  pathName = "/",
  ogImagePath = "/opengraph-image",
  openGraphType = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
  keywords,
}: {
  title?: string;
  description?: string;
  pathName?: string;
  ogImagePath?: string;
  openGraphType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  keywords?: string[];
}): Metadata {
  const resolvedTitle = title
    ? `${title} | ${siteConfig.shortName}`
    : `${siteConfig.name} | ${siteConfig.tagline.replace(/ • /g, " | ")}`;
  const resolvedDescription = description || siteConfig.description;
  const url = `${siteUrl}${pathName}`;
  const imageUrl = getMetadataImageUrl(ogImagePath);
  const openGraph: Metadata["openGraph"] =
    openGraphType === "article"
      ? {
          title: resolvedTitle,
          description: resolvedDescription,
          url,
          type: "article",
          siteName: siteConfig.name,
          locale: "en_US",
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: resolvedTitle,
            },
          ],
          publishedTime,
          modifiedTime,
          authors,
          section,
          tags,
        }
      : {
          title: resolvedTitle,
          description: resolvedDescription,
          url,
          type: "website",
          siteName: siteConfig.name,
          locale: "en_US",
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: resolvedTitle,
            },
          ],
        };

  return {
    metadataBase: new URL(siteUrl),
    title: resolvedTitle,
    description: resolvedDescription,
    keywords,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [imageUrl],
    },
  };
}
