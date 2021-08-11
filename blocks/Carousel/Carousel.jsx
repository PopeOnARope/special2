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

const SoundControl = styled.button`
  color: white;
  z-index: 3;
  position: absolute;
  align-self: flex-end;
  transform: rotate(-90deg);
  width: 5rem;
  margin-bottom: 45vh;
  float: right;
  font-size: 0.75rem;
  &:focus {
    outline: none;
  }
  &:hover {
    border-bottom: 2px solid white;
  }
  transition: 0.3s ease-in-out;
  cursor: pointer;
`

const Carousel = (props) => {
  const { slides } = props

  const [height, setHeight] = React.useState(780)
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [currentModel, setCurrentModel] = React.useState('model1')
  const [timeOfDay, setTimeOfDay] = React.useState('Day')
  const [scrollValue, setScrollValue] = React.useState(0)

  const [playing, toggle] = useAudio(props.sound)

  React.useEffect(() => {
    window.addEventListener('resize', () => setHeight(window.innerHeight - 42))
  })

  React.useEffect(() => {
    setHeight(window.innerHeight - 42)
  }, [])

  React.useEffect(() => {
    const useHandleScroll = (event) => {
      const isScrollingDown =
        event.deltaY > 1 && currentSlide < slides.length + 1
      const isScrollingUp =
        event.deltaY < 1 && currentSlide > 0 && !window.scrollY
      const isTop = !window.scrollY

      console.log({ isScrollingUp, isScrollingDown, currentSlide, isTop, event })

      if (isScrollingUp && currentSlide !== 0 && isTop) {
        event.stopPropagation()
        setCurrentSlide(currentSlide - 1)
      }
      if (isScrollingDown && currentSlide < slides.length -1 && isTop) {
        event.stopPropagation()
        setCurrentSlide(currentSlide + 1)
      }

      // setCurrentSlide(currentSlide + 1 < slides.length ? currentSlide + 1 : 0)
    }
    window.addEventListener('wheel', useHandleScroll, { passive: false })
    return function cleanup() {
      window.removeEventListener('wheel', useHandleScroll)
    }
  })


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
      <SoundControl onClick={toggle}>
        Sound Is {playing ? 'on' : 'off'}
      </SoundControl>
      <SwitchTransition mode="out-in">
        <CSSTransition key={currentSlide} classNames="slide" timeout={300}>
          <Slide
            sound={props.sound}
            height={height}
            slide={slides[currentSlide]}
          />
        </CSSTransition>
      </SwitchTransition>
    </Wrapper>
  )
}

export default Carousel
