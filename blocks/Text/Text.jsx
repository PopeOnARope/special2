import React from 'react'
import styled from 'styled-components'
const Wrapper = styled.div`
  font-family: 'Value Sans Pro';
  font-weight: normal;
  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }
  h2 {
    font-size: 1.5em;
    margin: 0.75em 0;
  }
  h3 {
    font-size: 1.17em;
    margin: 0.83em 0;
  }
  h5 {
    font-size: 0.83em;
    margin: 1.5em 0;
  }
  h6 {
    font-size: 0.75em;
    margin: 1.67em 0;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bolder;
  }

  strong {
    font-weight: bolder;
  }
`
const Text = ({ content }) => (
  <Wrapper dangerouslySetInnerHTML={{__html: content}}>

  </Wrapper>
)

export default Text
