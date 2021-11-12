import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  font-family: Value Sans Pro;
  font-size: 1rem;
  position: relative;
  height: 76px;
  input {
    z-index: 10;
    position: absolute;
    background-color: transparent;
    border-bottom: 2px solid black;
    border-radius: 0;
    width: 100%;
    ${(props) => {
      if (props.value?.length) {
        return `& + .label-text {
        font-size: 1rem;
        margin-top: 2.8rem;
        color: #333;
        font-weight: 500;
      }`
      }
    }}

    &:active,
    &:focus {
      outline: none;

      & + .label-text, & + .secondary-text {
        font-size: 0.75rem;
        margin-top: 2rem;
        color: #333;
      }
    }
  }
  .label-text, .secondary-text {
    z-index: 1;
    position: absolute;
    transition: all 0.3s;
  }

  .secondary-text {
    display: contents;
    font-size: 0.8rem;
  }
`
const TextInput = ({ label, name, onChange, secondaryLabel='', formatter= (v) => v }) => {
  const [value, setValue] = React.useState('')

  return (
    <Wrapper value={value}>
      <input
        onChange={(e) => {
          setValue(formatter(e.currentTarget.value))
          onChange(e)
        }}
        value={value}
      />
      <label className="label-text">{label} <span className='secondary-text'>{secondaryLabel}</span></label>
    </Wrapper>
  )
}
export default TextInput
