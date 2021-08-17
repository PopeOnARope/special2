const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.BUNDLE_ANALYZE,
})

module.exports = bundleAnalyzer({
  future: {
    webpack5: true,
  },
  target: 'serverless',
  images: {
    domains: ['cdn.shopify.com', 'cdn.builder.io', 'via.placeholder.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              'frame-ancestors https://*.builder.io https://builder.io http://localhost:1234',
          },
        ],
      },
    ]
  },
  env: {
    // expose env to the browser
    SHOPIFY_STOREFRONT_API_TOKEN: 'dd0057d1e48d2d61ca8ec27b07d3c5e6',
    SHOPIFY_STORE_DOMAIN: 'somecoolsunglasses.myshopify.com',
    BUILDER_PUBLIC_KEY: 'd58e15993bf84115968f2dd035ee71a4',
    IS_DEMO: false,
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en-US'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en-US',
  },
})
