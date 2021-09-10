/** @jsxRuntime classic */
/** @jsx jsx */
//@ts-nocheck
import React, { useEffect, useState } from 'react'
import { Themed, jsx } from 'theme-ui'
import { BottomModal, ModalTitle, ModalCloseTarget } from 'react-spring-modal'
import Button from '../../blocks/Button/Button'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: white;
  font-family: 'Value Sans Pro';
  position: sticky;
  bottom: 0;
  minHeight: 8rem;
  transition: 0.3s opacity;
  opacity: ${props=>props.opacity};
  visibility: ${props=>props.visibility};
  z-index: 10;
  padding: 1rem 1rem 2rem;
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
        visibility={!delayPassed || hide ? 'hidden' : 'visible'}
      >
        <p>
          By continuing to browse and pressing <strong>Accept</strong> you agree
          to store cookies in your device that enhance your experience on the
          Spec_ial site.
        </p>
        {action && action}
      </Wrapper>
  )
  return (
    <BottomModal isOpen={delayPassed && !hide}>
      <ModalTitle>{title}</ModalTitle>
      {description}
      <Themed.div sx={{ display: 'flex', justifyContent: 'center', p: [1, 2] }}>
        {action && action}
      </Themed.div>
    </BottomModal>
  )
}

export default FeatureBar
