import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Governance and Security Initiative",
    title: siteConfig.tagline,
    description: siteConfig.description,
    meta: "Dhaka, Bangladesh",
  });
}
