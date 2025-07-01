/** @type {import('next').NextConfig} */
const repoName = process.env.NEXT_PUBLIC_REPO_NAME || '';
const isProd = process.env.NODE_ENV === 'production' && repoName;

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? `/${repoName}/` : '',
  basePath: isProd ? `/${repoName}` : '',
};

export default nextConfig;