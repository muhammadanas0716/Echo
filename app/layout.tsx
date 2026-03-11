import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Manrope, Sora, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CookieConsent from "./components/ui/CookieConsent";
import ServiceWorkerCleanup from "./components/ui/ServiceWorkerCleanup";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Echo - AI support agents for modern support teams",
    template: "%s | Echo",
  },
  description:
    "Deploy AI support agents trained on your docs, help center, tickets, and codebase across web, Shopify, and community channels.",
  keywords: [
    "ai support agents",
    "customer support automation",
    "website chatbot",
    "shopify support bot",
    "discord support bot",
    "help center ai",
    "support automation",
    "echo",
  ],
  authors: [{ name: "Echo", url: siteUrl }],
  creator: "Echo",
  publisher: "Echo",
  applicationName: "Echo",
  category: "Customer Support Software",
  classification: "AI Support Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
      { url: "/logo.png", type: "image/png", sizes: "192x192" },
      { url: "/logo.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Echo",
    title: "Echo - AI support agents for modern support teams",
    description:
      "Deploy AI support agents trained on your docs, help center, tickets, and codebase across web, Shopify, and community channels.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Echo AI support agent landing page",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@echobills",
    creator: "@echobills",
    title: "Echo - AI support agents for modern support teams",
    description:
      "Deploy AI support agents trained on your docs, help center, tickets, and codebase across web, Shopify, and community channels.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${manrope.variable} ${spaceGrotesk.variable} antialiased`}>
        {children}
        <CookieConsent />
        <ServiceWorkerCleanup />
        <Analytics />
        <SpeedInsights />
        <Script
          defer
          data-website-id="dfid_aSNmhGyeIyjFUgMH4zyhY"
          data-domain={new URL(siteUrl).hostname || "echobills.space"}
          src="https://datafa.st/js/script.js"
        />
      </body>
    </html>
  );
}
