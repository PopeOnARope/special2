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

const Wrapper = styled.div`
  height: 100%;
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
          fontSize: '2.75rem',
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
            fontSize: '2.5rem',
          },
        }}
      >
        {item?.title}
        {/*<SwitchTransition mode="out-in">*/}
        {/*  <CSSTransition*/}
        {/*    title={shownDetails == item?.title}*/}
        {/*    classNames="icon"*/}
        {/*    timeout={300}*/}
        {/*  >*/}
            {shownDetails === item.title ? (
              <Minus height="25" width="25" />
            ) : (
              <Cross
                height="25"
                width="25"
                style={{ transform: 'rotate(45deg)' }}
              />
            )}
        {/*  </CSSTransition>*/}
        {/*</SwitchTransition>*/}
      </Button>
      <Collapse isOpened={shownDetails === item.title}>
        <p
          sx={{
            fontSize: '1.25rem',
            fontFamily: 'Value Sans Pro',
            color: '#000',
            fontWeight: 400,
            lineHeight: '2rem',
            // marginLeft: '1.25rem',

          }}
        >
          {item.value}
        </p>
      </Collapse>
    </div>
  )
}

const DetailsToggle = ({ onClick }) => (
  <Themed.div
    className="text-white hover:cursor-pointer"
    sx={{
      marginLeft: '-1rem',
      bottom: '6rem',
      alignSelf: 'flex-end',
      zIndex: 6,
      position: 'absolute',
      ' @media (max-width: 768px)': {
        bottom: '14rem',
        marginLeft: '0rem',
      },
    }}
  >
    <button
      className="active:outline-none focus:outline-none"
      onClick={onClick}
    >
      <ArrowLeft orientation="right" />
    </button>
  </Themed.div>
)

const ProductDetails = ({ details, productDescription }) => {
  const { toggleProductDetails } = useUI()
  console.log({ details })
  const [shownDetails, setShownDetails] = React.useState('')

  return (
    <Wrapper>
      <p className="type-wrapper font-bold max-w-64">{productDescription}</p>
      <DetailsToggle onClick={toggleProductDetails} />
      <Themed.div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginTop: '2rem'
        }}
      >
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col w-full lg:w-1/2">
            {details?.map((item, idx) => {
              if (idx < 6) {
                console.log({ item })
                return (
                  <Detail
                    item={item}
                    shownDetails={shownDetails}
                    setShownDetails={setShownDetails}
                    isShownDetails={
                      shownDetails === item?.title
                    }
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
