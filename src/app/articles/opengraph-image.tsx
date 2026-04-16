import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function ArticlesOpenGraphImage() {
  return renderOgImage({
    eyebrow: "GSi Articles",
    title: "Expert analysis on governance, security, and technology policy.",
    description:
      "In-depth articles on cybersecurity, AI governance, democratic accountability, environmental risk, and digital rights.",
    meta: "Research · Analysis · Bangladesh-focused commentary",
  });
}
