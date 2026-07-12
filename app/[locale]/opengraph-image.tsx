import { ImageResponse } from "next/og";
import siteConfig from "@/site.config";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #FAF7F4 0%, #FFFCF9 50%, #F3EDE8 100%)",
        padding: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "rgba(196, 133, 122, 0.12)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "rgba(201, 169, 110, 0.10)",
        }}
      />

      <p
        style={{
          fontFamily: "serif",
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#C4857A",
          marginBottom: 28,
        }}
      >
        {siteConfig.name}
      </p>

      <h1
        style={{
          fontFamily: "serif",
          fontSize: 76,
          fontWeight: 300,
          color: "#2D1F1A",
          textAlign: "center",
          lineHeight: 1.15,
          margin: "0 0 28px",
        }}
      >
        {siteConfig.tagline.en}
      </h1>

      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: 24,
          fontWeight: 400,
          color: "#9A857C",
          textAlign: "center",
          maxWidth: 680,
          lineHeight: 1.5,
        }}
      >
        {siteConfig.seo.description.en}
      </p>
    </div>,
    { ...size },
  );
}
