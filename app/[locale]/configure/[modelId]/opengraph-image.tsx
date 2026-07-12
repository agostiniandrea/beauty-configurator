import { ImageResponse } from "next/og";
import { getLook } from "@/lib/data";
import siteConfig from "@/site.config";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ modelId: string; locale: string }>;
};

export async function generateAlt({ params }: Props) {
  const { modelId } = await params;
  const look = getLook(modelId);
  return look ? `${look.name.en} — ${siteConfig.name}` : siteConfig.name;
}

export default async function OgImage({ params }: Props) {
  const { modelId, locale } = await params;
  const look = getLook(modelId);

  const loc = (locale === "it" ? "it" : "en") as "en" | "it";
  const name = look?.name[loc] ?? siteConfig.name;
  const description = look?.description[loc] ?? siteConfig.seo.description[loc];
  const tags = look?.tags ?? [];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        background: "linear-gradient(135deg, #FAF7F4 0%, #F3EDE8 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(196, 133, 122, 0.15)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 60,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "rgba(201, 169, 110, 0.12)",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0 80px 72px",
          gap: 0,
        }}
      >
        {/* Tags row */}
        {tags.length > 0 && (
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C4857A",
                  background: "rgba(196, 133, 122, 0.12)",
                  padding: "4px 14px",
                  borderRadius: 99,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Look name */}
        <h1
          style={{
            fontFamily: "serif",
            fontSize: 84,
            fontWeight: 300,
            color: "#2D1F1A",
            lineHeight: 1.1,
            margin: "0 0 20px",
          }}
        >
          {name}
        </h1>

        {/* Description */}
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: 26,
            fontWeight: 400,
            color: "#5C4A44",
            lineHeight: 1.4,
            margin: "0 0 32px",
            maxWidth: 700,
          }}
        >
          {description}
        </p>

        {/* Site name */}
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#9A857C",
          }}
        >
          {siteConfig.name}
        </p>
      </div>
    </div>,
    { ...size },
  );
}
