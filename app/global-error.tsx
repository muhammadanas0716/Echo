"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const boxStyle = {
    border: "3px solid #1a1a1a",
    borderRadius: 26,
    boxShadow: "0 8px 0 #1a1a1a",
  } as const;

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          fontFamily: "var(--font-manrope), system-ui, sans-serif",
          background: "linear-gradient(180deg, #1d3f9c 0%, #2850bf 48%, #17357e 100%)",
          color: "#1a1a1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 980, display: "grid", gap: 24, alignItems: "center" }}>
          <div
            style={{
              ...boxStyle,
              background: "#d6e2ff",
              padding: "28px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "2px solid #1a1a1a",
                borderRadius: 999,
                background: "#fff",
                padding: "8px 14px",
                fontSize: 10,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff6b5a" }} />
              Critical error
            </div>

            <div style={{ marginTop: 18, display: "grid", gap: 24 }}>
              <div>
                <div
                  style={{
                    display: "inline-block",
                    border: "3px solid #1a1a1a",
                    borderRadius: 28,
                    background: "#90ddf0",
                    padding: "14px 26px",
                    boxShadow: "0 6px 0 #1a1a1a",
                    fontSize: "5rem",
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                >
                  500
                </div>
                <h1 style={{ margin: "20px 0 10px", fontSize: "2.2rem", fontWeight: 900, lineHeight: 1.05 }}>
                  The app failed before it could recover gracefully.
                </h1>
                <p style={{ margin: 0, maxWidth: 640, fontSize: "1rem", fontWeight: 600, lineHeight: 1.65, color: "rgba(26,26,26,0.72)" }}>
                  This is the global error screen, which means the normal route-level UI could not safely render. Retrying may work. If it does not, the issue likely needs a real fix rather than another refresh.
                </p>
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button
                  onClick={reset}
                  style={{
                    padding: "12px 22px",
                    background: "#a6ea47",
                    color: "#1a1a1a",
                    border: "3px solid #1a1a1a",
                    borderRadius: 14,
                    fontWeight: 900,
                    cursor: "pointer",
                    boxShadow: "0 5px 0 #1a1a1a",
                  }}
                >
                  Try Again
                </button>
                <Link
                  href="/"
                  style={{
                    padding: "12px 22px",
                    background: "#fff",
                    color: "#1a1a1a",
                    border: "3px solid #1a1a1a",
                    borderRadius: 14,
                    fontWeight: 900,
                    textDecoration: "none",
                    boxShadow: "0 5px 0 #1a1a1a",
                  }}
                >
                  Go Home
                </Link>
                <a
                  href="mailto:hello@echobills.space?subject=Support%20Co%20Global%20Error"
                  style={{
                    padding: "12px 22px",
                    background: "#fef3c7",
                    color: "#1a1a1a",
                    border: "3px solid #1a1a1a",
                    borderRadius: 14,
                    fontWeight: 900,
                    textDecoration: "none",
                    boxShadow: "0 5px 0 #1a1a1a",
                  }}
                >
                  Report Issue
                </a>
              </div>

              <div
                style={{
                  ...boxStyle,
                  background: "#fff",
                  padding: "18px 20px",
                }}
              >
                <p style={{ margin: 0, fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(26,26,26,0.5)" }}>
                  Helpful context
                </p>
                <p style={{ margin: "10px 0 0", fontSize: 14, fontWeight: 600, lineHeight: 1.6, color: "rgba(26,26,26,0.74)" }}>
                  If you are seeing this repeatedly after a deploy or after loading a particular route, the failure is probably deterministic and should be investigated instead of ignored.
                </p>
              </div>

              {process.env.NODE_ENV === "development" && error.message && (
                <div
                  style={{
                    ...boxStyle,
                    background: "#1a1a1a",
                    padding: "18px 20px",
                    color: "#fff",
                  }}
                >
                  <p style={{ margin: 0, fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)" }}>
                    Dev detail
                  </p>
                  <p style={{ margin: "10px 0 0", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12, lineHeight: 1.6, color: "rgba(255,255,255,0.82)", wordBreak: "break-word" }}>
                    {error.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
