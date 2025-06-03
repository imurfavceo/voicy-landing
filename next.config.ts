import type { NextConfig } from "next";
import dotenv from 'dotenv';
import path from 'path';
// import fs from 'fs'; // fs can be removed as fs.existsSync is no longer used

// The following console.logs were for debugging and can be safely removed or commented out.
// console.log(`[next.config.ts] Current Working Directory (process.cwd()): ${process.cwd()}`);
// console.log(`[next.config.ts] Directory of next.config.ts (__dirname): ${__dirname}`);

const envConfigPath = path.resolve(__dirname, '.env.local');

// The fs.existsSync check was for debugging and can be removed.
// console.log(`[next.config.ts] Checking for file existence at: ${envConfigPath}`);
// if (fs.existsSync(envConfigPath)) {
//   console.log(`[next.config.ts] SUCCESS: fs.existsSync confirms file exists at: ${envConfigPath}`);
// } else {
//   console.error(`[next.config.ts] FAILURE: fs.existsSync CANNOT find file at: ${envConfigPath}`);
// }

// Load .env.local
const result = dotenv.config({ path: envConfigPath }); // debug: true can be re-added if needed for future issues

if (result.error) {
  // This log is important for diagnosing issues if .env.local fails to load
  console.error('[next.config.ts] CRITICAL: Error loading .env.local file. Ensure it exists, is readable, and correctly formatted:', result.error);
  // Depending on how critical .env.local is, you might want to throw an error to halt startup:
  // throw result.error;
}

// The following console.logs related to the dotenv loading result were for debugging.
// console.log(`[next.config.ts] Attempting to manually load .env.local from: ${envConfigPath}`);
// if (result.error) {
//   console.error('[next.config.ts] ERROR loading .env.local with dotenv:', result.error);
// } else {
//   console.log('[next.config.ts] SUCCESS loading .env.local with dotenv. Parsed content:', result.parsed);
// }
// console.log("[next.config.ts] process.env.NEXT_PUBLIC_TEST_VARIABLE (after manual dotenv attempt):", process.env.NEXT_PUBLIC_TEST_VARIABLE);

const nextConfig: NextConfig = {
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
