import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static marketing site: classic static prerendering is all we need.
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85],
    deviceSizes: [480, 640, 828, 1080, 1280, 1600, 1920, 2400],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
