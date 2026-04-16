import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function AnalysisOpenGraphImage() {
  return renderOgImage({
    eyebrow: "Analysis",
    title: "Fast analysis on cyber incidents, geopolitics, and governance.",
    description:
      "Short-form GSi nuggets covering recent news, affairs, and public-interest developments.",
    meta: "Recent developments · Quick context · Bangladesh-relevant commentary",
  });
}
