import '@assets/main.css'
import 'keen-slider/keen-slider.min.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import '../src/tailwind.output.css'

import { builder, Builder } from '@builder.io/react'
import builderConfig from '@config/builder'
builder.init(builderConfig.apiKey)

import '../blocks/ProductGrid/ProductGrid.builder'
import '../blocks/CollectionView/CollectionView.builder'
import '../blocks/ProductView/ProductView.builder'
import '../blocks/Text/Text.builder'
import '../blocks/Button/Button.builder'
import '../blocks/Carousel/Carousel.builder'
import '../blocks/Footer/Footer.builder'
import '../blocks/Marquee/Marquee.builder'
import '../blocks/Signup/Signup.builder'
import '../blocks/About/About.builder'
import '../blocks/Text/Text.builder'
import '../blocks/AccountCreate/AccountCreate.builder'
import '../blocks/Video/Video.builder'
import '../blocks/Redirect/Redirect.builder'
import '../src/typography.css'

Builder.register('insertMenu', {
  name: 'Shopify Collections Components',
  items: [
    { name: 'CollectionBox', label: 'Collection stuff' },
    { name: 'ProductCollectionGrid' },
    { name: 'CollectionView' },
  ],
})

Builder.register('insertMenu', {
  name: 'Shopify Products Components',
  items: [
    { name: 'ProductGrid' },
    { name: 'ProductBox' },
    { name: 'ProductView' },
  ],
})

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  // useEffect(() => {
  //   import('react-facebook-pixel')
  //     .then((x) => x.default)
  //     .then((ReactPixel) => {
  //       ReactPixel.init(facebookConfig.facebookPixelId) // facebookPixelId
  //       ReactPixel.pageView()
  //     })
  // })

  return (
    <>
      <Layout pageProps={pageProps}>
          <Component {...pageProps} />
      </Layout>
    </>
  )
}
