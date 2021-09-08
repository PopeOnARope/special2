//@ts-ignore

import React, { FC, useMemo } from 'react'
import { useRouter } from 'next/router'

export interface State {
  displayCart: boolean
  displaySideNav: boolean

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

  const [state, setState] = React.useState({
    ...initialState,
    ...siteSettings,
  })

  const openCart = () =>
    setState((state) => ({
      ...state,
      displayCart: true,
    }))
  const closeCart = () =>
    setState((state) => ({
      ...state,
      displayCart: false,
    }))
  const toggleCart = () =>
    setState((prev) => ({
      ...prev,
      displayCart: !prev.displayCart,
      displaySideNav: false,
    }))

  const openSideNav = () =>
    setState((state) => ({
      ...state,
      displaySideNav: true,
    }))
  const closeSideNav = () =>
    setState((state) => ({
      ...state,
      displaySideNav: false,
    }))
  const toggleSideNav = () =>
    setState((prev) => ({
      ...prev,
      displaySideNav: !prev.displaySideNav,
      displayCart: false,
    }))
  const openProductDetails = () =>
    setState((state) => ({
      ...state,
      displayProductDetails: true,
    }))
  const closeProductDetails = () =>
    setState((state) => ({
      ...state,
      displayProductDetails: false,
    }))
  const toggleProductDetails = () =>
    setState((prev) => ({
      ...prev,
      displayProductDetails: !prev.displayProductDetails,
      displayCart: false,
    }))

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
