import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow serving .glb files as static assets from public/
  async headers() {
    return [
      {
        source: "/3D-ASSET/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
