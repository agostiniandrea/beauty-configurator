import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #C4857A 0%, #D4958A 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Vertical arm */}
        <div
          style={{
            position: "absolute",
            width: 22,
            height: 128,
            background: "#FAF7F4",
            borderRadius: 11,
          }}
        />
        {/* Horizontal arm */}
        <div
          style={{
            position: "absolute",
            width: 128,
            height: 22,
            background: "#FAF7F4",
            borderRadius: 11,
          }}
        />
        {/* NW–SE diagonal (shorter, semi-transparent) */}
        <div
          style={{
            position: "absolute",
            width: 14,
            height: 88,
            background: "rgba(250, 247, 244, 0.6)",
            borderRadius: 7,
            transform: "rotate(45deg)",
          }}
        />
        {/* NE–SW diagonal */}
        <div
          style={{
            position: "absolute",
            width: 14,
            height: 88,
            background: "rgba(250, 247, 244, 0.6)",
            borderRadius: 7,
            transform: "rotate(-45deg)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
