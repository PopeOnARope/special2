import React from 'react'
import PhoneInput from 'react-phone-input-2'
import CurrencyInput from 'react-currency-input-field'
import styled from 'styled-components'

const Wrapper = styled.div`
  font-family: Value Sans Pro;
  font-size: 1rem;
  input {
    color: black;
    background-color: white;
    border-bottom: 2px solid black;
    border-radius: 0;
    width: 100%;
    padding: 14px 7px;
    margin-bottom: 10px;
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
    }
  }
  .label-text, .secondary-text {
    font-size: 0.8rem;
    z-index: 1;
    transition: all 0.3s;
  }

  .secondary-text {
    display: contents;
    font-size: 0.8rem;
  }
`
const TextInput = ({ placeholder, label, name, onChange, secondaryLabel='', formatter= (v) => v, type='text' }) => {
  const [value, setValue] = React.useState('')

  return (
    <Wrapper value={value}>
      <label className="label-text">{label} <span className='secondary-text'>{secondaryLabel}</span></label>
        {type === 'phone' && (
          <PhoneInput
            specialLabel=''
            country='us'
            prefix='+'
            onChange={(_value) => {
              setValue(formatter(_value))
              onChange(_value)
            }}
            value={value}
            placeholder={placeholder}
          />
        )}
        {type === 'currency' && (
          <CurrencyInput
            name={name}
            placeholder={placeholder}
            intlConfig={{ locale: 'en-US', currency: 'USD' }}
            onValueChange={(_value) => {
              setValue(formatter(_value))
              onChange(_value)
            }}
          />
        )}
        {type === 'text' && (
          <input
            onChange={(e) => {
              setValue(formatter(e.currentTarget.value))
              onChange(e)
            }}
            value={value}
            placeholder={placeholder}
          />
        )}
    </Wrapper>
  )
}
export default TextInput
