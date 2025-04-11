/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/life-expectancy-game',
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
