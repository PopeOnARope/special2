import React from 'react'
import styled from 'styled-components'
import { ChevronUp } from '../../components/icons'
// import { NextSeo } from 'next-seo'
// import { Themed, jsx } from 'theme-ui'
// import { LoadingDots } from '@components/ui'
// import builderConfig from '@config/builder'

import Button from '../Button/Button'
import {H1} from '../../components/Typography'
// import NextArrow from '../../assets/nextArrow.svg'

const Wrapper = styled.div`
  height: ${({ height }) => height}px;
  width: 100%;
  background: url(${({ background }) => background});
  background-size: cover;
  background-position-y: center;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  .content {
    display: flex;
    flex-direction: column;
    margin-left: 50px;
    margin-bottom: 33px;
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

  &:hover {
    margin-bottom: 24px;
    transition: 0.3s ease-in-out;
  }
  &:focus {
    outline: none;
  }
`

const ChevronDown = styled.div`
transform: rotate(180deg);
`

const Carousel = (props) => {
  console.log({ props })
  const { slides } = props

  const [height, setHeight] = React.useState(780)
  const [currentSlide, setCurrentSlide] = React.useState(0)

  React.useEffect(() => {
    // window is accessible here.
    setHeight(window.innerHeight)
  }, [])

  if (!slides) {
    return (
      <Wrapper>
        <p>Add some slides</p>
      </Wrapper>
    )
  }
  const { image, titleLine1, titleLine2, buttonLabel, buttonLink } = props.slides[currentSlide];
  const collectionAvailable = true

  function updateSlide() {
    const slide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(slide)
  }

  return (
    <Wrapper height={height} background={image}>
      <div className="content">
        <H1>{titleLine1}</H1>
        {titleLine2 && <H1 className="title2">{titleLine2}</H1>}
        {collectionAvailable && (
          <Button displayAs='link' href={buttonLink}>{buttonLabel}</Button>
        )}
      </div>
      <NextButton onClick={updateSlide}>1 out of {slides.length} <ChevronDown><ChevronUp/></ChevronDown></NextButton>
    </Wrapper>
  )
}

export default Carousel
