/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'pk_live_Y2xlcmsuemFpYS1zdWl0ZXMuY29tJA',
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY_DEV: 'pk_test_cG9ldGljLXB1cC05My5jbGVyay5hY2NvdW50cy5kZXYk',
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
