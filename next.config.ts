import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "factiontags.torn.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
