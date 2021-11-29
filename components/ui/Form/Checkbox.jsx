import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 0.5rem;
  display: inline-flex;
  font-family: InputMono;
  label {

  }
  .checkbox-custom,
  .radio-custom {
    opacity: 0;
    position: absolute;
  }

  .checkbox-custom,
  .checkbox-custom-label {
    display: inline-block;
    vertical-align: middle;
    margin: 5px;
    cursor: pointer;
    font-size: 0.7rem !important;
  }

  .checkbox-custom-label,
  .radio-custom-label {
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
  @media (max-width: 768px) {
    margin-top: 0;
  }
`
const Checkbox = ({ label, name, onChange, checked }) => (
  <Wrapper>
    <input
      id="checkbox-2"
      className="checkbox-custom"
      name="checkbox-2"
      type="checkbox"
      onChange={(e)=>{onChange(e)}}
      checked={checked}
    />
    <label htmlFor="checkbox-2" className="checkbox-custom-label">
    </label>
    <span className='checkbox-custom-label' dangerouslySetInnerHTML={{__html: label}}></span>
  </Wrapper>
)
export default Checkbox
