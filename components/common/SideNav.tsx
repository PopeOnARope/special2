/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import Footer from '../../blocks/Footer/Footer'
import { Themed, jsx, Text, Card, Grid, Divider, NavLink } from 'theme-ui'
import { FC, useEffect, useState } from 'react'
import { useUI } from '@components/ui/context'
import { ArrowLeft } from '@components/icons'

const data = {
  sections: [
    {
      title: 'websites',
      links: [
        {
          title: 'Shop',
          url: '#',
        },
        {
          title: 'About',
          url: '#',
        },
        {
          title: 'Sustainability and Giving Back',
          url: '#',
        },
      ],
    },
    {
      title: 'Contact',
      links: [
        {
          title: 'Friends@spec__ial.com',
          url: '#',
        },
        {
          title: 'FAQ',
          url: '#',
        },
        {
          title: 'Shipping & Returns',
          url: '#',
        },
      ],
    },
    {
      title: 'Social',
      links: [
        {
          title: 'Facebook',
          url: '#',
        },
        {
          title: 'Instagram',
          url: '#',
        },
      ],
    },
  ],
  bottomLinks: [
    {
      title: 'Terms and Conditions',
      url: '#',
    },
    {
      title: 'More Info',
      url: '#',
    },
    {
      title: 'Title',
      url: '#',
    },
  ],
}

const CartSidebarView: FC = () => {
  const { navigationLinks, toggleSideNav } = useUI()
  return (
    <Themed.div
      sx={{
        height: '100%',
        background: '#FFC391',
        padding: '126px 46px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Themed.div>
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
                  fontSize: '67px',
                  fontFamily: 'Value Sans Pro',
                  color: '#fff',
                  fontWeight: 400,
                  transition: 'all 0.25s',
                  '&:hover': { color: '#000' },
                  ' svg': {
                    transition: 'all 0.25s',
                    display: 'inline-block',
                    transform: 'rotate(180deg)',
                    marginLeft: 0,
                    color: '#fff',
                    opacity: 0,
                  },
                  '&:hover svg': {
                    marginLeft: 20,
                    color: '#000',
                    opacity: 1,
                  },
                }}
              >
                {link.title}
                <ArrowLeft height="67" width="67" />
              </Themed.a>
            </Themed.div>
          )
        })}
      </Themed.div>
      <div className="ml-6 flex flex-row space-between">
        {data.sections?.map((section) => (
          <div className="sm:w-80 flex flex-col justify-items-start">
            <h5 className="uppercase text-white font-bold mb-3">
              {section.title}
            </h5>

            {section?.links?.map((link) => (
              <a href={link.url} className="text-bold">
                {link.title}
              </a>
            ))}
          </div>
        ))}
        <div className="float-right flex flex-row mb-4">
          {data.bottomLinks?.map((link) => (
            <div className="mx-5">
              <a className="text-white" href={link.url}>
                {link.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </Themed.div>
  )
}

export default CartSidebarView
