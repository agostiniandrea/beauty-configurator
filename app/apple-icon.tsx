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
          background: "linear-gradient(135deg, #FAF7F4 0%, #F3EDE8 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(196, 133, 122, 0.12)",
          }}
        />
        <span
          style={{
            fontSize: 88,
            color: "#C4857A",
            fontFamily: "serif",
            lineHeight: 1,
          }}
        >
          ✦
        </span>
      </div>
    ),
    { ...size },
  );
}
