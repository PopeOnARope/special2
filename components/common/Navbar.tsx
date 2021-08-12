/** @jsxRuntime classic */
/** @jsx jsx */
import React, { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { UserNav } from '@components/common'
import env from '@config/env'
import { BuilderComponent, builder } from '@builder.io/react'
import { useCart } from '@lib/shopify/storefront-data-hooks'
import { jsx, Themed, useThemeUI, Button } from 'theme-ui'
import { useUI } from '@components/ui/context'
import Image from 'next/image'
import Searchbar from './Searchbar'
import { Hamburger, SpecialLogo } from '@components/icons'

const Navbar: FC = () => {
  const [announcement, setAnnouncement] = useState()
  const [isWindowTop, setIsWindowTop] = useState(true)
  const { theme } = useThemeUI()
  const { logo, toggleSideNav, navPrimaryColor, navSecondaryColor, displaySideNav, displayCart } = useUI()
  const cart = useCart()
  const isScrollingInPage = !isWindowTop && !displayCart && !displaySideNav

  useEffect(() => {
    async function fetchContent() {
      const items = cart?.lineItems || []
      const anouncementContent = await builder
        .get('announcement-bar', {
          cachebust: env.isDev,
          userAttributes: {
            itemInCart: items.map((item: any) => item.variant.product.handle),
          } as any,
        })
        .toPromise()
      setAnnouncement(anouncementContent)
    }
    fetchContent()
  }, [cart?.lineItems])

  const [bg, setBg] = React.useState('none')
  // React.useEffect(()=>{
  //   window.addEventListener('scroll', ()=>{
  //     if(!window.scrollY)
  //   })
  // })

  const navItemStyles = {
    background:'none',
    border: navPrimaryColor,
    color: isScrollingInPage ? 'black' :  navPrimaryColor,
    transition: 'all 0.25s',
    ' svg': {
      transition: 'all 0.25s',
      fill: isScrollingInPage ? 'black' :  navPrimaryColor,
      stroke: isScrollingInPage ? 'black' :  navPrimaryColor,
    },
  }

  React.useEffect(() => {
    function updateScrollTop() {
      const _isWindowTop = !window.scrollY
      const { scrollY } = window
      if (_isWindowTop !== isWindowTop) {
        console.log(isWindowTop)
        setIsWindowTop(_isWindowTop)
      }
    }
    window.addEventListener('scroll', updateScrollTop, { passive: false })
    return function cleanup() {
      window.removeEventListener('scroll', updateScrollTop)
    }
  })

  return (
    <React.Fragment>
      <Themed.div
        as="header"
        sx={{
          margin: `0`,
          // maxWidth: 1920,
          padding: '0rem 1rem',
          background: isScrollingInPage ? 'rgba(255,255,255,0.5)' : 'none',
          transition: 'background 0.3s',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '5rem',
          position: 'fixed',
          zIndex: '1000',
          ' a': {
            ...navItemStyles,
          },
        }}
      >
        <Themed.div
          sx={{
            // display: ['none', 'none', 'flex'],
            flexBasis: 0,
            minWidth: 240,
            justifyContent: 'space-evenly',
          }}
        >
          <Button
            sx={{
              ...navItemStyles,
              padding: '0',
              height: '100%',
              '&:focus': { outline: 0 },
            }}
            onClick={toggleSideNav}
          >
            <Hamburger height="25px" />
          </Button>
        </Themed.div>
        <Themed.div
          sx={{
            transform: 'translateX(-50%)',
            left: '50%',
            position: 'absolute',
          }}
        >
          <Themed.a
            as={Link}
            href="/"
            sx={{
              letterSpacing: -1,
              textDecoration: `none`,
              paddingLeft: '5px',
            }}
          >
            <SpecialLogo fill={isScrollingInPage ?   'black' : navPrimaryColor} />
          </Themed.a>
        </Themed.div>
        <Themed.div
          sx={{
            display: 'flex',
            minWidth: 140,
            width: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <UserNav isScrollingInPage={isScrollingInPage} />
        </Themed.div>
      </Themed.div>
    </React.Fragment>
  )
}

export default Navbar
