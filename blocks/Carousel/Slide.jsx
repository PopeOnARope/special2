import React from 'react'
import styled from 'styled-components'
import useAudio from './useAudio'
import { ChevronUp } from '../../components/icons'
import Button from '../Button/Button'
import { H1, SecondaryH1 } from '../../components/Typography'
import { CSSTransition } from 'react-transition-group'

const Wrapper = styled.div`
  height: ${({ height }) => height}px;
  width: 100%;
  background: none;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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

const Video = styled.video`
  position: absolute;
  transition: visibility 0s, opacity 0.5s linear;
  z-index: 0;
  height: ${(props) => props.height}px;
  object-fit: cover;
  top: 0;
  left: 0;
  width: 100%;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
`

const Image = styled.div`
  background-image: ${({ src }) => `url(${src})`};
  width: 100%;
  height: ${(props) => props.height}px;
  position: absolute;
  background-position: center;
`

const ModelToggle = styled.div`
  z-index: 3;
  align-items: center;
  position: absolute;
  display: flex;
  flex-direction: row;
  .toggle-switch {
    border: 1px solid white;
    width: 2rem;
    height: 0px;
    display: flex;
    align-items: center;
    .toggle-button {
      position: absolute;
      margin-left: ${({ currentModel }) => {
        if (currentModel === 'model2') {
          return '1.2rem;'
        }
      }};
      background: white;
      height: 1.2rem;
      width: 0.75rem;
      transition: 0.3s ease-in-out;
    }
  }
  button {
    color: white;
    padding: 15px;
    font-size: 0.75rem;
    &:focus {
      outline: none;
    }
  }
  align-self: flex-end;
  margin-bottom: 2.25rem;
  margin-right: 2rem;
  @media (max-width: 768px) {
    margin-right: 3rem;
    margin-bottom: 8rem;
  }

  @media (max-width: 640px) {
    margin-right: 3rem;
    margin-bottom: 14rem;
  }
`

const ChevronDown = styled.div`
  transform: rotate(180deg);
`

const TimeToggle = styled.div`
  margin-top: 11rem;
  display: flex;
  flex-direction: column;
  //margin-bottom: ${({ height }) => 0.5 * height + 'px'};
  //margin-top: auto;
  position: absolute;
  //align-self: center;
  z-index: 3;
  border-right: 1px solid white;
  button {
    color: white;
    padding: 0.25rem 1.25rem;
    font-size: 0.75rem;
    &:focus {
      outline: none;
    }
    &:first-of-type {
      padding-top: 0px;
    }
    &:last-of-type {
      padding-bottom: 0px;
    }
  }

  .toggle-switch {
    background: white;
    height: 0.6rem;
    width: 1.2rem;
    align-self: flex-end;
    position: absolute;
    transition: 0.3s ease-in-out;
    margin-right: -0.7rem;
    // hack for mobile, why do we need this?
    margin-left: 0.7rem;
    display: inline-block;
    margin-top: ${({ timeOfDay }) => {
      if (timeOfDay === 'Night') {
        return '0rem;'
      }
      if (timeOfDay === 'Dusk') {
        return '1.8rem;'
      }
      if (timeOfDay === 'Day') {
        return '3.5rem;'
      }
      if (timeOfDay === 'Dawn') {
        return '5.5rem;'
      }
    }};
  }
`

const Slide = ({ slide, height }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [currentModel, setCurrentModel] = React.useState('model1')
  const [timeOfDay, setTimeOfDay] = React.useState('Day')

  const { image, titleLine1, titleLine2, buttonLabel, buttonUrl } = slide
  const collectionAvailable = true

  const currentSlideVideos = slide.videos
    ? slide.videos[`${currentModel}${timeOfDay}`]
    : ''

  console.log({ slide })
  // return <div></div>
  return (
    <Wrapper height={height}>
      <div className="position-absolute border-1 border-purple-400 flex flex-col justify-center z-3" style={{height: `${height}px`}}>
        <TimeToggle timeOfDay={timeOfDay}>
          <div className="toggle-switch"></div>
          <button
            onClick={() => {
              setTimeOfDay('Night')
            }}
          >
            Night
          </button>
          <button
            onClick={() => {
              setTimeOfDay('Dusk')
            }}
          >
            Dusk
          </button>
          <button
            onClick={() => {
              setTimeOfDay('Day')
            }}
          >
            Day
          </button>{' '}
          <button
            onClick={() => {
              setTimeOfDay('Dawn')
            }}
          >
            Dawn
          </button>
        </TimeToggle>
      </div>
      {slide.videos &&
        Object.keys(slide.videos).map((video) => (
          <Video
            height={height}
            src={slide.videos[video]}
            autoPlay
            poster={slide.image}
            muted
            loop
            playsInline
            show={currentSlideVideos === slide.videos[video]}
          >
            <source src={slide.videos[video]} type='video/mp4'/>
          </Video>
        ))}
      {!slide.videos && slide.image && (
        <Image src={slide.image} height={height} />
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
      <ModelToggle currentModel={currentModel} height={height}>
        <button
          onClick={() => {
            setCurrentModel('model1')
          }}
        >
          {slide.videos?.model1Name}
        </button>
        <div className="toggle-switch">
          <div className="toggle-button"></div>
        </div>

        <button
          onClick={() => {
            setCurrentModel('model2')
          }}
        >
          {slide.videos?.model2Name}
        </button>
      </ModelToggle>
    </Wrapper>
  )
}

export default Slide
