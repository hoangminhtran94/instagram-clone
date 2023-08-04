/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
});
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
    experimental: {
      serverActions: true,
    },
  },
};

module.exports = withPWA(nextConfig);
