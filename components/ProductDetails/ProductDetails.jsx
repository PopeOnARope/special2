/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import Footer from '../../blocks/Footer/Footer'
import { Themed, Button, jsx } from 'theme-ui'
import { FC, useEffect, useState } from 'react'
import { useUI } from '@components/ui/context'
import { Cross } from '@components/icons'
import Collapse from 'react-collapse'

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

const ProductDetails = ({ details }) => {
  const detailsArr = Object.keys(details).map((key) => ({
    title: key,
    value: details[key],
  }))
  console.log({ detailsArr })
  const { navigationLinks, toggleSideNav } = useUI()
  const [shownDetails, setShownDetails] = React.useState('')
  //return <div></div>

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
        {detailsArr?.map((item) => {
          return (
            <Themed.div
              sx={{
                width: '100%',
              }}
            >
              <Button
                onClick={() => setShownDetails(item.title)}
                sx={{
                  fontSize: '40px',
                  fontFamily: 'Value Sans Pro',
                  color: '#fff',
                  fontWeight: 400,
                  background: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.25s',
                  '&:focus': {
                    outline: 'none',
                  },

                  ' svg': {
                    transition: 'all 0.25s',
                    display: 'inline-block',
                    transform: 'rotate(180deg)',
                    marginLeft: 10,

                    color: '#fff',

                  },
                  '&:hover': { color: '#000' },
                  '&:selected': { color: '#000' },
                  '&:hover svg': {

                    color: '#000',
                    opacity: 1,
                  },
                }}
              >
                {item.title}
                <Cross height="54" width="54" style={{ transform: 'rotate(45deg)' }} />
              </Button>
              <Collapse isOpened={shownDetails === item.title}>
                <p
                  sx={{
                    fontSize: '24px',
                    fontFamily: 'Value Sans Pro',
                    color: '#000',
                    fontWeight: 400,
                    lineHeight: '28px',
                    padding: '8px 16px',
                    width: '50%',
                  }}
                >{item.value}</p>
              </Collapse>
            </Themed.div>
          )
        })}
      </Themed.div>
    </Themed.div>
  )
}

export default ProductDetails
