import { ImageResponse } from "next/og";
import { renderSocialImage } from "@/lib/seo/social-image";

export const alt = "Support Co Pricing";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    renderSocialImage({
      label: "Pricing",
      title: "Early launch pricing for support teams.",
      subtitle:
        "Sandbox, monthly, and founding plans for teams shipping AI support across every customer channel.",
      chips: ["Sandbox", "$1.99/mo", "$39 once", "Launch pricing"],
    }),
    size
  );
}
