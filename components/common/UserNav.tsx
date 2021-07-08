/** @jsxRuntime classic */
/** @jsx jsx */
import { FC, Fragment } from 'react'
import { NounEyes } from '@components/icons'
import { useUI } from '@components/ui/context'
import { Button, jsx, Themed } from 'theme-ui'

interface Props {
  className?: string
}

const UserNav: FC<Props> = ({ className, children, ...props }) => {
  const { toggleCart, toggleSideNav, displayCart, displaySideNav } = useUI()
  const primaryColor = displayCart || displaySideNav ? '#000' : '#eee'
  const navItemStyles = {
    background: 'none',
    border: primaryColor,
    color: primaryColor,
    transition: 'all 0.25s',
    ' svg': { transition: 'all 0.25s', fill: primaryColor },
  }
  return (
    <Fragment>
      <Button sx={{ ...navItemStyles, '&:focus': { outline: 0} }} onClick={toggleCart} aria-label="Cart">
        <Themed.div sx={{ border: `1px solid ${primaryColor}`,  }}>2</Themed.div>
        Bag
      </Button>
      <Button sx={{ ...navItemStyles, '&:focus': { outline: 0} }} aria-label="Login">
        <NounEyes sx={{ margin: 0 }} />
        <span>Login</span>
      </Button>
    </Fragment>
  )
}

export default UserNav
