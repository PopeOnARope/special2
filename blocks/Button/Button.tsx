import React from 'react'
import styled from 'styled-components'
import {ArrowLeft} from '@components/icons'
import { ForwardRef } from '@theme-ui/components'

const _Button = styled.button`
  background: #000;
  color: #eee;
  border: 1px solid #000;
  height: 51.15191650390625px;
  width: 432.23297119140625px;
  border-radius: 0px;
  text-align: left;
  padding: 0 21px;
  font-size: 18px;
  box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.36);
  transition: 0.3s ease-in-out;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  &:hover {
    padding: 0 24px;
    transition: 0.3s ease-in-out;
    box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.65);
  }
`

interface ButtonProps {
  children: any
  icon?: any
  background?: string
  color?: string
  onClick?: any
  name?: string
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <_Button {...rest}>
    <span className='w-full'>{children}</span>
    <span><ArrowLeft transform='rotate(180)'/></span>
  </_Button>
)

export default Button
