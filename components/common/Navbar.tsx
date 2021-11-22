/** @jsxRuntime classic */
/** @jsx jsx */
import React, { FC, useState, useEffect } from 'react'
import { useCart } from '@lib/shopify/storefront-data-hooks'
import { jsx, Themed, useThemeUI, Button } from 'theme-ui'
import { useUI } from '@components/ui/context'
import { Cross, Hamburger, SpecialLogo } from '@components/icons'
import Cookie from 'js-cookie'

const Navbar: FC = () => {
  const [rightContent, setRightContent] = useState(null)
  const [navClassNames, setNavClassNames] = useState('white')
  const { theme } = useThemeUI()
  const { toggleSideNav, toggleCart, displaySideNav, displayCart } = useUI()
  const cart = useCart()

  const totalItems = cart?.lineItems
    ?.map((item) => item.quantity)
    .reduce((num, tot) => num + tot, 0)
  const isScrollingInPage = false

  function getNavClassNames() {
    let classNames = ''
    if (
      window.location.href.includes('collection/seven') ||
      window.location.href.includes('seven') ||
      window.location.href.includes('signup') ||
      window.location.href.includes('eye_d') ||
      displaySideNav ||
      displayCart
    ) {
      classNames += ' nav-black'
    } else {
      classNames += ' nav-white'
    }
    if (
      !displaySideNav &&
      !window.location.href.includes('product') &&
      !window.location.href.includes('about')
    ) {
      classNames += ' hover-orange'
    }
    return classNames
  }

  useEffect(() => {
    setNavClassNames(getNavClassNames())
  })

  useEffect(() => {
    if (window.location.href.includes('signup')) {
      setRightContent('close')
    } else {
      setRightContent('cart')
    }
  })

  function decline() {
    Cookie.set('account', 'declined', { expires: 7 })
    window.location.href = '/'
  }

  return (
    <nav
      className={`navbar flex flex-row justify-between py-4  w-full fixed ${navClassNames}`}
      style={{ zIndex: 5000 }}
    >
      <div className="px-4 justify-center flex flex-col">
        <button onClick={toggleSideNav} style={{ mixBlendMode: 'difference' }}>
          {!displaySideNav ? (
            <Hamburger height="25px" />
          ) : (
            <Cross height="25px" />
          )}
        </button>
      </div>
      <div className="px-4 justify-center flex flex-col">
        <a href="/home" style={{ mixBlendMode: 'difference' }}>
          {' '}
          <SpecialLogo />
        </a>
      </div>
      <div className="px-4 justify-center flex flex-col">
        {
          rightContent === 'cart' ? <button onClick={toggleCart}>{totalItems}</button> :       <button
            className="absolute px-8 text-sm"
            style={{ right: 0, fontFamily: 'InputMono' }}
            onClick={decline}
          >
            Close
          </button>
        }

      </div>
    </nav>
  )
}

export default Navbar
