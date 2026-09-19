import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/TapVPN",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;