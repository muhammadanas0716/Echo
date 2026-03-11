type SocialImageProps = {
  label: string;
  title: string;
  subtitle: string;
  chips?: string[];
};

const chipColors = ["#a6ea47", "#90ddf0", "#F9E27F", "#B794F6", "#FF6B5A", "#C6F6A0"];

export function renderSocialImage({ label, title, subtitle, chips = [] }: SocialImageProps) {
  const displayChips = (chips.length ? chips : ["Support", "Docs", "Shopify"]).slice(0, 5);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(170deg, #90ddf0 0%, #b8edfb 50%, #d4f8ff 100%)",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -40,
          width: 260,
          height: 260,
          borderRadius: 48,
          border: "4px solid #1a1a1a",
          background: "#F9E27F",
          transform: "rotate(12deg)",
          opacity: 0.35,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: -50,
          width: 300,
          height: 300,
          borderRadius: 999,
          border: "4px solid #1a1a1a",
          background: "#90ddf0",
          opacity: 0.3,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 160,
          width: 100,
          height: 100,
          borderRadius: 24,
          border: "3px solid #1a1a1a",
          background: "#B794F6",
          transform: "rotate(-8deg)",
          opacity: 0.3,
          display: "flex",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 44,
          left: 72,
          right: 72,
          bottom: 44,
          borderRadius: 40,
          border: "4px solid #1a1a1a",
          background: "rgba(255,255,255,0.65)",
          boxShadow: "0 12px 0 #1a1a1a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 56px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 20px",
              borderRadius: 999,
              border: "3px solid #1a1a1a",
              background: "#a6ea47",
              boxShadow: "0 4px 0 #1a1a1a",
              color: "#1a1a1a",
              fontWeight: 900,
              fontSize: 26,
              letterSpacing: -0.5,
            }}
          >
            {label}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#1a1a1a",
              fontWeight: 700,
              opacity: 0.5,
            }}
          >
            supportco.ai
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            maxWidth: 920,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 900,
              lineHeight: 1.05,
              color: "#1a1a1a",
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.35,
              color: "#1a1a1a",
              opacity: 0.6,
              fontWeight: 600,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {displayChips.map((chip, i) => (
            <div
              key={chip}
              style={{
                display: "flex",
                padding: "10px 18px",
                borderRadius: 14,
                border: "3px solid #1a1a1a",
                background: chipColors[i % chipColors.length],
                boxShadow: "0 3px 0 #1a1a1a",
                color: "#1a1a1a",
                fontSize: 20,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
