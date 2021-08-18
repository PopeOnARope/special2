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
      //height: '51px',
      width: '100%',
      minWidth: '300px',
      borderRadius: '0px',
      textAlign: 'left',
      padding: '0.7rem 1.5rem',
      fontSize: '1.125rem',
      boxShadow: '6px 5px 10px rgba(0,0,0,0.2)',
      transition: '0.3s ease-in-out',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      zIndex: 1,
      // ...styles,

      ' &:hover': {
        boxShadow: '6px 13px 21px rgba(0,0,0,0.4)',
      },

      '@media screen and (min-width: 768px)': {
        width: styles?.width || '432px',
      },
    }}
  >
    <span className="w-full">{children}</span>
    <span>
      <ArrowLeft orientation='right' />
    </span>
  </Tag>
)

export default _Button
