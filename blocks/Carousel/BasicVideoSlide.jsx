import React from 'react'
import styled, { css } from 'styled-components'
import Button from '../Button/Button'
import { H1, SecondaryH1 } from '../../components/Typography'
import { LoadingDots } from '../../components/ui'
import { isMobile } from '../../lib/isMobile'
import Cloud from '../../components/icons/Cloud'
import { Wrapper, Loading } from './Common'

const BasicVideoSlide = ({ slide, height, width, display, isCurrentSlide }) => {
  const [loading, setLoading] = React.useState(false)
  const [deviceType, setDeviceType] = React.useState('')
  const { titleLine1, titleLine2, buttonLabel, buttonUrl, image } = slide
  const collectionAvailable = true

  React.useEffect(() => {
    setDeviceType(isMobile() ? 'mobile' : 'desktop')
  })

  const fittedVideo =
    deviceType === 'mobile' && slide.mobileVideo
      ? slide.mobileVideo
      : slide.video

  const fittedImage =
    deviceType === 'mobile' || width < 768 && slide.mobileImage
      ? slide.mobileImage
      : slide.image

  const currentSlideVideo = fittedVideo ? fittedVideo : ''

  const attr = {
    src: `${fittedVideo}.mp4`,
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
  }

  if (!display) {
    return <Wrapper height={height} />
  }

  return (
    <Wrapper height={height} isCurrentSlide={isCurrentSlide}>
      {loading && (
        <Loading>
          loading
          <LoadingDots />
        </Loading>
      )}
      {(!fittedVideo || !fittedVideo.length) && fittedImage && <img src={fittedImage} />}

      {fittedVideo && deviceType === 'desktop' && <video {...attr}></video>}

      {fittedVideo && deviceType === 'mobile' && (
        <>
          <img {...attr} />
        </>
      )}

      <div className="content">
        <H1>{titleLine1}</H1>
        {titleLine2 && (
          <SecondaryH1 className="title2">{titleLine2}</SecondaryH1>
        )}
        {collectionAvailable && buttonLabel && (
          <Button displayAs="link" href={buttonUrl}>
            {buttonLabel}
          </Button>
        )}
      </div>
    </Wrapper>
  )
}

export default BasicVideoSlide
