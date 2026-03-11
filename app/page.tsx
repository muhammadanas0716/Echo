/**
 * Home Page Component
 *
 * Main landing page for Support Co.
 * Composes the ocean landing experience and footer.
 */

import type { Metadata } from "next";
import LandingNav from "./components/nav/LandingNav";
import OceanLanding from "./components/landing/OceanLanding";
import OceanFooter from "./components/landing/OceanFooter";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Support Co - AI support agents for your website, store, and community",
  description:
    "Deploy AI support agents trained on your docs, tickets, and codebase for websites, Shopify stores, and Discord communities. Slack support bots are coming soon.",
  path: "/",
  imagePath: "/opengraph-image",
  keywords: [
    "ai support agents",
    "website chatbot",
    "shopify support bot",
    "discord support bot",
    "slack support bot",
    "codebase ai support",
    "customer support automation",
    "custom support chatbot",
  ],
});

export default function Home() {
  return (
    <>
      <LandingNav
        variant="ocean"
        brandName="Support Co"
        brandAlt="Support Co logo"
        primaryLabel="Book Demo"
        primaryHref="mailto:hello@echobills.space?subject=Support%20Co%20Demo"
      />
      <div className="relative min-h-screen overflow-hidden bg-[#a9e9f4] page-transition">
        <OceanLanding />
        <OceanFooter />
      </div>
    </>
  );
}
