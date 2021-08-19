/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import Footer from '../../blocks/Footer/Footer'
import { Themed, Button, jsx } from 'theme-ui'
import { FC, useEffect, useState } from 'react'
import { useUI } from '@components/ui/context'
import { Cross } from '@components/icons'
import Collapse from 'react-collapse'
import { toCapitalizedWords } from '../../blocks/utils'

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

const Detail = ({shownDetails, item, setShownDetails})=>(
  <div className="w-full">
    <Button
      onClick={() => {
        shownDetails === item.title
          ? setShownDetails('')
          : setShownDetails(item.title)
      }}
      sx={{
        fontSize: '2.75rem',
        fontFamily: 'Value Sans Pro',
        color: '#fff',
        textAlign:'left',
        fontWeight: 700,
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
        '&:hover svg': {
          color: '#000',
          opacity: 1,
        },
      }}
    >
      {item.title}
      <Cross
        height="25"
        width="25"
        style={{ transform: 'rotate(45deg)' }}
      />
    </Button>
    <Collapse isOpened={shownDetails === item.title}>
      <p
        sx={{
          fontSize: '1.75rem',
          fontFamily: 'Value Sans Pro',
          color: '#000',
          fontWeight: 400,
          lineHeight: '2rem',
          marginLeft: '1rem',
        }}
      >
        {item.value}
      </p>
    </Collapse>
  </div>
)

const ProductDetails = ({ details }) => {
  const detailsArr = Object.keys(details).map((key) => ({
    title: toCapitalizedWords(key),
    value: details[key],
  }))
  console.log({ details })
  const { navigationLinks, toggleSideNav } = useUI()
  const [shownDetails, setShownDetails] = React.useState('')
  // return <div></div>

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
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col w-full lg:w-1/2">
          {detailsArr?.map((item, idx) => {
            if (idx < 6)
              return (
               <Detail item={item} shownDetails={shownDetails} setShownDetails={setShownDetails}/>
              )
          })}
        </div>
        <div className="flex flex-col w-1/2  lg:w-1/2">
          {detailsArr?.map((item, idx) => {
            if (idx >= 6)
              return (
                <Detail item={item} shownDetails={shownDetails} setShownDetails={setShownDetails}/>
              )
          })}
        </div>
      </div>
    </Themed.div>
  )
}

export default ProductDetails
