import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  font-family: Value Sans Pro;
  font-size: 20px;
  position: relative;
  height: 76px;
  input {
    z-index: 10;
    position: absolute;
    background-color: transparent;
    border-bottom: 2px solid black;
    width: 100%;

    &:active,
    &:focus {
      outline: none;

      & + .label-text {
        font-size: 20px;
        margin-top: 34px;
      }
    }
  }
  .label-text{
    z-index: 1;
    position: absolute;
    transition: all 0.3s;
  }
`
const TextInput = ({ label, name, onChange }) => (
  <Wrapper>
    <input />
    <label className="label-text">{label}</label>
  </Wrapper>
)
export default TextInput
