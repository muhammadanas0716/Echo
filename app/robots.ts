/**
 * Robots.txt Configuration
 * 
 * Tells search engines which pages they can and cannot access.
 * Prevents indexing of error pages and API routes.
 */

import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
        ],
      },
    ],
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
