import React, { FC, useMemo } from 'react'

export interface State {
  displayCart: boolean
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
  displaySideMenu: false,
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
  const [state, setState] = React.useState({
    ...initialState,
    ...siteSettings,
  })

  const openCart = () => setState(() => ({ displayCart: true }))
  const closeCart = () => setState(() => ({ displayCart: false }))
  const toggleCart = () =>
    setState((prev) => ({ displayCart: !prev.displayCart }))

  const openSideNav = () => setState(() => ({ displaySideNav: true }))
  const closeSideNav = () => setState(() => ({ displaySideNav: false }))
  const toggleSideNav = () =>
    setState((prev) => ({ displaySideNav: !prev.displaySideNav }))

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
