import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://authentication-back-end-two.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
