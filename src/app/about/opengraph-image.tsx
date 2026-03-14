import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function AboutOpenGraphImage() {
  return renderOgImage({
    eyebrow: "About GSi",
    title: "Leadership, research, training, and public-facing policy work.",
    description:
      "Meet the founder of GSi and explore the platform's work across governance, security, cybersecurity, and technology policy.",
    meta: "Founder • Publications • Public engagement",
  });
}
