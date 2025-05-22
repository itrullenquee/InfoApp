/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.freebiesupply.com",
      "store.storeimages.cdn-apple.com",
      "www.apple.com",
      "help.apple.com" // Agregando el nuevo dominio
    ],
  },
};

module.exports = nextConfig;
