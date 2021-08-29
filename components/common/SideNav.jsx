/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { Themed, jsx, Text, Card, Grid, Divider, NavLink } from 'theme-ui'
import { useUI } from '@components/ui/context'
import { ArrowLeft } from '@components/icons'
import { withChildren } from '@builder.io/react'
import Footer from '../../blocks/Footer/Footer'

const SideNav = () => {
  const { navigationLinks, footerSections, bottomLinks, toggleSideNav } = useUI()
  return (
    <Themed.div
      sx={{
        height: '100%',
        background: '#FFC391',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Themed.div sx={{padding: '4rem 0rem 0rem 3rem'}}>
        {navigationLinks?.map((link) => {
          return (
            <Themed.div
              sx={{
                width: '100%',
              }}
            >
              <Themed.a
                href={link.link}
                sx={{
                  fontSize: '4rem',
                  fontFamily: 'Value Sans Pro',
                  color: '#fff',
                  fontWeight: 800,
                  transition: 'all 0.25s',
                  '&:hover': { color: '#000' },
                  ' svg': {
                    transition: 'all 0.25s',
                    display: 'inline-block',
                    transform: 'rotate(180deg)',
                    marginLeft: 0,
                    color: '#fff',
                    opacity: 0,
                    height: '3rem',
                    width: '3rem',
                  },
                  '&:hover svg': {
                    marginLeft: 10,
                    color: '#000',
                    opacity: 1,
                  },
                  ' @media (max-width: 768px)': {
                    fontSize: '3rem',
                    margin: '0rem',
                  },
                }}
              >
                {link.title}
                <ArrowLeft />
              </Themed.a>
            </Themed.div>
          )
        })}
      </Themed.div>
      <Footer sections={footerSections} bottomLinks={bottomLinks } headerColor='white' />
    </Themed.div>
  )
}
const sideNavWithChildren = withChildren(SideNav)
export default sideNavWithChildren
