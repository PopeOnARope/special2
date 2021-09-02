import React from 'react'
import styled from 'styled-components'
export const H1 = styled.h1`
  margin-left: 0;
  font-family: 'Value Sans Pro';
  font-size: 5rem;
  color: ${(props) => props.color || '#ffffff'};
  font-weight: 400;
  @media (max-width: 768px) {
    font-size: 4rem;
  }
`

export const SecondaryH1 = styled.h1`
  margin-top: -70px;
  margin-left: ${ (props)=> (props.leftPad ? '25px' : '0px')};
  font-family: 'Value Sans Pro';
  font-size: 5rem;
  color: ${(props) => props.color || '#ffffff'};
  font-weight: 400;
  padding: 0px;
  @media (max-width: 1024px) {
    margin-top: -60px !important;
  }
  @media (max-width: 768px) {
    margin-top: -40px !important;
    font-size: 4rem;
  }

`
