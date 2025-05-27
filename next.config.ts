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
  // Webpack configuration (for production builds)
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("pino-pretty");
    }
    return config;
  },
  // Turbopack configuration (now stable)
  turbopack: {
    resolveAlias: {
      // Ensure pino-pretty is properly resolved
      "pino-pretty": require.resolve("pino-pretty"),
    },
  },
};

export default nextConfig;
