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
  const { navigationLinks, toggleSideNav } = useUI()
  const [shownDetails, setShownDetails] = React.useState('')

  //return <div></div>

  return (
    <Themed.div
      sx={{
        height: '100vh',
        background: '#FFC391',
        padding: '118px 45px 30px 45px',
        display: 'flex',
        flexDirection: 'column',
        ' @media(max-width: 500px)': {
          padding: '86px 22px 20px 22px',
          width: '100%',
        },
      }}
    >
      <Themed.div
        sx={{
          height: '140px',
          width: '737px',
          ' @media(max-width: 500px)': {
            width: '100%',
          },
        }}
      >
        <p
          sx={{
            fontSize: '24px',
            fontWeight: 400,
            ' @media(max-width: 500px)': {
              fontSize: '16px',
            },
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s when an unknown printer took a galley.
        </p>
      </Themed.div>

      <Themed.div>
        {detailsArr?.map((item) => {
          return (
            <Themed.div
              sx={{
                width: '100%',
              }}
            >
              <Button
                onClick={() =>
                  setShownDetails(shownDetails === item.title ? '' : item.title)
                }
                sx={{
                  fontSize: '40px',
                  fontFamily: 'Value Sans Pro',
                  color: '#fff',
                  fontWeight: 400,
                  background: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'left',
                  transition: 'all 0.25s',
                  paddingLeft: 0,
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
                  '&:hover svg': {
                    color: '#000',
                    opacity: 1,
                  },

                  ' @media (max-width: 500px)': {
                    fontSize: '2rem',
                    textAlign: 'left',
                  },
                }}
              >
                {item.title}
                <Cross
                  height="5%"
                  width="5%"
                  style={{ transform: 'rotate(45deg)' }}
                />
              </Button>
              <Collapse isOpened={shownDetails === item.title}>
                <p
                  sx={{
                    fontSize: '24px',
                    fontFamily: 'Value Sans Pro',
                    color: '#000',
                    fontWeight: 400,
                    lineHeight: '28px',
                  }}
                >
                  {item.value}
                </p>
              </Collapse>
            </Themed.div>
          )
        })}
      </Themed.div>
    </Themed.div>
  )
}

export default ProductDetails
