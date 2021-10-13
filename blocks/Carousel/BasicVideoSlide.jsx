import React from 'react'
import styled, { css } from 'styled-components'
import Button from '../Button/Button'
import { H1, SecondaryH1 } from '../../components/Typography'
import { LoadingDots } from '../../components/ui'
import { isMobile } from '../../lib/isMobile'
import Cloud from '../../components/icons/Cloud'

const Wrapper = styled.div`
  height: ${({ height }) => height}px;
  width: 100%;
  background: none;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  video,
  img {
    position: absolute;
    transition: visibility 0s, opacity 0.5s linear;
    z-index: 0;
    height: ${(props) => props.height}px;
    object-fit: cover;
    top: 0;
    left: 0;
    width: 100%;
  }
  .content {
    display: flex;
    flex-direction: column;
    margin-left: 50px;
    margin-bottom: 33px;
    z-index: 1;
    h1 {
      color: #ffffff;
    }
    .title2 {
      margin-top: -70px;
      margin-left: 25px;
      padding: 0px;
    }
    @media (max-width: 768px) {
      margin: 3rem;
    }
  }
`

const Loading = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 10;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

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
