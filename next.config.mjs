/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SECRET_KEY: process.env.SECRET_KEY,
    NEXT_BASE_PUBLIC_URL: process.env.NEXT_BASE_PUBLIC_URL
  }
};

export default nextConfig;
