import React from 'react'
import styled from 'styled-components'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const OuterWrapper = styled.div`
  height: 1px;
  background: black;
  position: relative;
  width: 100%;
`

const Orange = styled.div`
  background: #ffc391;
  width: ${(props) => props.width * 1}rem;
  height: 2px;
  position: absolute;
`

const Wrapper = styled.div`
  font-family: ${(props) => props.font};
  font-weight: bold;

  position: relative;

  height: 2.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  .flag-dropdown, .open {
    bottom: 0;
    z-index: 100;
    background: transparent !important;
    border: none;
    .selected-flag, .open{
    padding: 0;
    :hover {
      background: transparent !important;
    }
    }
  }
  //label{
  //  display: inherit;
  //  align-self: flex-start;
  //  position: absolute;
  //  background: transparent;
  //
  //}
  .react-tel-input{
    height: inherit;
    font-family: ${(props) => props.font};

    input {
      font-size: 1.2rem;
      bottom: 0;
      z-index: 10;
    position: absolute;
    background-color: transparent;
    display: block;
    border: none;
    border-radius: 0;
    width: 100%;
    ${(props) => {
      if (props.value?.length) {
        console.log({value: props.value})
        return `& + label {
        font-size: 0.8rem;
        margin-top: 1.4rem;
        margin-bottom: -1.25rem;

        color: #333;
        font-weight: 500;
      }`
      }
    }}}

    &:active,
    &:focus {
      outline: none;

      & + label,
      & + .secondary-text {
        font-size: 0.8rem;
        //font-weight: bold;
        //margin-top: 1.4rem;
        //margin-bottom: -1.25rem;
        color: #333;
      }
    }
  }
  &::placeholder{
    color: black;
    opacity: 1;
  }
  label,
  .secondary-text {
    z-index: 1;
    position: absolute;
    transition: all 0.3s;
    font-size: 0.8rem;
  }

  .secondary-text {
    display: contents;
    font-size: 0.8rem;
  }
`
const TextInput = ({
  label,
  name,
  onChange,
  secondaryLabel = '',
  font = 'Value Sans Pro',
  formatter = (v) => v,
}) => {
  const [value, setValue] = React.useState('')

  return (
    <Wrapper value={value} font={font}>
      <PhoneInput
        country='us'
        prefix='+'
        onChange={(_value) => {
          setValue(formatter(_value))
          onChange(_value)
        }}
        value={value}
        placeholder='Phone?'
      />
      <label>Phone?</label>
      <OuterWrapper>
        <Orange width={value.length} />
      </OuterWrapper>
    </Wrapper>
  )
}
export default TextInput
