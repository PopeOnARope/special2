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
  //background: #ffc391;
  padding: 0rem 46px;
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
  @media (max-width: 999px) {
    padding: 2rem 1.5rem;
  }
`

const Detail = ({ shownDetails, item, setShownDetails, detailFont, toggleFont }) => {
  return (
    <div className="w-full pb-4">
      <Button
        onClick={() => {
          shownDetails === item.title
            ? setShownDetails('')
            : setShownDetails(item.title)
        }}
        sx={{
          fontSize: '2rem',
          fontFamily: toggleFont || 'Value Sans Pro',
          color: '#fff',
          textAlign: 'left',
          fontWeight: 600,
          background: 'none',
          display: 'inherit',
          padding: '0.5rem 0',
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
            ' svg': {},
          },
        }}
      >
        {item?.title}
        <SwitchTransition mode="out-in">
          <CSSTransition
            title={shownDetails === item?.title}
            key={shownDetails === item?.title}
            classNames="icon"
            timeout={300}
          >
            {shownDetails === item.title ? (
              <Minus height="25" width="25" />
            ) : (
              <Cross
                height="25"
                width="25"
                style={{ transform: 'rotate(45deg)' }}
              />
            )}
          </CSSTransition>
        </SwitchTransition>
      </Button>
      <Collapse isOpened={shownDetails === item.title}>
        <div
          sx={{
            fontSize: '1.25rem',
            fontFamily: detailFont || 'Value Sans Pro',
            color: '#000',
            fontWeight: 400,
            lineHeight: '2rem',

            // marginLeft: '1.25rem',
          }}
          dangerouslySetInnerHTML={{ __html: item.content }}
        ></div>
      </Collapse>
    </div>
  )
}



const About = ({ sections, toggleFont='InputMono', detailFont='Value Sans Pro' }) => {
  const { toggleProductDetails } = useUI()

  const [shownDetails, setShownDetails] = React.useState('')

  return (
    <Wrapper>
      <Themed.div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginTop: '2rem',
        }}
      >
        <div className="flex flex-col">
          <div className="flex flex-col w-full">
            {sections?.map((item, idx) => {
              if (idx < 6) {
                return (
                  <Detail
                    item={item}
                    toggleFont={toggleFont}
                    detailFont={detailFont}
                    shownDetails={shownDetails}
                    setShownDetails={setShownDetails}
                    isShownDetails={shownDetails === item?.title}
                  />
                )
              }
            })}
          </div>
          <div className="flex flex-col w-1/2  lg:w-1/2">
            {sections?.map((item, idx) => {
              if (idx >= 6)
                return (
                  <Detail
                    detailFont={detailFont}
                    toggleFont={toggleFont}
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

export default About
