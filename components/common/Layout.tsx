/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { ThemeProvider, jsx, Themed, Close } from 'theme-ui'
import dynamic from 'next/dynamic'
import { ManagedUIContext, useUI } from '@components/ui/context'
import { Head, Navbar } from '@components/common'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import Button from '../../blocks/Button/Button'
import { LoadingDots, Sidebar } from '@components/ui'
import { CartSidebarView } from '@components/cart'
import { SideNav } from '@components/common'
import ProductDetails from '../ProductDetails/ProductDetails'
import { CommerceProvider } from '@lib/shopify/storefront-data-hooks'
import shopifyConfig from '@config/shopify'
import { builder, BuilderContent, Builder } from '@builder.io/react'
import themesMap from '@config/theme'
import '@builder.io/widgets'
import 'react-spring-modal/styles.css'
import seoConfig from '@config/seo.json'
import NoSSR from './NoSSR'
import styled from 'styled-components'
import { ArrowLeft } from '@components/icons'
import { fbEvent } from '@rivercode/facebook-conversion-api-nextjs'
import Cookies from 'js-cookie'

const FeatureBar = dynamic(() => import('@components/common/FeatureBar'), {
  ssr: false,
})

const Layout: React.FC<{ pageProps: any }> = ({ children, pageProps }) => {
  const builderTheme = pageProps.theme
  const isLive = !Builder.isEditing && !Builder.isPreviewing
  return (
    <CommerceProvider {...shopifyConfig}>
      <BuilderContent
        isStatic
        {...(isLive && { content: builderTheme })}
        modelName="theme"
      >
        {(data, loading) => {
          if (loading && !builderTheme) {
            return 'loading...'
          }
          const siteSettings = data?.siteSettings
          const colorOverrides = data?.colorOverrides
          const siteSeoInfo = data?.siteInformation
          return (
            <ManagedUIContext key={data?.id} siteSettings={siteSettings}>
              <div className="type-wrapper">
                <Head seoInfo={siteSeoInfo || seoConfig} />
                <InnerLayout
                  themeName={data?.theme || 'base'}
                  colorOverrides={colorOverrides}
                >
                  {children}
                </InnerLayout>
              </div>
            </ManagedUIContext>
          )
        }}
      </BuilderContent>
    </CommerceProvider>
  )
}

const InnerLayout: React.FC<{
  themeName: string
  colorOverrides?: {
    text?: string
    background?: string
    primary?: string
    secondary?: string
    muted?: string
  }
}> = ({ themeName, children, colorOverrides }) => {
  const theme = {
    ...themesMap[themeName],
    colors: {
      ...themesMap[themeName].colors,
      ...colorOverrides,
    },
  }

  const [location, setLocation] = React.useState('')

  React.useEffect(()=>{
    setLocation(window.location.pathname)
  })
  React.useEffect(()=>{
    //@ts-ignore
    // wde

  },[])
  const { displayCart, closeCart, displaySideNav, closeSideNav } = useUI()
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  return (
    <ThemeProvider theme={theme}>
      {location !== '' && location !== '/' &&
        <Navbar />}
      <div
        sx={{
          margin: `0 auto`,
          px: 0,
          minWidth: '60vw',
        }}
      >
        <main>{children}</main>
      </div>

      <Sidebar
        open={
          displayCart ||
          (builder.editingModel || Builder.previewingModel) ===
            'cart-upsell-sidebar'
        }
        onClose={closeCart}
        from="right"
        zIndex={1000}
      >
        <CartSidebarView />
      </Sidebar>
      <Sidebar
        open={displaySideNav}
        onClose={closeSideNav}
        from="left"
        zIndex={1000}
      >
        <SideNav />
      </Sidebar>

      <NoSSR>
        <FeatureBar
          title="We use cookies to ensure that we give you the best experience."
          hide={Builder.isEditing || location === '' || location === '/' || location === '/signup' ? true : acceptedCookies}
          action={
            <button
              className="bg-black text-white flex flex-row text-lg w-96 justify-between items-center px-8 py-2 type-wrapper "
              onClick={() => onAcceptCookies()}
            >
              Accept <ArrowLeft orientation="right" />
            </button>
          }
        />
      </NoSSR>
    </ThemeProvider>
  )
}

export default Layout
