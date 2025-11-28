// Enhanced Next.js configuration for performance optimization
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["react-icons", "@react-three/fiber", "@react-three/drei"],

  },

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compression and optimization
  compress: true,
  poweredByHeader: false,

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/svg/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Webpack optimization (only when not using turbopack)
  ...(!process.env.TURBOPACK && {
    webpack(config, { isServer }) {
      // SVG handling
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });

      // Bundle analyzer
      if (process.env.ANALYZE === "true" && !isServer) {
        const BundleAnalyzerPlugin = require("@next/bundle-analyzer")({
          enabled: true,
        });
        config.plugins.push(BundleAnalyzerPlugin);
      }

      return config;
    },
  }),

  // Output configuration
  output: "standalone",

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },


};

export default nextConfig;
