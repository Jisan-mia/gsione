import { MetadataRoute } from "next";
import {
  getAnalysisPosts,
  getBlogPosts,
  getPodcastEpisodes,
  getTrainingPrograms,
} from "@/lib/content";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const analysisPosts = getAnalysisPosts();
  const blogPosts = getBlogPosts();
  const podcastEpisodes = getPodcastEpisodes();
  const trainingPrograms = getTrainingPrograms();
  const latestContentDate = [
    ...analysisPosts.map((post) => post.updatedAt || post.publishedAt),
    ...blogPosts.map((post) => post.updatedAt || post.publishedAt),
    ...podcastEpisodes.map((episode) => episode.updatedAt || episode.publishedAt),
    ...trainingPrograms.map((program) => program.updatedAt),
  ]
    .filter(Boolean)
    .map((value) => new Date(value as string).getTime())
    .sort((left, right) => right - left)[0];

  const siteLastModified = latestContentDate
    ? new Date(latestContentDate)
    : new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: siteLastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/analysis`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/articles`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/podcast`,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/training`,
      lastModified: siteLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: siteLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: siteLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/cookies`,
      lastModified: siteLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const analysisRoutes: MetadataRoute.Sitemap = analysisPosts.map((post) => ({
    url: `${siteUrl}/analysis/${post.slug}`,
    lastModified: new Date(
      post.updatedAt || post.publishedAt || siteLastModified,
    ),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/articles/${post.slug}`,
    lastModified: new Date(
      post.updatedAt || post.publishedAt || siteLastModified,
    ),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const trainingRoutes: MetadataRoute.Sitemap = trainingPrograms.map(
    (program) => ({
      url: `${siteUrl}/training/${program.slug}`,
      lastModified: new Date(program.updatedAt || siteLastModified),
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [...staticRoutes, ...analysisRoutes, ...blogRoutes, ...trainingRoutes];
}
