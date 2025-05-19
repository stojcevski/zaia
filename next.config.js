/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_MAP_API_KEY: 'AIzaSyC2gB-F9shVW--JYJvTPhqGenmlQBMTlu4',
    GMAIL_USER: 'zaiasuites@gmail.com',
    GMAIL_PASS: 'mtli chdm izem vqgg',
    RECIPIENTS: 'zaiasuites@gmail.com'
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
