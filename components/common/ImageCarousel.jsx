import React, { Fragment, useRef, useState } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import { ChevronUp } from '@components/icons'

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
    <div style={{ color: 'white', transform: 'rotate(270deg)' }}>
      <ChevronUp />
    </div>
  </button>
)

const CustomSlider = ({ itemsCount = 1, index = 0 }) => {
  // TODO: Add animation when moving slide
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
        <div
          style={{
            backgroundColor: '#FFC391',
            width: `${100 / itemsCount}%`,
            height: '5px',
            marginLeft: `${(100 / itemsCount) * index}%`,
          }}
        ></div>
      ) : null}
    </div>
  )
}

const Arrows = ({ refs }) => {
  return (
    <div
      style={{
        position: 'absolute',
        marginTop: '50vh',
        height: '10px',
        width: '96%',
        justifyContent: 'space-between',
        marginLeft: '2%',
        marginRight: '2%',
        display: 'flex',
      }}
    >
      <PreviousButton onClick={() => refs.current.slickPrev()} />
      <NextButton onClick={() => refs.current.slickNext()} />
    </div>
  )
}

const ImageCarousel = ({ images }) => {
  const [index, setIndex] = useState(0)
  const sliderRef = useRef()

  const settings = {
    afterChange: (slideIndex) => handleAfterChange(slideIndex),
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
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

  return (
    <Fragment>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <Image src={image} layout="fill" objectFit="contain" />
            <div
              style={{
                height: '100vh',
                position: 'relative',
              }}
            >
              <CustomSlider itemsCount={images.length} index={index} />
              <Arrows refs={sliderRef} />
            </div>
          </div>
        ))}
      </Slider>
    </Fragment>
  )
}

export default ImageCarousel
