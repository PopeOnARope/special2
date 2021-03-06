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
    SHOPIFY_STOREFRONT_API_TOKEN: process.env.SHOPIFY_STOREFRONT_API_TOKEN,
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
    BUILDER_PUBLIC_KEY: process.env.BUILDER_PUBLIC_KEY,
    KLAVIYO_API_KEY: process.env.KLAVIYO_API_KEY,
    KLAVIYO_LIST_ID: process.env.KLAVIYO_LIST_ID,
    FACEBOOK_PIXEL_ID: process.env.FACEBOOK_PIXEL_ID,
    FB_ACCESS_TOKEN:process.env.FB_ACCESS_TOKEN,
    NEXT_PUBLIC_GOOGLE_ANALYTICS:process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
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
