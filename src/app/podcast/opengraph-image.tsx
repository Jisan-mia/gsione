import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function PodcastOpenGraphImage() {
  return renderOgImage({
    eyebrow: "Podcast",
    title: "Watch GSi podcast conversations directly on the site.",
    description:
      "A growing podcast archive with embedded video, hosts, guests, and issue-driven markdown publishing.",
    meta: "Embedded video · Governance · Security · Technology",
  });
}
