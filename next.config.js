/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  },
};

module.exports = nextConfig;
