/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
   
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'randomuser.me',
      },
      {
        hostname: 's3.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
