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



const ModelSelectorSlide = ({ slide, height, width }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [currentModel, setCurrentModel] = React.useState('model1')
  const [timeOfDay, setTimeOfDay] = React.useState('Day')
  const [loading, setLoading] = React.useState(false)
  const [deviceType, setDeviceType] = React.useState('')

  function handleVideoLoaded() {
    setLoading(false)
  }

  React.useEffect(() => {
    setDeviceType(isMobile() ? 'mobile' : 'desktop')
  })
  const { titleLine1, titleLine2, buttonLabel, buttonUrl } = slide
  const collectionAvailable = true

  // function toggleSwitchMarginTop() {
  //   if (timeOfDay === 'Night') {
  //     return '0rem'
  //   }
  //   if (timeOfDay === 'Dusk') {
  //     return '1.8rem'
  //   }
  //   if (timeOfDay === 'Day') {
  //     return '3.5rem'
  //   }
  //   if (timeOfDay === 'Dawn') {
  //     return '5.5rem'
  //   }
  // }

  const TimeToggle = ({ timeOfDay }) => {
    return ['Night', 'Dusk', 'Day', 'Dawn'].map((time) => (
      <button
        onClick={() => {
          setTimeOfDay(time)
        }}
        className="flex justify-center items-center"
        style={{ width: '3rem' }}
      >
        {timeOfDay === time && (
          <Cloud
            fill="white"
            stroke="white"
            style={{ position: 'absolute', width: '3rem' }}
          />
        )}
        {time}
      </button>
    ))
  }

  const toggleModelMarginLeft = currentModel === 'model2' ? '1.2rem' : '0rem'

  const fittedVideos =
    deviceType === 'mobile' && slide.mobileVideos
      ? slide.mobileVideos
      : slide.videos

  const currentSlideVideos = fittedVideos
    ? fittedVideos[`${currentModel}${timeOfDay}`]
    : ''

  console.log(slide.mobileVideos)
  console.log({currentModel})
  return (
    <Wrapper height={height}>
      {loading && (
        <Loading>
          loading
          <LoadingDots />
        </Loading>
      )}
      <div
        className="position-absolute flex flex-col justify-center z-3 time-toggle"
        style={{ height: `${height}px` }}
      >
        {deviceType === 'desktop' && <TimeToggle timeOfDay={timeOfDay} />}
      </div>
      {deviceType === 'desktop' &&
        slide.videos &&
        Object.keys(fittedVideos).map((video) => {
          const attr = {
            src: `${fittedVideos[video]}.mp4`,
            autoPlay: true,
            muted: true,
            loop: true,
            playsInline: true,
            style: {
              visibility:
                currentSlideVideos === fittedVideos[video]
                  ? 'visible'
                  : 'hidden',
            },
            onLoadedData: () => {
              currentSlideVideos === fittedVideos[video] && handleVideoLoaded()
            },
          }

          return <video {...attr}></video>
        })}

      {deviceType === 'mobile' && (
        <>
          <img
            src={`${fittedVideos.model1Day}.mp4`}
            autoPlay
            muted
            loop
            playsInline
            style={{
              visibility: currentModel === 'model1' ? 'visible' : 'hidden',
            }}
          />
          <img
            src={`${fittedVideos.model2Day}.mp4`}
            autoPlay
            muted
            loop
            playsInline
            style={{
              visibility: currentModel === 'model2' ? 'visible' : 'hidden',
            }}
          />
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
      <div className="model-toggle">

        <button
          onClick={() => {
            setCurrentModel('model1')
          }}
          className="flex justify-center items-center"
          style={{ width: '3rem' }}
        >
          {currentModel === 'model1' && (
            <Cloud
              fill="white"
              stroke="white"
              style={{ position: 'absolute', width: '3rem' }}
            />
          )}
          {slide?.model1Name}
        </button>

        <button
          onClick={() => {
            setCurrentModel('model2')
          }}
          className="flex justify-center items-center"
          style={{ width: '3rem' }}
        >
          {currentModel === 'model2' && (
            <Cloud
              fill="white"
              stroke="white"
              style={{ position: 'absolute', width: '3rem' }}
            />
          )}
          {slide?.model2Name}
        </button>
      </div>
    </Wrapper>
  )
}

export default ModelSelectorSlide
