/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Turbopack (Next.js 16 default)
  turbopack: {},

  // Strict mode recommended
  reactStrictMode: true,

  // FIX: Move serverComponentsExternalPackages → serverExternalPackages
  serverExternalPackages: ["ably"],

  // Optional: ensure modularizeImports is valid
  experimental: {},
};

module.exports = nextConfig;
