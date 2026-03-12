/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'pk_live_Y2xlcmsuemFpYS1zdWl0ZXMuY29tJA',
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
