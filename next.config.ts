import type { NextConfig } from "next";

const isStaticExport = !!process.env.NEXT_PUBLIC_API_URL;

const nextConfig: NextConfig = {
  // Cloudflare Pages 静态导出（当设置了 NEXT_PUBLIC_API_URL 时）
  ...(isStaticExport ? { output: 'export' as const } : {}),
  // 静态导出模式下禁用图片优化
  images: { unoptimized: true },
  // 本地开发模式：通过 rewrite 代理后端 API
  ...(!isStaticExport ? {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.BACKEND_URL || 'http://localhost:8000'}/api/:path*`,
        },
      ];
    },
  } : {}),
};

export default nextConfig;
