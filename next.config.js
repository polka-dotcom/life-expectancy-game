/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/life-expectancy-game',
  assetPrefix: '/life-expectancy-game/',
}

module.exports = nextConfig
