import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // نرفع الحد الأقصى هنا إلى 20 ميجابايت
    },
  },
};

export default nextConfig;