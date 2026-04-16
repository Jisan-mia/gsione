import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const ogImageSize = {
  width: 1200,
  height: 630,
} as const;

export const ogImageContentType = "image/png";

interface OgImageOptions {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
}

export function renderOgImage({
  eyebrow,
  title,
  description,
  meta,
}: OgImageOptions) {
  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        padding: "48px",
        background:
          "linear-gradient(135deg, #07111f 0%, #0b1630 55%, #12213f 100%)",
        color: "#f6f2e9",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top left, rgba(59, 130, 246, 0.18), transparent 40%), radial-gradient(circle at bottom right, rgba(30, 64, 175, 0.32), transparent 38%)",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          borderRadius: "36px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          background: "rgba(9, 18, 35, 0.82)",
          padding: "44px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "120px",
                height: "120px",
                borderRadius: "28px",
                background: "#ffffff",
                color: "#07111f",
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
                fontSize: "44px",
                fontWeight: 700,
                letterSpacing: "-0.04em",
              }}
            >
              {siteConfig.shortName}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  borderRadius: "999px",
                  background: "rgba(59, 130, 246, 0.1)",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  color: "#60A5FA",
                  padding: "10px 18px",
                  fontFamily: "ui-sans-serif, system-ui, sans-serif",
                  fontSize: "20px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {eyebrow}
              </div>
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "22px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                maxWidth: "860px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: title.length > 68 ? "58px" : "68px",
                  lineHeight: 1.04,
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  display: "flex",
                  maxWidth: "920px",
                  fontFamily: "ui-sans-serif, system-ui, sans-serif",
                  fontSize: "28px",
                  lineHeight: 1.5,
                  color: "rgba(237, 236, 231, 0.8)",
                }}
              >
                {description}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "24px",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "24px",
                color: "#60A5FA",
                fontWeight: 600,
              }}
            >
              {siteConfig.name}
            </div>
            {meta ? (
              <div
                style={{
                  display: "flex",
                  fontSize: "22px",
                  color: "rgba(237, 236, 231, 0.68)",
                }}
              >
                {meta}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    ogImageSize,
  );
}
