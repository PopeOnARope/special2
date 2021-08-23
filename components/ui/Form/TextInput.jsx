import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  font-family: Value Sans Pro;
  font-size: 1.5rem;
  position: relative;
  height: 76px;
  input {
    z-index: 10;
    position: absolute;
    background-color: transparent;
    border-bottom: 2px solid black;
    width: 100%;
    ${(props) => {
      if (props.value?.length) {
        return `& + .label-text {
      font-size: 20px;
        font-size: 1.25rem;
        margin-top: 2.8rem;
        color: #333;
        font-weight: 500;
      }`
      }
    }}

    &:active,
    &:focus {
      outline: none;

      & + .label-text {
        font-size: 1.25rem;
        margin-top: 2.8rem;
        color: #333;
      }
    }
  }
  .label-text {
    z-index: 1;
    position: absolute;
    transition: all 0.3s;
  }
`
const TextInput = ({ label, name, onChange }) => {
  const [value, setValue] = React.useState('')

  return (
    <Wrapper value={value}>
      <input
        onChange={(e) => {
          setValue(e.currentTarget.value)
        }}
      />
      <label className="label-text">{label}</label>
    </Wrapper>
  )
}
export default TextInput
