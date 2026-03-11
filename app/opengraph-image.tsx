import { ImageResponse } from "next/og";
import { renderSocialImage } from "@/lib/seo/social-image";

export const alt = "Support Co";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    renderSocialImage({
      label: "Support Co",
      title: "AI support agents that know your product.",
      subtitle:
        "Deploy website, Shopify, docs, and community support agents trained on your real support knowledge.",
      chips: ["Website", "Shopify", "Discord", "Docs + Code"],
    }),
    size
  );
}
