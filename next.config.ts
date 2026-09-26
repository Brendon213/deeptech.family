import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    workerThreads: true,
    cpus: 1,
  },
};

export default nextConfig;
