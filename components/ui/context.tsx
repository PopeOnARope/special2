//@ts-ignore

import React, { FC, useMemo } from 'react'
import { useRouter } from 'next/router'

export interface State {
  displayCart: boolean
  displaySideNav: boolean
  navPrimaryColor?: string
  navigationLinks?: Array<{ link: string; title: string }>
  logo?: { image?: string; text: string; width: number; height: number }
  toggleCart?: any
  closeCart?: any
  openCart?: any
  toggleSideNav?: any
  closeSideNav?: any
  openSideNav?: any
}

const initialState = {
  displayCart: false,
  displaySideNav: false,
  navPrimaryColor: 'white',
}

type Action =
  | {
      type: 'OPEN_SIDEBAR'
    }
  | {
      type: 'CLOSE_SIDEBAR'
    }

export const UIContext = React.createContext<State>(initialState)

UIContext.displayName = 'UIContext'

export const UIProvider: FC<{ siteSettings: Partial<State> }> = ({
  siteSettings,
  children,
}) => {
  const { asPath } = useRouter()
  const navPrimaryColor =
    asPath.includes('collection') || asPath.includes('product')
      ? 'black'
      : 'white'

  const [state, setState] = React.useState({
    ...initialState,
    ...siteSettings,
    navPrimaryColor
  })

  // const navTheme =
  //   state.displayCart ||
  //   state.displaySideNav ||
  //   asPath.includes('collection') ||
  //   asPath.includes('product')
  //     ? { primaryColor: 'black' }
  //     : { primaryColor: 'white' }

  const openCart = () =>
    setState((state) => ({
      ...state,
      displayCart: true,
      navPrimaryColor: 'black',
    }))
  const closeCart = () =>
    setState((state) => ({
      ...state,
      displayCart: false,
      navPrimaryColor,
    }))
  const toggleCart = () =>(
    setState((prev) => ({
      ...prev,
      displayCart: !prev.displayCart,
      displaySideNav: false,
      navPrimaryColor: prev.displayCart ? navPrimaryColor : 'black'
    })))

  const openSideNav = () =>
    setState((state) => ({
      ...state,
      displaySideNav: true,
      navPrimaryColor: 'black',
    }))
  const closeSideNav = () =>
    setState((state) => ({
      ...state,
      displaySideNav: false,
      navPrimaryColor,
    }))
  const toggleSideNav = () =>(
    setState((prev) => ({
      ...prev,
      displaySideNav: !prev.displaySideNav,
      displayCart: false,
      navPrimaryColor: prev.displaySideNav ? navPrimaryColor : 'black'
    })))

  const value = {
    ...state,
    ...siteSettings,
    openCart,
    closeCart,
    toggleCart,
    openSideNav,
    closeSideNav,
    toggleSideNav,
  }

  console.log({value})

  return <UIContext.Provider value={value} children={children} />
}

export const useUI = () => {
  const context = React.useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export const ManagedUIContext: FC<{ siteSettings: Partial<State> }> = ({
  children,
  siteSettings,
}) => <UIProvider siteSettings={siteSettings}>{children}</UIProvider>
