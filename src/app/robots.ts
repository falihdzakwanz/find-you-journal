import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/about",
          "/contact",
          "/journal/history",
          "/journal/today",
          "/profile",
          "/terms",
          "/privacy"
        ],
        disallow: [
          "/journal/edit/", // Block dynamic routes
          "/api/", // Block API routes
          "/private/", // Block private pages
          "/_next/static", // Block Next.js internals
        ],
      },
      // Special rules for Googlebot (optional)
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/journal/edit/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
