import React from 'react'
import styled from 'styled-components'
import useAudio from './useAudio'
import { ChevronUp } from '../../components/icons'
import Button from '../Button/Button'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import ModelSelectorSlide from './ModelSelectorSlide'
import BasicVideoSlide from './BasicVideoSlide'

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

const SlideWrapper = styled.div`
  display: block;
  width: inherit;
`

const Carousel = (props) => {
  const { slides } = props

  const [height, setHeight] = React.useState(780)
  const [width, setWidth] = React.useState(780)
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [currentModel, setCurrentModel] = React.useState('model1')
  const [timeOfDay, setTimeOfDay] = React.useState('Day')
  const [isTransitioning, setIsTransitioning] = React.useState(false)

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



    const handleScroll = React.useCallback(e =>{
      //check if this is the last slide
      const isLastSlide = slides.length - 1 === currentSlide
      const isFirstSlide = currentSlide === 0
      //check if we are at the top of the document
      const isTopOfPage = !window.scrollY
      //check if the user scrolled up or down
      const scrollDirection = e.deltaY > 0 ? 'down' : 'up'
      //if we are at the top of the page and the user is scrolling up, go to the previous slide.
      function nextSlide() {
        setCurrentSlide(currentSlide + 1)
      }
      function previousSlide() {
        setCurrentSlide(currentSlide - 1)
      }
      //if last slide, don't add it back and return.
      if (isTransitioning) {
        e.preventDefault()
      } else {
        // e.preventDefault()
        if (!isLastSlide && scrollDirection === 'down') {
          e.preventDefault()
          setTimeout(() => {
            setIsTransitioning(false)
          }, 1000)
          setIsTransitioning(true)
          nextSlide()
        }

        if (!isFirstSlide && scrollDirection === 'up' && isTopOfPage) {
          e.preventDefault()
          setTimeout(() => {
            setIsTransitioning(false)
          }, 1000)
          setIsTransitioning(true)
          previousSlide()
        }
      }

    }, [currentSlide, isTransitioning])
  React.useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false })
    return function cleanup() {
      window.removeEventListener('wheel', handleScroll)
    };
  }, [handleScroll])

  React.useEffect(() => {
    const d = new Date()
    const h = d.getHours()
    if (h < 6 || h > 9) {
      setTimeOfDay('night')
    }
    if (h >= 6 && h < 9) {
      setTimeOfDay('dawn')
    }
    if (h >= 9 && h < 17) {
      setTimeOfDay('day')
    }
    if (h >= 17 && h < 19) setTimeOfDay('dusk')
  }, [])

  if (!slides) {
    return (
      <Wrapper>
        <p>Add some slides</p>
      </Wrapper>
    )
  }

  return (
    <Wrapper height={height}>
      <button className="sound-control" onClickCapture={toggle} height={height}>
        Sound Is {playing ? 'on' : 'off'}
      </button>
      <SwitchTransition mode="out-in">
        <CSSTransition key={currentSlide} classNames="slide" timeout={300}>
          <SlideWrapper>
            {slides[currentSlide].type === 'modelSelector' ? (
              <ModelSelectorSlide
                sound={props.sound}
                height={height}
                width={width}
                slide={slides[currentSlide]}
              />
            ) : (
              <BasicVideoSlide
                sound={props.sound}
                height={height}
                width={width}
                slide={slides[currentSlide]}
              />
            )}
          </SlideWrapper>
        </CSSTransition>
      </SwitchTransition>
    </Wrapper>
  )
}

export default Carousel
