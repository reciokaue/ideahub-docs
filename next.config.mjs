/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  output: 'export',
  basePath: isGithubPages ? '/ideahub-docs' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
