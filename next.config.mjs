// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      // তোমার বর্তমানে যা লাগছে
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // তোমার পুরানো গুলো রাখো (ভবিষ্যতের জন্য)
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // সবচেয়ে নিরাপদ: সব https ডোমেইন allow করো (ডেভেলপমেন্টের জন্য)
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;