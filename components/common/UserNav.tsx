/** @jsxRuntime classic */
/** @jsx jsx */
import { FC, Fragment, ReactChildren } from 'react'
import { Bag, NounEyes } from '@components/icons'
import { useUI } from '@components/ui/context'
import { Button, jsx, Themed } from 'theme-ui'

interface Props {
}

const UserNav: FC<Props> = () => {
  const { toggleCart, toggleSideNav, navPrimaryColor, displaySideNav } = useUI()
  const navItemStyles = {
    background: 'none',
    border: navPrimaryColor,
    color: navPrimaryColor,
    transition: 'all 0.25s',
    ' svg': { transition: 'all 0.25s', fill: navPrimaryColor },
  }
  return (
    <Themed.div sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
      <Button sx={{ ...navItemStyles, '&:focus': { outline: 0} }} onClick={toggleCart} aria-label="Cart">
        {/*<Bag/>*/}
        <Themed.div sx={{ border: `1px solid ${navPrimaryColor}`, padding: '0px 15px'  }}>0</Themed.div>
        Bag
      </Button>
      {/*<Button sx={{ ...navItemStyles, '&:focus': { outline: 0} }} aria-label="Login">*/}
      {/*  <NounEyes sx={{ margin: 0 }} />*/}
      {/*  <span>Login</span>*/}
      {/*</Button>*/}
    </Themed.div>
  )
}

export default UserNav
