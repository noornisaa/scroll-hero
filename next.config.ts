/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensures CSS and JS assets load correctly from your GitHub repository subpath
  basePath: isProd ? '/scroll-hero' : '',
};

export default nextConfig;