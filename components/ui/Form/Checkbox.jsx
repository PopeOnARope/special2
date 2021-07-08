import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 32px;
  font-family: Value Sans Pro;
  font-size: 18px;
  .checkbox-custom, .radio-custom {
    opacity: 0;
    position: absolute;
  }

  .checkbox-custom, .checkbox-custom-label{
    display: inline-block;
    vertical-align: middle;
    margin: 5px;
    cursor: pointer;
  }

  .checkbox-custom-label, .radio-custom-label {
    position: relative;
  }

  .checkbox-custom + .checkbox-custom-label:before {
    content: '';
    background: transparent;
    border: 2px solid black;
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    padding: 2px;
    margin-right: 10px;
    text-align: center;
  }

  .checkbox-custom:checked + .checkbox-custom-label:before {
    background: black;
    box-shadow: inset 0px 0px 0px 4px #fff;
  }


  .checkbox-custom:focus + .checkbox-custom-label {
    outline: 1px solid #ddd; /* focus style */
  }
`
const Checkbox = ({ label, name, onChange }) => (
  <Wrapper>
    <input
      id="checkbox-2"
      className="checkbox-custom"
      name="checkbox-2"
      type="checkbox"
    />
    <label htmlFor="checkbox-2" className="checkbox-custom-label">
      {label}
    </label>
  </Wrapper>
)
export default Checkbox
