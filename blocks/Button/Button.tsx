//@ts-nocheck

import React from 'react'
// import styled from 'styled-components'
import { ThemeUIStyleObject } from '@theme-ui/css'
import { Button, Link, Theme } from 'theme-ui'
import { ArrowLeft } from '@components/icons'

interface ButtonProps {
  children: any
  icon?: any
  background?: string
  color?: string
  onClick?: any
  name?: string
  disabled?: boolean
  styles?: any
  displayAs?: string
  href?: string
}

interface TagProps {
  displayAs?: string
  sx: ThemeUIStyleObject
  children: any
  href?: string
}

const Tag: React.FC<TagProps> = ({ displayAs, children, ...rest }) => {
  return displayAs === 'link' ? (
    <Link {...rest}>{children}</Link>
  ) : (
    <Button {...rest}>{children}</Button>
  )
}

const _Button: React.FC<ButtonProps> = ({ children, styles, ...rest }) => (
  <Tag
    {...rest}
    sx={{
      background: '#000',
      color: '#eee',
      border: '1px solid #000',
      // height: '51px',
      width: '100%',
      minWidth: '300px',
      borderRadius: '0px',
      textAlign: 'left',
      padding: '0.4rem 1.5rem',
      fontSize: '1.125rem',
      boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.36)',
      transition: '0.3s ease-in-out',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      zIndex: 1,
      // ...styles,

      ' &:hover': {
        padding: '0.35rem 1.45rem',
        transition: '0.3s ease-in-out',
        boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.65)',
      },

      '@media screen and (min-width: 768px)': {
        width: styles?.width || '432px',
      },
    }}
  >
    <span className="w-full">{children}</span>
    <span>
      <ArrowLeft transform="rotate(180)" />
    </span>
  </Tag>
)

export default _Button
