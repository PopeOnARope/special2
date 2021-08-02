import React from 'react'
import styled from 'styled-components'
import useAudio from './useAudio'
import { ChevronUp } from '../../components/icons'
import Button from '../Button/Button'
import { H1 } from '../../components/Typography'

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

const NextButton = styled.button`
  width: fit-content;
  padding: 20px;
  position: absolute;
  margin-left: 50%;
  margin-bottom: 20px;
  background: none;
  border: none;
  color: white;
  transition: 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  &:hover {
    margin-bottom: 24px;
    transition: 0.3s ease-in-out;
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 260px;
    margin-left: 80%;
    font-size: 1.75rem;
    &:hover {
      margin-bottom: 270px;
    }
  }
`

const Video = styled.video`
  position: absolute;
  z-index: 0;
  height: ${(props) => props.height}px;
  object-fit: cover;
  top: 0;
  left: 0;
  width: 100%;
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
`

const ChevronDown = styled.div`
  transform: rotate(180deg);
`
const SoundControl = styled.button`
  color: white;
  position: absolute;
  margin-right: 0;
  align-self: flex-end;
  transform: rotate(-90deg);
  margin-bottom: 50%;
`

const Sound = styled.audio``

const TimeToggle = styled.div`
  margin-top: -1rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 28rem;
  position: absolute;
  border-right: 1px solid white;
  button {
    color: white;
    padding: 0.5rem 1.25rem;
    &:focus {
      outline: none;
    }
  }

  .toggle-switch {
    background: white;
    height: 0.75rem;
    width: 1.2rem;
    align-self: flex-end;
    position: absolute;
    transition: 0.3s ease-in-out;
    margin-right: -0.7rem;
    margin-top: ${({ timeOfDay }) => {
      if (timeOfDay === 'Night') {
        return '1rem;'
      }
      if (timeOfDay === 'Dusk') {
        return '3.25rem;'
      }
      if (timeOfDay === 'Day') {
        return '6rem;'
      }
      if (timeOfDay === 'Dawn') {
        return '8.25rem;'
      }
    }};
  }
`

const Carousel = (props) => {
  const { slides } = props

  const [height, setHeight] = React.useState(780)
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [currentModel, setCurrentModel] = React.useState('model1')
  const [timeOfDay, setTimeOfDay] = React.useState('Day')
  const [scrollValue, setScrollValue] = React.useState(0)

  const [playing, toggle] = useAudio(props.sound);

  React.useEffect(() => {
    setHeight(window.innerHeight - 42)
  }, [])



  // React.useEffect(() => {
  //   const useHandleScroll = (e) => {
  //       handleScroll(e, currentSlide)
  //     }
  //
  //   window.addEventListener(
  //     'wheel',
  //     useHandleScroll,
  //     { passive: false }
  //   )
  //   return function cleanup() {
  //     window.removeEventListener(
  //       'wheel',
  //       useHandleScroll
  //     )
  //   }
  // }, [])

  const handleScroll = React.useCallback((event, cs) => {
    const isScrollingDown = event.deltaY > 1 && cs < slides.length + 1
    const isScrollingUp = event.deltaY < 1 && cs > 0 && !window.scrollY

    if (isScrollingDown) {
      event.stopPropagation()
      console.log('scrolling down', event.deltaY)
      //if scroll value is less than 100,
      console.log({ scrollValue, cs })
      // if(scrollValue<100){
      //   setScrollValue(scrollValue+event.deltaY)
      // } else {
      //   setScrollValue(0)
      updateSlide()
      // }
    }
    // console.log({ cs })
    if (isScrollingUp) {
      event.stopPropagation()
      setCurrentSlide(cs - 1)
      console.log('scrolling up', event.deltaY)
    }
  }, [])

  if (!slides) {
    return (
      <Wrapper>
        <p>Add some slides</p>
      </Wrapper>
    )
  }
  const {
    image,
    titleLine1,
    titleLine2,
    buttonLabel,
    buttonUrl,
  } = props.slides[currentSlide]
  const collectionAvailable = true

  function updateSlide() {
    const slide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1
    // alert(currentSlide + '' +  slide)
    setCurrentSlide(slide)
  }


  const currentSlideVideos = slides[currentSlide].videos
    ? slides[currentSlide].videos[`${currentModel}${timeOfDay}`]
    : ''

  return (
    <Wrapper height={height}>
      <Video
        height={height}
        src={currentSlideVideos && currentSlideVideos}
        autoPlay
        poster={slides[currentSlide].image}
        muted
        loop
      ></Video>
      <SoundControl
        onClick={ toggle}
      >
        Sound {playing ? 'on' : 'off'}
      </SoundControl>
      <div className="content">
        <H1>{titleLine1}</H1>
        {titleLine2 && <H1 className="title2">{titleLine2}</H1>}
        {collectionAvailable && (
          <Button displayAs="link" href={buttonUrl}>
            {buttonLabel}
          </Button>
        )}
      </div>
      <ModelToggle currentModel={currentModel}>
        <button
          onClick={() => {
            setCurrentModel('model1')
          }}
        >
          {slides[currentSlide].videos?.model1Name}
        </button>
        <div className="toggle-switch">
          <div className="toggle-button"></div>
        </div>

        <button
          onClick={() => {
            setCurrentModel('model2')
          }}
        >
          {slides[currentSlide].videos?.model2Name}
        </button>
      </ModelToggle>

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

      <NextButton onClick={updateSlide}>
        {currentSlide + 1} out of {slides.length}{' '}
        <ChevronDown>
          <ChevronUp />
        </ChevronDown>
      </NextButton>
    </Wrapper>
  )
}

export default Carousel
