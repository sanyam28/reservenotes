/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_BASE_PUBLIC_URL: process.env.NEXT_BASE_PUBLIC_URL
  }
};

export default nextConfig;
