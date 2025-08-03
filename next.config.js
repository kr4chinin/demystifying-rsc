const nextConfig = {
  trailingSlash: true,
  // Ensure source files are copied to the build output
  experimental: {
    outputFileTracingRoot: process.cwd(),
  },
  // Copy source files to public directory for runtime access
  async rewrites() {
    return [
      {
        source: '/sources/:path*',
        destination: '/api/sources/:path*',
      },
    ];
  },
}
module.exports = nextConfig
