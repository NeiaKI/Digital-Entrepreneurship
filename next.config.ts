import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    outputFileTracingExcludes: {
      "*": ["3D-ASSET/**/*"],
    },
  },
};

export default nextConfig;
