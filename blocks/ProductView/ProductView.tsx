/** @jsxRuntime classic */
/** @jsx jsx */
//@ts-nocheck
import React, { useMemo, useState, useEffect } from 'react'
import { Themed, jsx } from 'theme-ui'
import smoothscroll from 'smoothscroll-polyfill'
import { ArrowLeft, ChevronUp, Plus } from '../../components/icons'
import { NextSeo } from 'next-seo'
import { useUI } from '@components/ui/context'
import {
  useAddItemToCart,
} from '@lib/shopify/storefront-data-hooks'
import {
  prepareVariantsWithOptions,
  getPrice,
} from '@lib/shopify/storefront-data-hooks/src/utils/product'
import Image from 'next/image'
import { LoadingDots, Sidebar } from '@components/ui'
import ProductLoader from './ProductLoader'
import ProductDetails from '@components/ProductDetails/ProductDetails'
import { useSwipeable } from 'react-swipeable'
import Customize from './Customize'
import { isMobile } from '@lib/isMobile'
import capiRequest from '@lib/capiRequest'
import {useRouter} from 'next/router'
import getProductId from '@lib/getProductId'

interface Props {
  className?: string
  children?: any
  product: ShopifyBuy.Product
  renderSeo?: boolean
  description?: string
  title?: string
  scrollType?: string
}

interface ButtonProps {
  onClick?: any
  overlayColor?: string
}

const NextButton: React.FC<ButtonProps> = ({ onClick, overlayColor }) => (
  <button onClick={onClick} className="focus:outline-none">
    <div
      style={{
        transform: 'rotate(90deg)',
      }}
      className="hover-right"
    >
      <ChevronUp width="40" height="40" stroke={overlayColor || 'white'} />
    </div>
  </button>
)
const PreviousButton: React.FC<ButtonProps> = ({ onClick, overlayColor }) => (
  <button onClick={onClick} className="focus:outline-none hover-left">
    <div sx={{ transform: 'rotate(270deg)' }}>
      <ChevronUp width="40" height="40" stroke={overlayColor || 'white'} />
    </div>
  </button>
)

const ProductBox: React.FC<Props> = ({
  product,
  description,
  details,
  images: _images,
  mobileImages,
  renderSeo = true,
  seoDescription = product.description,
  title,
  edition,
  editionDescription = '',
  collection,
  productDescriptionFont,
  detailToggleFont,
  detailFont,
  nameFont,
  editionFont,
  editionDescriptionFont,
  checkoutType,
  scrollType='horizontal'
}) => {
  const [loading, setLoading] = useState(false)
  const [hasRendered, setHasRendered] = useState(false)

  const [height, setHeight] = useState(640)
  const [width, setWidth] = useState(640)
  const [margin, setMargin] = useState(0)
  const [images, setImages] = useState([])
  const [showBuyButton, setShowBuyButton] = useState(true)
  const [leftArmText, setLeftArmText] = useState('')
  const [rightArmText, setRightArmText] = useState('')
  const [size, setSize] = useState('regular')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [_isMobile, setIsMobile] = React.useState(true)

  const customAttributes = { leftArmText, rightArmText, size }

  const addItem = useAddItemToCart()

  const variants = useMemo(
    () => prepareVariantsWithOptions(product?.variants),
    [product?.variants]
  )

  const {
    openCart,
    toggleProductDetails,
    displayProductDetails,
    closeProductDetails,
  } = useUI()

  const router = useRouter();
  const handle = router.query.handle;

  const [peakingImage, setPeakingImage] = useState({
    image: '',
    overlayColor: 'white',
  })
  // const { facebookAccessToken } = facebookConfig
  useEffect(() => {
    const w = window.innerWidth
    const i = w < 640 ? mobileImages || _images : _images
    setWidth(w)
    setHeight(window.innerHeight)
    setImages(i)
    setPeakingImage(i[0])
    setIsMobile(isMobile())
    setHasRendered(true)
    capiRequest('track', 'ViewContent', {
      content_name: title, //Product name here
      content_category: collection, //Category name here
      content_ids: [getProductId(handle)], //Shopify product id here
      content_type: 'product',
      value: variant.price,
      currency: 'USD',

    })
  }, [])

  const peakingImageIndex = images
    ?.map((_image) => _image.image === peakingImage.image)
    .indexOf(true)

  function handlePrevious() {
    peakingImageIndex > 0 && setPeakingImage(images[peakingImageIndex - 1])
  }

  function handleNext() {
    peakingImageIndex < images.length - 1 &&
      setPeakingImage(images[peakingImageIndex + 1])
  }

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedUp: handleNext,
    onSwipedRight: handlePrevious,
    onSwipedDown: handlePrevious,
    preventDefaultTouchmoveEvent: false,
    trackMouse: true,
  })

  const [variant, setVariant] = useState(variants[0] || {})

  const addToCart = async () => {
    setLoading(true)

    capiRequest('track', 'AddToCart', {
      content_name: title, //Product name here
      content_category: collection, //Category name here
      content_ids: [getProductId(handle)], //Shopify product id here
      content_type: 'product',
      value: variant.price,
      currency: 'USD',

    })

    try {
      // process custom attr into key value pairing
      const toSpaced = (str) =>
        str.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`)

      const attr = Object.keys(customAttributes).map((key) => ({
        key: toSpaced(key),
        value: customAttributes[key],
      }))
      await addItem(variant.id, 1, attr)
      openCart()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  const customMethods = {
    ...customAttributes,
    setLeftArmText,
    setRightArmText,
    setSize,
    addToCart,
  }

  React.useEffect(() => {
    var ls = localStorage.getItem('namespace.visited')
    if (ls == null) {
      //ON first render, give a 'content tease' to indicate user should swipe
      setTimeout(() => {
        setMargin(50)
      }, 500)
      setTimeout(() => {
        setMargin(0)
      }, 1200)
      localStorage.setItem('namespace.visited', 1)
    }
    smoothscroll.polyfill()
  }, [])

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      const w = window.innerWidth
      const i = w < 640 ? mobileImages || images : _images
      setHeight(window.innerHeight - 42)
      setWidth(w)
      if (i !== images) {
        setImages(i)
        setPeakingImage(i[0])
      }
    })
  })

  //TODO Could this be broken out into a custom hook?
  const handleScroll = React.useCallback(
    (e) => {
      //check if this is the last slide
      const _isLastSlide = images.length - 1 === peakingImageIndex
      const isFirstSlide = peakingImageIndex === 0
      //check if the user scrolled up or down
      const scrollDirection = e.deltaY > 0 ? 'down' : 'up'
      //if we are at the top of the page and the user is scrolling up, go to the previous slide.

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
          handleNext()
        }

        if (!isFirstSlide && scrollDirection === 'up') {
          e.preventDefault()
          setTimeout(() => {
            setIsTransitioning(false)
          }, 1600)
          setIsTransitioning(true)
          handlePrevious()
        }
      }
    },
    [peakingImageIndex, isTransitioning]
  )

  React.useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false })
    return function cleanup() {
      window.removeEventListener('wheel', handleScroll)
    }
  }, [handleScroll])

  if (!images) {
    return (
      <div style={{ height: height + 'px', width: width + 'px' }}>
        <span>
          loading <LoadingDots />
        </span>
      </div>
    )
  }

  return (
    <div {...handlers} className={displayProductDetails ? 'relative' : 'fixed'}>
      {renderSeo && (
        <NextSeo
          title={title}
          description={seoDescription}
          openGraph={{
            type: 'website',
            title: title,
            description: seoDescription,
            images: [
              {
                url: product.images?.[0]?.src!,
                width: 800,
                height: 600,
                alt: title,
              },
            ],
          }}
        />
      )}

      <div
        sx={{
          position: 'relative',
          height: height,
          width: '100vw',
          backgroundColor: peakingImage.backgroundColor || 'black',
          transition: '0.3S background',
        }}
        className="type-wrapper"
      >
        <div className="w-full h-2 absolute" style={{ zIndex: '1000' }}>
          <div
            style={{
              background: '#ffc391',
              width: `${
                (peakingImageIndex + 1) * (100 / (images?.length || 1))
              }%`,
              height: '100%',
              transition: 'all 0.5s cubic-bezier( 0.4, 0.02, 0.53, 1 )',
            }}
          ></div>
        </div>
        <Themed.div
          className="text-white absolute hover:cursor-pointer"
          sx={{
            marginLeft: '-3.5rem',
            position: 'absolute',
            bottom: '10rem',
            alignSelf: 'flex-end',
            zIndex: 8,
            ' @media (max-width: 768px)': {
              bottom: '18rem',
              marginLeft: '-3rem',
            },
          }}
        >
          <button
            style={{
              transform: 'rotate(90deg)',
              display: 'flex',
              flexDirection: 'inherit',
              color: peakingImage?.overlayColor || 'white',
            }}
            className="active:outline-none focus:outline-none hover-right"
            onClick={toggleProductDetails}
          >
            Details and Specs
            <ArrowLeft
              orientation="down"
              stroke={peakingImage?.overlayColor || 'white'}
            />
          </button>
        </Themed.div>

        <div
          sx={{
            display: 'flex',
            flexDirection: 'column',
            zIndex: '5',
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'space-around',
            padding: '1rem',
            ' @media (max-width: 768px)': {
              px: 0,
            },
          }}
        >
          <div
            className={`flex flex-row ${
              peakingImageIndex !== 0 ? 'justify-between' : 'justify-end'
            }  items-start`}
          >
            {peakingImageIndex !== 0 && scrollType !=='vertical' && (
              <PreviousButton
                overlayColor={peakingImage?.overlayColor}
                onClick={handlePrevious}
              />
            )}
            {peakingImageIndex !== (images?.length - 1 || 0) && scrollType !=='vertical' && (
              <NextButton
                overlayColor={peakingImage?.overlayColor}
                onClick={handleNext}
              />
            )}
          </div>
        </div>
        {peakingImage.image && (
          <div
            sx={{
              padding: 0,
              marginBottom: 2,
              position: 'absolute',
              zIndex: '1',
              width: width,
              height: height,
              overflow: 'hidden',
            }}
          >
            <div
              className={scrollType==='horizontal' ? `inline-flex` : `flex flex-col`}
              style={{
                marginLeft: scrollType==='horizontal' && `-${margin || width * peakingImageIndex}px`,
                marginTop: scrollType === 'vertical' && `-${margin || height * peakingImageIndex}px`,
                transition: '0.8s all',
              }}
            >
              {images.map((image, idx) => (
                <div
                  key={`img${idx}`}
                  style={{ width: width, height: height, position: 'relative' }}
                >
                  {(!image.type || image.type !== 'video') && (
                    <Image
                      src={image.image}
                      layout="fill"
                      objectFit={image.display || 'cover'}
                      objectPosition="center"
                      alt={title}
                      priority
                      quality={100}
                      className="object-center object-cover pointer-events-none"
                    />
                  )}
                  {image.type === 'video' && !_isMobile && (
                    <video
                      style={{ minHeight: '100%', objectFit: 'cover' }}
                      layout="fill"
                      src={image.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                    ></video>
                  )}
                  {
                    // need to use image tag to autoplay videos on mobile
                    image.type === 'video' && _isMobile && (
                      <img
                        style={{ minHeight: '100%', objectFit: 'cover' }}
                        src={image.image}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    )
                  }
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Sidebar
        open={displayProductDetails}
        onClose={closeProductDetails}
        from="left"
        zIndex={8}
      >
        <ProductDetails
          details={details}
          productDescription={description}
          setShowBuyButton={setShowBuyButton}
          showBuyButton={showBuyButton}
          productDescriptionFont={productDescriptionFont}
          detailToggleFont={detailToggleFont}
          detailFont={detailFont}
        />
      </Sidebar>
      {/*CONTENT SECTION*/}
      <div
        className={` ${
          checkoutType === 'basic'
            ? 'w-full md:w-3/5 lg:w-1/2 xl:w-2/5'
            : 'w-140 sm:w-144'
        } text-center md:text-left p-8 md:pl-0 md:pt-0 absolute fit-content`}
        style={{
          bottom: '0',
          right: '0',
          transition: '0.5s all',
          // opacity: showBuyButton ? 100 : 0,
          bottom: showBuyButton ? 0 : '-25rem',
          zIndex: '9',
        }}
      >
        <div className="justify-center md:justify-start flex flex-row items-end mb-2 items-baseline">
          <h1
            className="mb-0 pb-0 text-4xl mb-0 pb-0 font-extrabold"
            style={{
              color: peakingImage?.overlayColor || 'white',
              fontFamily: nameFont,
            }}
          >
            {collection}
          </h1>
          <h2
            className="mb-0 pb-0 text-md"
            style={{
              color: peakingImage?.overlayColor || 'white',
              fontFamily: nameFont,
            }}
          >
            __{title}
          </h2>
        </div>

        {checkoutType === 'custom' ? (
          <Customize
            variant={variant}
            displayProductDetails={displayProductDetails}
            toggleProductDetails={toggleProductDetails}
            {...customMethods}
            screenWidth={width}
          />
        ) : (
          <button
            className="hover-button active flex"
            icon={<Plus />}
            name="add-to-cart"
            disabled={loading}
            onClick={addToCart}
          >
            <span className="flex flex-row justify-between mr-2 w-full ">
              <span>Bag {loading && <LoadingDots />}</span>
              {getPrice(variant.priceV2.amount, variant.priceV2.currencyCode)}
            </span>
          </button>
        )}
        <p
          className="mt-4"
          style={{
            color: peakingImage?.overlayColor || 'white',
            fontFamily: editionFont,
          }}
        >
          {edition}
        </p>
        <p
          className="mt-2 text-xs"
          style={{
            color: peakingImage?.overlayColor || 'white',
            fontFamily: editionDescriptionFont,
          }}
        >
          {editionDescription}
        </p>
      </div>
    </div>
  )
}

const ProductView: React.FC<{
  product: string | ShopifyBuy.Product
  renderSeo?: boolean
  description?: string
  title?: string
}> = ({ product, ...props }) => {
  return (
    <ProductLoader product={product}>
      {(productObject) => <ProductBox {...props} product={productObject} />}
    </ProductLoader>
  )
}
export default ProductView
