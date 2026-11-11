import { ImageResponse } from "next/og";

export const alt = "Ahmad Ashraf — AI Engineer & Full-Stack Developer, ALASHRAF-TECHUB";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0B",
          color: "#F5F5F4",
          padding: "64px 72px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: "rgba(249,115,22,0.16)",
            filter: "blur(40px)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 12,
              background: "#F97316",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0A0A0B",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 3 }}>
              ALASHRAF
            </div>
            <div
              style={{
                fontSize: 15,
                letterSpacing: 8,
                color: "#A1A1AA",
                marginTop: 2,
              }}
            >
              TECHUB
            </div>
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid #26262A",
              borderRadius: 999,
              padding: "8px 16px",
              color: "#A1A1AA",
              fontSize: 15,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "#22C55E",
              }}
            />
            Available for projects
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 112,
              fontWeight: 700,
              letterSpacing: -5,
              lineHeight: 0.9,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>MEET AHMAD.</span>
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 26,
              color: "#A1A1AA",
              maxWidth: 820,
              lineHeight: 1.4,
            }}
          >
            AI systems, full-stack products, and automation built end-to-end.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #26262A",
            paddingTop: 24,
            fontSize: 18,
            color: "#A1A1AA",
          }}
        >
          <span>AI Engineer & Full-Stack Developer · 18</span>
          <span style={{ color: "#F97316" }}>alashraf-techub.dev</span>
        </div>
      </div>
    ),
    size,
  );
}
