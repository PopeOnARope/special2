//@ts-ignore

import React, { FC, useMemo } from 'react'
import { useRouter } from 'next/router'

export interface State {
  displayCart: boolean
  displaySideNav: boolean
  navPrimaryColor?: string
  navSecondaryColor?: string
  navigationLinks?: Array<{ link: string; title: string }>
  logo?: { image?: string; text: string; width: number; height: number }
  toggleCart?: any
  closeCart?: any
  openCart?: any
  toggleSideNav?: any
  closeSideNav?: any
  openSideNav?: any
  toggleProductDetails?: any
  closeProductDetails?: any
  openProductDetails?: any
}

const initialState = {
  displayCart: false,
  displaySideNav: false,
  displayProductDetails: false,
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
  console.log({siteSettings})
  const navPrimaryColor =
    asPath.includes('collection') || asPath.includes('product')
      ? 'black'
      : 'white'

  const navSecondaryColor =
    asPath.includes('collection') || asPath.includes('product')
      ? '#E5E5E5'
      : 'black'

  const [state, setState] = React.useState({
    ...initialState,
    ...siteSettings,
    navPrimaryColor,
    navSecondaryColor
  })


  const openCart = () =>
    setState((state) => ({
      ...state,
      displayCart: true,
      navPrimaryColor: 'black',
      navSecondaryColor:'#E5E5E5',
    }))
  const closeCart = () =>
    setState((state) => ({
      ...state,
      displayCart: false,
      navPrimaryColor,
      navSecondaryColor
    }))
  const toggleCart = () =>(
    setState((prev) => ({
      ...prev,
      displayCart: !prev.displayCart,
      displaySideNav: false,
      navPrimaryColor: prev.displayCart ? navPrimaryColor : 'black',
      navSecondaryColor: prev.displayCart ? navSecondaryColor : '#E5E5E5',


    })))

  const openSideNav = () =>
    setState((state) => ({
      ...state,
      displaySideNav: true,
      navPrimaryColor: 'black',
      navSecondaryColor: '#E5E5E5'
    }))
  const closeSideNav = () =>
    setState((state) => ({
      ...state,
      displaySideNav: false,
      navPrimaryColor,
      navSecondaryColor
    }))
  const toggleSideNav = () =>(
    setState((prev) => ({
      ...prev,
      displaySideNav: !prev.displaySideNav,
      displayCart: false,
      navPrimaryColor: prev.displaySideNav ? navPrimaryColor : 'black',
      navSecondaryColor: prev.displayCart ? navSecondaryColor : '#E5E5E5',
    })))
  const openProductDetails = () =>
    setState((state) => ({
      ...state,
      displayProductDetails: true,
      navPrimaryColor: 'black',
      navSecondaryColor: '#E5E5E5',

    }))
  const closeProductDetails = () =>
    setState((state) => ({
      ...state,
      displayProductDetails: false,
      navPrimaryColor,
      navSecondaryColor
    }))
  const toggleProductDetails = () =>(
    setState((prev) => ({
      ...prev,
      displayProductDetails: !prev.displayProductDetails,
      displayCart: false,
      navPrimaryColor: prev.displayProductDetails ? navPrimaryColor : 'black',
      navSecondaryColor: prev.displayProductDetails ? navSecondaryColor : '#E5E5E5',

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
    openProductDetails,
    closeProductDetails,
    toggleProductDetails,
  }


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
