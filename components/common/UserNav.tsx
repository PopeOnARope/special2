/** @jsxRuntime classic */
/** @jsx jsx */
import { FC, Fragment, ReactChildren } from 'react'
import { Bag, NounEyes } from '@components/icons'
import { useUI } from '@components/ui/context'
import { useCart, useCheckoutUrl } from '@lib/shopify/storefront-data-hooks'
import { Button, jsx, Themed } from 'theme-ui'

interface Props {
  isScrollingInPage: boolean
}

const UserNav: FC<Props> = ({ isScrollingInPage }) => {
  const cart = useCart()
  const totalItems = cart?.lineItems
    ?.map((item) => item.quantity)
    .reduce((num, tot) => num + tot)

  const { toggleCart, toggleSideNav, navPrimaryColor, displaySideNav } = useUI()
  const PC = isScrollingInPage ? 'black' : navPrimaryColor
  const navItemStyles = {
    background: 'none',
    border: PC,
    color: PC,
    transition: 'all 0.25s',
    ' svg': { transition: 'all 0.25s', fill: PC },
  }
  return (
    <Themed.div
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
    >
      <Button
        sx={{ ...navItemStyles, '&:focus': { outline: 0 } }}
        onClick={toggleCart}
        aria-label="Cart"
      >
        {/*<Bag/>*/}
        <Themed.div sx={{ padding: '0px 15px' }}>{totalItems}</Themed.div>
      </Button>
      {/*<Button sx={{ ...navItemStyles, '&:focus': { outline: 0} }} aria-label="Login">*/}
      {/*  <NounEyes sx={{ margin: 0 }} />*/}
      {/*  <span>Login</span>*/}
      {/*</Button>*/}
    </Themed.div>
  )
}

export default UserNav
