import React from 'react'
import styled from 'styled-components'
import useAudio from './useAudio'
import ModelSelectorSlide from './ModelSelectorSlide'
import BasicVideoSlide from './BasicVideoSlide'
import { useSwipeable } from 'react-swipeable'
import smoothscroll from 'smoothscroll-polyfill'
import { isMobile } from '../../lib/isMobile'

const Wrapper = styled.div`
  height: ${({ height }) => height}px;
  width: 100%;
  background: black;
  overflow: hidden;
  transition: opacity 1s;
  }
`

const SlidesWrapper = styled.div`
  margin-top: ${(props) => 0 - props.marginTop}px;
  display: flex;
  flex-direction: column;
  transition: margin-top 2s cubic-bezier(.41,0,.23,1.01);
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 768px) {
    transition: margin-top 1.5s cubic-bezier(.41,0,.23,1.01);
  }
`

const Carousel = (props) => {
  const { slides } = props

  const [height, setHeight] = React.useState(780)
  const [width, setWidth] = React.useState(780)
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [isTransitioning, setIsTransitioning] = React.useState(false)
  const [isLastSlide, setIsLastSlide] = React.useState(false)
  const [_isMobile, setIsMobile] = React.useState(true)

  const [playing, toggle] = useAudio(props.sound)

  React.useEffect(() => {
    setHeight(window.innerHeight - 64)
    setWidth(window.innerWidth)
    smoothscroll.polyfill()
    setIsMobile(isMobile())

    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight - 64)
    })
  }, [])


  React.useEffect(() => {
    setIsLastSlide(slides.length - 1 === currentSlide)
  }, [currentSlide])


  const handleScroll = React.useCallback(
    (e) => {
      //check if this is the last slide
      const _isLastSlide = slides.length - 1 === currentSlide
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
        if (!_isLastSlide && scrollDirection === 'down') {
          e.preventDefault()
          setTimeout(() => {
            setIsTransitioning(false)
          }, 1600)
          setIsTransitioning(true)
          nextSlide()
        }

        if (!isFirstSlide && scrollDirection === 'up' && isTopOfPage) {
          e.preventDefault()
          setTimeout(() => {
            setIsTransitioning(false)
          }, 1600)
          setIsTransitioning(true)
          previousSlide()
        }
      }
    },
    [currentSlide, isTransitioning]
  )
  React.useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false })
    return function cleanup() {
      window.removeEventListener('wheel', handleScroll)
    }
  }, [handleScroll])

  const onSwiping = (e) => {
    //if last slide and direction is down, scrollTo deltaY
    if (isTransitioning) {
      return
    } else {
      if (isLastSlide && e.dir === 'Up') {
        window.scrollTo({ top: height, behavior: 'smooth' })
      }
      if (window.scrollY !== 0 && e.dir === 'Down') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      if (!isLastSlide && e.dir === 'Up') {
        setTimeout(() => {
          setIsTransitioning(false)
        }, 1200)
        setIsTransitioning(true)
        setCurrentSlide(currentSlide + 1)
      }
      if (currentSlide !== 0 && e.dir === 'Down' && window.scrollY === 0) {
        setTimeout(() => {
          setIsTransitioning(false)
        }, 1200)
        setIsTransitioning(true)
        setCurrentSlide(currentSlide - 1)
      }
    }
  }

  const handlers = useSwipeable({
    onSwiping,
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
  })

  if (!slides) {
    return (
      <Wrapper>
        <p>Add some slides</p>
      </Wrapper>
    )
  }

  return (
    <Wrapper height={height} {...handlers}>
      {!_isMobile && (
        <button
          className="sound-control"
          onClickCapture={toggle}
          height={height}
        >
          Sound Is {playing ? 'on' : 'off'}
        </button>
      )}
      <SlidesWrapper
        marginTop={currentSlide * height}
        isTransitioning={isTransitioning}
        width={width}
      >
        {slides.map((slide, idx) => {
          return slide.type === 'modelSelector' ? (
            <ModelSelectorSlide
              height={height}
              width={width}
              slide={slide}
              key={idx.toString()}
              display={idx >= currentSlide - 2 && idx <= currentSlide + 1}
              isCurrentSlide={idx === currentSlide}
            />
          ) : (
            <BasicVideoSlide
              height={height}
              width={width}
              slide={slide}
              key={idx.toString()}
              display={idx > currentSlide - 2 && idx < currentSlide + 2}
              isCurrentSlide={idx === currentSlide}
            />
          )
        })}
      </SlidesWrapper>
    </Wrapper>
  )
}

export default Carousel
