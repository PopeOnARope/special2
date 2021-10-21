/** @jsxRuntime classic */
/** @jsx jsx */
//@ts-nocheck
import React, { useEffect, useState } from 'react'
import { Themed, jsx } from 'theme-ui'

import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  background: rgb(223,223,223);
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-family: 'Value Sans Pro';
  font-size: 0.8rem;
  position: sticky;
  bottom: 0;
  minHeight: 8rem;
  transition: 0.3s opacity;
  opacity: ${props=>props.opacity};
  display: ${props=>props.display};
  visibility: ${props=>props.visibility};
  z-index: 10;
  padding: 0.5rem 1rem 0.5rem;
  p {
    padding: 1rem 0rem;
  }
`

interface FeatureBarProps {
  className?: string
  title: string
  description?: string
  hide?: boolean
  action?: React.ReactNode
  delay?: number
}

const FeatureBar: React.FC<FeatureBarProps> = ({
  title,
  description,
  action,
  hide,
  delay,
}) => {
  const [delayPassed, setDelayPassed] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => setDelayPassed(true), delay || 2000)
    return () => clearTimeout(timeout)
  })
// if(!delayPassed || hide) {return (<></>)}
  return (
      <Wrapper
        opacity={!delayPassed || hide ? 0 : 100}
        display={hide ? 'none' : 'flex'}
        visibility={hide ? 'hidden' : 'visible'}
      >
        <p>
          By continuing to browse and pressing <strong>Accept</strong> you agree
          to store cookies in your device that enhance your experience on the
          Spec_ial site.
        </p>
        {action && action}
      </Wrapper>
  )
}

export default FeatureBar
