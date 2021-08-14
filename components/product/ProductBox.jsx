/** @jsxRuntime classic */
/** @jsx jsx */
//@ts-nocheck
import React, { useMemo, useState, useEffect, useRef } from 'react'
import { Themed, jsx } from 'theme-ui'
import { Grid } from '@theme-ui/components'

import { ArrowLeft, ChevronUp } from '../../components/icons'
import OptionPicker from '@components/common/OptionPicker'
import { NextSeo } from 'next-seo'
import { useUI } from '@components/ui/context'
import { useAddItemToCart } from '@lib/shopify/storefront-data-hooks'
import {
  prepareVariantsWithOptions,
  prepareVariantsImages,
  getPrice,
} from '@lib/shopify/storefront-data-hooks/src/utils/product'
import Image from 'next/image'
import { LoadingDots, Sidebar } from '@components/ui'
import ProductDetails from '@components/ProductDetails/ProductDetails'
import Button from '../../blocks/Button/Button'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const CustomSlider = ({
  itemsCount = 1,
  index = 0,
  style = { position: 'absolute' },
}) => {
  // TODO: Add animation when moving slide
  return (
    <div
      sx={[
        {
          width: '100%',
          height: 'auto',
          top: 0,
          zIndex: 50,
        },
        style,
      ]}
    >
      {itemsCount > 1 ? (
        <div
          sx={{
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

const NextButton = ({ onClick }) => (
  <button onClick={onClick} s className="focus:outline-none">
    <div
      sx={{
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
    <div sx={{ color: 'white', transform: 'rotate(270deg)' }}>
      <ChevronUp />
    </div>
  </button>
)

const ProductBox = ({
  product,
  renderSeo = true,
  description = product.description,
  title = product.title,
}) => {
  const addItem = useAddItemToCart()

  const [loading, setLoading] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const numberOfImage = 5

  const mainSliderRef = useRef()
  const [mainSlideIndex, setMainSlideIndex] = useState(0)

  const getNextImage = (num) => {
    var nextIndex = currentImage + num

    if (nextIndex < 0) {
      nextIndex = numberOfImage - 1
    }

    if (nextIndex >= numberOfImage) {
      nextIndex = 0
    }

    setCurrentImage(nextIndex)
  }

  const colors = product?.options
    ?.find((option) => option?.name?.toLowerCase() === 'color')
    ?.values?.map((op) => op.value)

  const sizes = product?.options
    ?.find((option) => option?.name?.toLowerCase() === 'size')
    ?.values?.map((op) => op.value)

  const variants = useMemo(
    () => prepareVariantsWithOptions(product?.variants),
    [product?.variants]
  )

  const images = useMemo(() => prepareVariantsImages(variants, 'color'), [
    variants,
  ])

  const {
    openCart,
    toggleProductDetails,
    displayProductDetails,
    closeProductDetails,
  } = useUI()

  const [peakingImage, setPeakingImage] = useState(null)

  const [variant, setVariant] = useState(variants[0] || {})
  const [color, setColor] = useState(variant.color)
  const [size, setSize] = useState(variant.size)

  function IsJsonString(str) {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }

  useEffect(() => {
    const newVariant = variants.find((variant) => {
      return (
        (variant.size === size || !size) && (variant.color === color || !color)
      )
    })

    if (variant.id !== newVariant?.id) {
      setVariant(newVariant)
      setPeakingImage(null)
    }
  }, [size, color, variants, variant.id])

  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem(variant.id, 1)
      console.log('item added')
      openCart()
      setLoading(false)
    } catch (err) {
      console.log({ err })
      setLoading(false)
    }
  }

  const handleMainSliderChange = (index) => {
    setMainSlideIndex(index)
  }

  console.log('product.images.length')
  console.log(product.images.length)
  console.log('***************')

  console.log('variants')
  console.log(variants.length)
  console.log('***************')

  console.log('variant.priceV2')
  console.log(variant.priceV2)
  console.log('***************')

  if (variant.image) {
    console.log('variant.image.src')
    console.log(variant.image.src)
    console.log('***************')
  }

  console.log('size')
  console.log(size)
  console.log('***************')

  console.log('color')
  console.log(color)
  console.log('***************')

  return (
    <React.Fragment>
      {renderSeo && (
        <NextSeo
          title={title}
          description={description}
          openGraph={{
            type: 'website',
            title: title,
            description: description,
            images: [
              {
                url: product.images?.[0]?.src,
                width: 800,
                height: 600,
                alt: title,
              },
            ],
          }}
        />
      )}

      {/* Top-most divider */}
      <div
        sx={{
          position: 'relative',
          height: '100vh',
          width: '100vw',
          // backgroundColor: 'black',
          overflowX: 'hidden',
          overflowY: 'hidden',
        }}
        className="type-wrapper"
      >
        <Slider
          ref={mainSliderRef}
          infinite
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          swipeToSlide={false}
          arrows={false}
          afterChange={handleMainSliderChange}
        >
          <div
            sx={{
              display: 'flex',
              height: '100vh',
              width: '100vw',
              position: 'relative',
            }}
          >
            <Image
              src={peakingImage?.src || variant.image.src}
              objectFit="cover"
              objectPosition="center"
              alt={title}
              priority
              quality={100}
              layout="fill"
              className="object-center object-cover"
            />
            <CustomSlider itemsCount={numberOfImage} index={currentImage} />
          </div>
          <div>
            <ProductDetails
              details={
                IsJsonString(product.description)
                  ? JSON.parse(product.description)
                  : {}
              }
            />
          </div>
        </Slider>

        <div
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            alignItems: 'center',
            marginBottom: '200px',
            marginLeft: '-70px',
            transform: 'rotate(90deg)',
            color: 'white',
            cursor: 'pointer',
            width: '200px',
            minWidth: '200px',
            textAlign: 'right',
            // TODO: Remove button outline
            ' &:select:focus': {
              outline: 'none',
            },
          }}
        >
          {mainSlideIndex === 0 ? (
            <button onClick={() => mainSliderRef?.current.slickPrev()}>
              Details and Specs <ArrowLeft orientation="down" marginTop="0" />
            </button>
          ) : (
            <button onClick={() => mainSliderRef?.current.slickNext()}>
              <ArrowLeft orientation="right" marginTop="10" />
            </button>
          )}
        </div>

        <div
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            marginBottom: '50px',
            marginRight: '70px',
          }}
        >
          <h1 className="text-3xl text-white mb-0 pb-0">{title}</h1>
          <Grid columns={2}>
            {colors?.length && (
              <OptionPicker
                key="Color"
                name="Color"
                options={colors}
                selected={color}
                onChange={(event) => setColor(event.target.value)}
              />
            )}
            {sizes?.length && (
              <OptionPicker
                key="Size"
                name="Size"
                options={sizes}
                selected={size}
                onChange={(event) => setSize(event.target.value)}
              />
            )}
          </Grid>
          <Button
            sx={{
              background:
                'linear-gradient(to left, #000 50%, #FFC391 50%) right',
              transition: '.5s ease-out',
              backgroundSize: '200%',
              ' &:hover': {
                boxShadow: '6px 5px 10px rgba(0,0,0,0.2)',
                color: '#000',
                backgroundPosition: 'left',
              },
            }}
            name="add-to-cart"
            disabled={loading}
            onClick={addToCart}
          >
            <span className="flex flex-row justify-between mr-2">
              <span>Bag {loading && <LoadingDots />}</span>
              {getPrice(variant.priceV2.amount, variant.priceV2.currencyCode)}
            </span>
          </Button>
          <br />
          <p sx={{ color: 'white' }}>Limited Edition of 200</p>
        </div>

        {/* <div
          sx={{
            display: 'flex',
            flexDirection: 'column',
            zIndex: '20',
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: 32,
          }}
        >
          <div className="flex flex-row relative justify-between items-start w-full h-1/2">
            <PreviousButton
              onClick={() => {
                const img = peakingImage || variant.image
                const peakingImageIndex = product.images.indexOf(img)
                const newPeakingImageIndex =
                  peakingImageIndex === 0
                    ? product.images.length - 1
                    : peakingImageIndex - 1
                setPeakingImage(product.images[newPeakingImageIndex])
                getNextImage(-1)
              }}
            />

            <NextButton
              onClick={() => {
                const img = peakingImage || variant.image
                const peakingImageIndex = product.images.indexOf(img)
                const newPeakingImageIndex =
                  peakingImageIndex === product.images.length - 1
                    ? 0
                    : peakingImageIndex + 1
                setPeakingImage(product.images[newPeakingImageIndex])
                getNextImage(1)
              }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                marginLeft: '-6rem',
                transform: 'rotate(90deg)',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              <button
                style={{
                  display: 'flex',
                }}
                onClick={toggleProductDetails}
              >
                Details and Specs <ArrowLeft orientation="down" marginTop="0" />
              </button>
            </div>
          </div>

          
        </div>

        <div
          sx={{
            border: '1px solid gray',
            padding: 2,
            marginBottom: 2,
            position: 'relative',
            zIndex: '0',
            width: '100%',
            height: '100%',
          }}
        >
          {variant.image && (
            <Image
              src={peakingImage?.src || variant.image.src}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt={title}
              priority
              quality={100}
              className="object-center object-cover"
            />
          )}
        </div> */}
      </div>
      {/* <Sidebar
        open={displayProductDetails}
        onClose={closeProductDetails}
        from="left"
      >
        <ProductDetails
          details={
            IsJsonString(product.description)
              ? JSON.parse(product.description)
              : {}
          }
        />
      </Sidebar> */}
    </React.Fragment>
  )
}

export default ProductBox
