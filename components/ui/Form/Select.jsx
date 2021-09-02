import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  :root {
    --select-border: #777;
    --select-focus: blue;
    --select-arrow: var(--select-border);
  }
  font-family: Value Sans Pro;
  font-size: 14px;

  border-radius: 0;
  font-size: 1.3rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
  &::after {
    content: '';
    width: 0.8em;
    height: 0.5em;
    background-color: var(--select-arrow);
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }
  select {
    :focus {
      outline: none;
    }
    border: 1px solid black;
  }
`
const Checkbox = ({ value, options, onChange }) => (
  <Wrapper>
    <select value={value} onChange={onChange}>
      {options?.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </select>
  </Wrapper>
)
export default Checkbox
