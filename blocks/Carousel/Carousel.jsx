import React from 'react'
import styled from 'styled-components'
import useAudio from './useAudio'
import { ChevronUp } from '../../components/icons'
import Button from '../Button/Button'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import Slide from './Slide'

const Wrapper = styled.div`
  height: ${({ height }) => height}px;
  width: 100%;
  background: black;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  .slide-enter {
    opacity: 0;
    transform: translateY(40px);
  }
  .slide-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: all 0.3s;
  }
  .slide-exit {
    opacity: 1;
    transform: translateY(0px);
  }
  .slide-exit-active {
    opacity: 0;
    transform: translateY(-40px);
    transition: all 0.3s;
  }
  }
`

const Carousel = (props) => {
  const { slides } = props

  const [height, setHeight] = React.useState(780)
  const [width, setWidth] = React.useState(780)
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [currentModel, setCurrentModel] = React.useState('model1')
  const [timeOfDay, setTimeOfDay] = React.useState('Day')
  const [scrollValue, setScrollValue] = React.useState(0)

  const [playing, toggle] = useAudio(props.sound)

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight - 42)
    })
  })

  React.useEffect(() => {
    setHeight(window.innerHeight - 42)
    setWidth(window.innerWidth)
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
      <div className="sound-control hidden md:block" onClick={toggle} height={height}>
        Sound Is {playing ? 'on' : 'off'}
      </div>
      <SwitchTransition mode="out-in">
        <CSSTransition key={currentSlide} classNames="slide" timeout={300}>
          <Slide
            sound={props.sound}
            height={height}
            width={width}
            slide={slides[currentSlide]}
          />
        </CSSTransition>
      </SwitchTransition>
    </Wrapper>
  )
}

export default Carousel
