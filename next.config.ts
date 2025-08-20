import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // Enforce type and lint correctness for better quality & SEO stability
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tezzasolutions.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
