/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure consistent build output
  generateBuildId: async () => {
    // Use a consistent build ID to prevent chunk mismatches
    return 'build-' + Date.now();
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config, { isServer, dev }) => {
    // Fix for WebGL context issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // Fix webpack cache issues in development
    if (dev) {
      // Disable webpack cache to prevent stale chunk references
      config.cache = false;
      
      // Ensure consistent chunk naming
      config.output = {
        ...config.output,
        chunkFilename: isServer
          ? 'server/chunks/[name].js'
          : 'static/chunks/[name]-[contenthash].js',
      };
    }
    
    return config;
  },
  // Disable webpack cache warnings (they're just warnings, not errors)
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Experimental: Fix chunk loading in development
  experimental: {
    // Ensure consistent chunk loading
    optimizePackageImports: [],
  },
}

module.exports = nextConfig
