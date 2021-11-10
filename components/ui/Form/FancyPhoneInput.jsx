import React from 'react'
import styled from 'styled-components'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css';


const OuterWrapper = styled.div`
  height: 1px;
  background: black;
  position: relative;
  width: 100%;
`

const Orange = styled.div`
  background: #ffc391;
  width: ${(props) => props.width * 0.7}rem;
  height: 2px;
  position: absolute;
`

const Wrapper = styled.div`
  font-family: ${(props) => props.font};
  font-weight: bold;
  display: flex;
  align-items: flex-end;
  font-size: 1.25rem;
  position: relative;
  height: 2.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  input {
    z-index: 10;
    position: absolute;
    background-color: transparent;
    //border-bottom: 2px solid black;
    border-radius: 0;
    width: 100%;
    ${(props) => {
      if (props.value?.length) {
        return `& + .label-text {
        font-size: 0.8rem;
        margin-top: 1.4rem;
        margin-bottom: -1.25rem;

        color: #333;
        font-weight: 500;
      }`
      }
    }}

    &:active,
    &:focus {
      outline: none;

      & + .label-text,
      & + .secondary-text {
        font-size: 0.8rem;
        font-weight: bold;

        margin-top: 1.4rem;
        margin-bottom: -1.25rem;
        color: #333;
      }
    }
  }
  .label-text,
  .secondary-text {
    z-index: 1;
    position: absolute;
    transition: all 0.3s;
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
      <IntlTelInput
        containerClassName="intl-tel-input"
        inputClassName="form-control"
        onChange={(e) => {
          setValue(formatter(e.currentTarget.value))
          onChange(e)
        }}
        value={value}
      />
      <label className="label-text">
        {label} <span className="secondary-text">{secondaryLabel}</span>
      </label>
      <OuterWrapper>
        <Orange width={value.length} />
      </OuterWrapper>
    </Wrapper>
  )
}
export default TextInput
