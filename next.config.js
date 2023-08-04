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
  },
};

module.exports = withPWA(nextConfig);
