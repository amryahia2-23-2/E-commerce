import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
