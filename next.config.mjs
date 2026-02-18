export default {
  experimental: {
    optimizePackageImports: ["@mui/material", "@mui/icons-material"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wzoxtplnznkjdpgcqrlu.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'iydhlnnmncdkyqjwjxoe.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.themealdb.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
}