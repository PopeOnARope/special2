import React from 'react'
import styled from 'styled-components'
import { ChevronUp } from '../../components/icons'

import Button from '../Button/Button'
import { H1 } from '../../components/Typography'
import { CSSTransition } from 'react-transition-group'
// import NextArrow from '../../assets/nextArrow.svg'

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
`

const Video = styled.video`
  position: absolute;
  z-index: 0;
  height: ${(props) => props.height}px;
  object-fit: cover;
  top: 0;
  left: 0;
`

const ModelToggle = styled.div`
  position: absolute;
  button {
    color: white;
    padding: 15px;
  }
`

const ChevronDown = styled.div`
  transform: rotate(180deg);
`

const Carousel = (props) => {
  const { slides } = props

  const [height, setHeight] = React.useState(780)
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [currentModel, setCurrentModel] = React.useState('model1')
  const [timeOfDay, setTimeOfDay] = React.useState('Day')

  React.useEffect(() => {
    setHeight(window.innerHeight)
  }, [])

  React.useEffect(() => {
    window.addEventListener('wheel', handleScroll,{passive: false} )
    return function cleanup() {
      window.removeEventListener('wheel', handleScroll)
    }
  })

  const handleScroll = React.useCallback((event) => {

    const isScrollingDown = event.deltaY


    if (event.deltaY > 0 && currentSlide < slides.length-1) {
    event.preventDefault()
      console.log('scrolling down')
      updateSlide()
    }
    console.log({currentSlide})
    if(event.deltaY < 1 && currentSlide > 0) {
      event.preventDefault()
      setCurrentSlide(currentSlide - 1)
      console.log('scrolling up')
    }

    event.stopPropagation()
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
    setCurrentSlide(slide)
  }
  function updateModel(model) {
    const slide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1
    setCurrentSlide(slide)
  }

  const currentSlideVideos = slides[currentSlide].videos
    ? slides[currentSlide].videos[`${currentModel}${timeOfDay}`]
    : ''

  return (
    // <CSSTransition>
    <Wrapper height={height}>
      <Video
        height={height}
        src={currentSlideVideos && currentSlideVideos}
        autoPlay
        poster={slides[currentSlide].image}
        muted
        loop
      ></Video>
      <div className="content">
        <H1>{titleLine1}</H1>
        {titleLine2 && <H1 className="title2">{titleLine2}</H1>}
        {collectionAvailable && (
          <Button displayAs="link" href={buttonUrl}>
            {buttonLabel}
          </Button>
        )}
      </div>
      <ModelToggle>
        <button
          onClick={() => {
            setCurrentModel('model1')
          }}
        >
          {slides[currentSlide].videos?.model1Name}
        </button>
        <button
          onClick={() => {
            setCurrentModel('model2')
          }}
        >
          {slides[currentSlide].videos?.model2Name}
        </button>
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
      </ModelToggle>

      <NextButton onClick={updateSlide}>
        {currentSlide + 1} out of {slides.length}{' '}
        <ChevronDown>
          <ChevronUp />
        </ChevronDown>
      </NextButton>
    </Wrapper>
    // </CSSTransition>
  )
}

export default Carousel
