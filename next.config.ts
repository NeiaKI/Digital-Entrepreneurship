import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    "*": ["3D-ASSET/**/*"],
  },
};

export default nextConfig;
