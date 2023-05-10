/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "replicate.com",
      "replicate.delivery",
      "user-images.githubusercontent.com",
      "upcdn.io",
    ],
    loader: "akamai",
    path: "",
  },
  trailingSlash: true,
};

module.exports = nextConfig;
