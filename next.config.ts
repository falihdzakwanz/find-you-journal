import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.svgrepo.com",
        pathname: "/show/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**/**",
      },
    ],
  },
  robotsTxt: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private", "/api", "/_next/static"],
      },
    ],
    additionalSitemaps: ["https://find-you-journal.vercel.app/sitemap.xml"],
  },
};

export default nextConfig;
