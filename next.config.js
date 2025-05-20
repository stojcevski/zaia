/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_MAP_API_KEY: 'AIzaSyC2gB-F9shVW--JYJvTPhqGenmlQBMTlu4',
    GMAIL_USER: 'zaiasuites@gmail.com',
    GMAIL_PASS: 'mtli chdm izem vqgg',
    RECIPIENTS: 'zaiasuites@gmail.com',
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'pk_live_Y2xlcmsuemFpYS1zdWl0ZXMuY29tJA',
    CLERK_SECRET_KEY: 'sk_live_e1CsQ0a5wAiKQ6kBhaq5IqxBPwYzlP3RQoe1DYd6Ez',
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY_DEV: 'pk_test_cG9ldGljLXB1cC05My5jbGVyay5hY2NvdW50cy5kZXYk',
    CLERK_SECRET_KEY_DEV: 'sk_test_LfWf2n8i9N9idwGzb7p6IJlBIKDkPISvomAf62ulW1',
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
