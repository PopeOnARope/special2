import React from 'react'
import styled from 'styled-components'
import {ArrowLeft} from '@components/icons'

const _Button = styled.button`
  background: ${(props) => props.background || '#000'};
  color: ${(props) => props.color || '#eee'};
  border: 1px solid ${(props) => props.background || '#000'};
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

const Button = ({ children, icon, background, color, ...rest }) => (
  <_Button {...rest}>
    <span className='w-full'>{children}</span>
    <span><ArrowLeft transform='rotate(180)'/></span>
  </_Button>
)

export default Button
