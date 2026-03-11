import type { Metadata } from "next";

function getSiteUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://echobills.space";
}

export const SITE_URL = getSiteUrl();

type PageKind = "website" | "article";

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
  imageAlt?: string;
  keywords?: string[];
  kind?: PageKind;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
};

function normalizePath(path: string) {
  if (!path.startsWith("/")) {
    return `/${path}`;
  }
  return path;
}

export function toAbsoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${SITE_URL}${normalizePath(path)}`;
}

export function buildPageMetadata(input: BuildPageMetadataInput): Metadata {
  const canonicalPath = normalizePath(input.path);
  const imagePath = input.imagePath ?? "/opengraph-image";
  const image = {
    url: toAbsoluteUrl(imagePath),
    width: 1200,
    height: 630,
    alt: input.imageAlt ?? input.title,
    type: "image/png",
  };

  const openGraphBase = {
    title: input.title,
    description: input.description,
    url: toAbsoluteUrl(canonicalPath),
    siteName: "Support Co",
    locale: "en_US",
    type: input.kind ?? "website",
    images: [image],
  };

  const openGraph =
    input.kind === "article"
      ? {
          ...openGraphBase,
          publishedTime: input.publishedTime,
          modifiedTime: input.modifiedTime ?? input.publishedTime,
          section: input.section,
          tags: input.tags,
        }
      : openGraphBase;

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      site: "@echobills",
      creator: "@echobills",
      title: input.title,
      description: input.description,
      images: [image.url],
    },
  };
}
