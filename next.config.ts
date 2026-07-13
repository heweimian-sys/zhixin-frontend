import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages 静态导出
  output: 'export',
  // 静态导出模式下禁用图片优化
  images: { unoptimized: true },
  // 禁用 trailing slash（保持 /report 而非 /report/）
  trailingSlash: false,
};

export default nextConfig;
