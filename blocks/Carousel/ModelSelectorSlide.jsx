import React from 'react'
import styled, { css } from 'styled-components'
import Button from '../Button/Button'
import { H1, SecondaryH1 } from '../../components/Typography'
import { LoadingDots } from '../../components/ui'
import { isMobile } from '../../lib/isMobile'
import Cloud from '../../components/icons/Cloud'
import { useSwipeable } from 'react-swipeable'
import {Wrapper, Loading} from './Common'


const ModelSelectorSlide = ({ slide, height, width, display, isCurrentSlide }) => {
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
        <div>
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
        </div>
      )}

      <div className="content">
        <h1>{titleLine1}</h1>
        {titleLine2 && (
          <h1 className="title2">{titleLine2}</h1>
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
              style={{ position: 'absolute'}}
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
              style={{ position: 'absolute'}}
            />
          )}
          {slide?.model2Name}
        </button>
      </div>
    </Wrapper>
  )
}

export default ModelSelectorSlide
