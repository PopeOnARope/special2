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
  const { theme } = useThemeUI()
  const { logo, toggleSideNav, navPrimaryColor} = useUI()
  const cart = useCart()

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


  const navItemStyles = {
    background: 'none',
    border: navPrimaryColor,
    color: navPrimaryColor,
    transition: 'all 0.25s',
    ' svg': {
      transition: 'all 0.25s',
      fill: navPrimaryColor,
      stroke: navPrimaryColor,
    },
  }

  return (
    <React.Fragment>
      <Themed.div
        as="header"
        sx={{
          margin: `0`,
          // maxWidth: 1920,
          padding: '10px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '100px',
          position: 'absolute',
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
          <Button sx={{ ...navItemStyles, padding: '0', height: '100%', '&:focus': { outline: 0} }} onClick={toggleSideNav}><Hamburger height='25px' /></Button>
        </Themed.div>
        <Themed.div
          sx={{
            transform: 'translateX(-50%)',
            left: '50%',
            position: 'absolute',
          }}
        >
          <Themed.h1
            sx={{
              fontSize: 20,
              fontWeight: 'bold',
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
              <SpecialLogo fill={navPrimaryColor} />
            </Themed.a>

            {logo && logo.text && !logo.image && (
              <Themed.a
                as={Link}
                href="/"
                sx={{
                  letterSpacing: -1,
                  textDecoration: `none`,
                  paddingLeft: '5px',
                }}
              >
                {logo.text}
              </Themed.a>
            )}
          </Themed.h1>
        </Themed.div>
        <Themed.div
          sx={{
            display: 'flex',
            minWidth: 140,
            width: '100%',
            justifyContent: ['space-between', 'flex-end'],
          }}
        >
          <UserNav />
        </Themed.div>
      </Themed.div>
    </React.Fragment>
  )
}

export default Navbar
