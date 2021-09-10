/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import Footer from '../../blocks/Footer/Footer'
import { Themed, Button, jsx } from 'theme-ui'
import { FC, useEffect, useState } from 'react'
import { useUI } from '@components/ui/context'
import { ArrowLeft, Cross, Minus } from '@components/icons'
import Collapse from 'react-collapse'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import styled from 'styled-components'
import { isMobile } from '@lib/isMobile'

const Wrapper = styled.div`
  min-height: 100%;
  background: #ffc391;
  padding: 5rem 46px;
  display: inherit;

  .icon-enter {
    opacity: 0;
  }
  .icon-enter-active {
    opacity: 1;
    transition: opacity 0.3s;
  }
  .icon-exit {
    opacity: 1;
  }
  .icon-exit-active {
    opacity: 0;
    transition: opacity 0.3s;
  }
  @media (max-width: 768px) {
    padding: 5rem 1.5rem;
  }
  @media (max-width: 640px) {
    padding: 5rem 2.5rem;
  }
`

const Detail = ({ shownDetails, item, setShownDetails }) => {
  return (
    <div className="w-full">
      <Button
        onClick={() => {
          shownDetails === item.title
            ? setShownDetails('')
            : setShownDetails(item.title)
        }}
        sx={{
          fontSize: '2.25rem',
          fontFamily: 'Value Sans Pro',
          color: '#fff',
          textAlign: 'left',
          fontWeight: 700,
          background: 'none',
          display: 'inherit',
          padding: '0',
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
          ' @media (max-width: 768px)': {
            fontSize: '2rem',
          },
        }}
      >
        {item?.title}

        {shownDetails === item.title ? (
          <Minus height="25" width="25" />
        ) : (
          <Cross
            height="25"
            width="25"
            style={{ transform: 'rotate(45deg)' }}
          />
        )}
      </Button>
      <Collapse isOpened={shownDetails === item.title}>
        <div
          sx={{
            fontSize: '1.25rem',
            fontFamily: 'Value Sans Pro',
            color: '#000',
            fontWeight: 400,
            lineHeight: '2rem',
            // marginLeft: '1.25rem',
          }}
          dangerouslySetInnerHTML={{ __html: item.value }}
        ></div>
      </Collapse>
    </div>
  )
}

const DetailsToggle = ({ onClick }) => (
  <Themed.div
    className="text-white hover:cursor-pointer"
    sx={{
      marginLeft: '-3rem',
      bottom: '10rem',
      alignSelf: 'flex-end',
      zIndex: '1000',
      position: 'absolute',
      ' @media (max-width: 768px)': {
        bottom: '20rem',
      },
      ' @media (max-width: 640px)': {
        bottom: '30rem',
        marginLeft: '-3.25rem',
      },
    }}
  >
    <button
      className="active:outline-none focus:outline-none flex flex-row justify-center items-center type-wrapper"
      onClick={onClick}
      style={{ transform: 'rotate(90deg)' }}
    >
      Close
      <ArrowLeft orientation="down" />
    </button>
  </Themed.div>
)

const ProductDetails = ({ details, productDescription, setShowBuyButton }) => {
  const { toggleProductDetails } = useUI()
  const [shownDetails, setShownDetails] = React.useState('')
  React.useEffect(() => {
    if (isMobile()) {
      setShowBuyButton(!shownDetails.length)
    }
  })

  return (
    <Wrapper>
      <p
        className="type-wrapper font-bold max-w-64"
        dangerouslySetInnerHTML={{ __html: productDescription }}
      ></p>
      <DetailsToggle
        onClick={() => {
          toggleProductDetails()
          setShowBuyButton(true)
        }}
      />
      <Themed.div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginTop: '2rem',
        }}
      >
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col w-full lg:w-1/2">
            {details?.map((item, idx) => {
              if (idx < 6) {
                return (
                  <Detail
                    item={item}
                    shownDetails={shownDetails}
                    setShownDetails={setShownDetails}
                    isShownDetails={shownDetails === item?.title}
                  />
                )
              }
            })}
          </div>
          <div className="flex flex-col w-1/2  lg:w-1/2">
            {details?.map((item, idx) => {
              if (idx >= 6)
                return (
                  <Detail
                    item={item}
                    shownDetails={shownDetails}
                    setShownDetails={setShownDetails}
                  />
                )
            })}
          </div>
        </div>
      </Themed.div>
    </Wrapper>
  )
}

export default ProductDetails
