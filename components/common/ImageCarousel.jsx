import React, { Fragment, useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import { ChevronUp } from '@components/icons'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles({
  colorPrimary: {
    backgroundColor: 'transparent',
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#FFC391',
  },
})

const NextButton = ({ onClick }) => (
  <button onClick={onClick} className="focus:outline-none">
    <div
      style={{
        color: 'white',
        transform: 'rotate(90deg)',
      }}
      className="hover:pr-20"
    >
      <ChevronUp />
    </div>
  </button>
)
const PreviousButton = ({ onClick }) => (
  <button onClick={onClick} className="focus:outline-none">
    <div
      style={{
        color: 'white',
        transform: 'rotate(270deg)',
      }}
    >
      <ChevronUp />
    </div>
  </button>
)

const CustomSlider = ({ itemsCount = 1, refs, timer = 3000 }) => {
  const classes = useStyles()
  const [width, setWidth] = useState(10)
  const [color, setColor] = useState('primary')

  const repetitions = 100 // 100ms
  const numberOfSections = timer / repetitions
  const widthPerSection = 20 / numberOfSections

  useEffect(() => {
    setTimeout(() => {
      if (width <= 45) {
        setWidth(widthPerSection + width)
      } else {
        refs.current.slickNext()
        setWidth(10) // If bar doesn't return to start on time, reduce this
      }

      if (width < 20) {
        setColor('white')
      } else {
        setColor('primary')
      }
    }, 100)
  }, [width])

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '5px',
      }}
    >
      {itemsCount > 1 ? (
        <LinearProgress
          classes={{
            colorPrimary: classes.colorPrimary,
            bar: classes.bar,
          }}
          variant="determinate"
          color={color}
          value={width}
          style={{
            backgroundColor: 'transparent',
          }}
        />
      ) : null}
    </div>
  )
}

const Arrows = ({ refs }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        marginTop: '50vh',
        height: '10px',
        width: '96%',
        justifyContent: 'space-between',
        marginLeft: '2%',
        marginRight: '2%',
        display: 'flex',
        color: 'white',
      }}
    >
      <PreviousButton onClick={() => refs.current.slickPrev()} />
      <NextButton onClick={() => refs.current.slickNext()} />
    </div>
  )
}

const ImageCarousel = ({ images = null, videos = null }) => {
  const [index, setIndex] = useState(0)
  const sliderRef = useRef()

  const settings = {
    afterChange: (slideIndex) => handleAfterChange(slideIndex),
    arrows: false,
    dots: false,
    fade: true,
    infinite: true,
    lazyLoad: true,
    pauseOnHover: false,
    ref: sliderRef,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    swipe: false,
  }

  const handleAfterChange = (slideIndex) => {
    setIndex(slideIndex)
  }

  if (videos === null && images === null) return <div></div>

  return (
    <Fragment>
      <Slider {...settings}>
        {images &&
          images.map((image, index) => (
            <div key={index}>
              <Image
                src={image}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
              <div
                style={{
                  width: '100vw',
                  height: '100vh',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  zIndex: 0,
                }}
              ></div>
              <Arrows refs={sliderRef} />
            </div>
          ))}
        {videos &&
          videos.map((video, index) => (
            <div key={index}>
              <video
                width="100%"
                height="auto"
                autoPlay
                muted
                src={video}
                loop
              />
              <div
                style={{
                  width: '100vw',
                  height: '100vh',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  zIndex: 0,
                }}
              ></div>
              <Arrows refs={sliderRef} />
            </div>
          ))}
      </Slider>
      <CustomSlider
        refs={sliderRef}
        timer={3000}
        itemsCount={images?.length || videos?.length}
      />
    </Fragment>
  )
}

export default ImageCarousel
