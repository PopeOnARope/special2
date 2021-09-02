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
    margin-top: -14rem;
    margin-bottom: 14rem;
  }
`

const ChevronDown = styled.div`
  transform: rotate(180deg);
`

const Slide = ({ slide, height, width }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [currentModel, setCurrentModel] = React.useState('model1')
  const [timeOfDay, setTimeOfDay] = React.useState('Day')

  const {
    image,
    titleLine1,
    titleLine2,
    buttonLabel,
    buttonUrl,
    videos,
    mobileVideos,
  } = slide
  const collectionAvailable = true



  function toggleSwitchMarginTop() {
    if (timeOfDay === 'Night') {
      return '0rem'
    }
    if (timeOfDay === 'Dusk') {
      return '1.8rem'
    }
    if (timeOfDay === 'Day') {
      return '3.5rem'
    }
    if (timeOfDay === 'Dawn') {
      return '5.5rem'
    }
  }

  const toggleModelMarginLeft = currentModel === 'model2' ? '1.2rem' : '0rem'

  console.log({ slide })
  console.log({width})
  const fittedVideos =
    width < 768 && slide.mobileVideos ? slide.mobileVideos : slide.videos

  const currentSlideVideos = fittedVideos
    ? fittedVideos[`${currentModel}${timeOfDay}`]
    : ''
  console.log({mv: slide.mobileVideos, v: slide.videos})
  return (
    <Wrapper height={height}>
      <div
        className="position-absolute border-1 border-purple-400 flex flex-col justify-center z-3"
        style={{ height: `${height}px` }}
      >
        <div className="time-toggle">
          <div
            className="toggle-switch"
            style={{ marginTop: toggleSwitchMarginTop() }}
          ></div>
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
        </div>
      </div>
      {slide.videos &&
        Object.keys(fittedVideos).map((video) => (
          <Video
            height={height}
            src={fittedVideos[video]}
            autoPlay
            poster={slide.image}
            muted
            loop
            playsInline
            show={currentSlideVideos === fittedVideos[video]}
          >
            <source src={fittedVideos[video]} type="video/mp4" />
          </Video>
        ))}
      {!fittedVideos && slide.image && (
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
      <div className="model-toggle">
        <button
          onClick={() => {
            setCurrentModel('model1')
          }}
        >
          {slide?.model1Name}
        </button>
        <div className="toggle-switch">
          <div
            className="toggle-button"
            style={{ marginLeft: toggleModelMarginLeft }}
          ></div>
        </div>

        <button
          onClick={() => {
            setCurrentModel('model2')
          }}
        >
          {slide?.model2Name}
        </button>
      </div>
    </Wrapper>
  )
}

export default Slide
