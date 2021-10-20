import React from 'react'
import styled, { css } from 'styled-components'
import Button from '../Button/Button'
import { H1, SecondaryH1 } from '../../components/Typography'
import { LoadingDots } from '../../components/ui'
import { isMobile } from '../../lib/isMobile'
import Cloud from '../../components/icons/Cloud'
import {Wrapper, Loading} from './Common'


const BasicVideoSlide = ({ slide, height, width }) => {
  const [loading, setLoading] = React.useState(false)
  const [deviceType, setDeviceType] = React.useState('')
  const { titleLine1, titleLine2, buttonLabel, buttonUrl } = slide
  const collectionAvailable = true

  function handleVideoLoaded() {
    setLoading(false)
  }

  React.useEffect(() => {
    setDeviceType(isMobile() ? 'mobile' : 'desktop')
  })

  const fittedVideo =
    deviceType === 'mobile' && slide.mobileVideo
      ? slide.mobileVideo
      : slide.video

  const currentSlideVideo = fittedVideo ? fittedVideo : ''

  const attr = {
    src: `${fittedVideo}.mp4`,
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
  }

  return (
    <Wrapper height={height}>
      {loading && (
        <Loading>
          loading
          <LoadingDots />
        </Loading>
      )}

      {deviceType === 'desktop' && <video {...attr}></video>}

      {deviceType === 'mobile' && (
        <>
          <img {...attr} />
        </>
      )}

      <div className="content">
        <H1>{titleLine1}</H1>
        {titleLine2 && (
          <SecondaryH1 className="title2">{titleLine2}</SecondaryH1>
        )}
        {collectionAvailable && (
          <Button displayAs="link" href={buttonUrl}>
            {buttonLabel}
          </Button>
        )}
      </div>
    </Wrapper>
  )
}

export default BasicVideoSlide
