import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function BlogOpenGraphImage() {
  return renderOgImage({
    eyebrow: "GSi Blog",
    title:
      "Writing and commentary on governance, security, and technology policy.",
    description:
      "Analysis and public-interest writing on cybersecurity, AI governance, democratic accountability, environmental risk, and digital rights.",
    meta: "Essays • Commentary • Bangladesh-focused analysis",
  });
}
