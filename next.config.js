/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
    ],
  },
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  
};

module.exports = nextConfig;
