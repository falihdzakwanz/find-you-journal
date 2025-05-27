import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: "2025-05-26", // Homepage
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: "2025-05-26", // About page
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: "2025-05-26", // Contact page
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/journal/history`,
      lastModified: new Date().toISOString(), // Journal history
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/journal/today`,
      lastModified: new Date().toISOString(), // Today's journal
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: "2025-05-26", // Terms of service
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: "2025-05-26", // Privacy policy
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: "2025-05-26", // Profile page
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ];

  return staticRoutes;
}
