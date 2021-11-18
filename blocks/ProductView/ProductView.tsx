/** @jsxRuntime classic */
/** @jsx jsx */
//@ts-nocheck
import React, { useMemo, useState, useEffect } from 'react'
import { Themed, jsx } from 'theme-ui'
import Button from '../Button/Button'

import { ArrowLeft, ChevronUp, Plus } from '../../components/icons'
import { NextSeo } from 'next-seo'
import { useUI } from '@components/ui/context'
import {
  useAddItemToCart,
  useCheckoutUrl,
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

interface Props {
  className?: string
  children?: any
  product: ShopifyBuy.Product
  renderSeo?: boolean
  description?: string
  title?: string
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
  collection,
  productDescriptionFont,
  detailToggleFont,
  detailFont,
  nameFont,
  editionFont,
  checkoutType,
}) => {
  const [loading, setLoading] = useState(false)
  const [height, setHeight] = useState(640)
  const [width, setWidth] = useState(640)
  const [margin, setMargin] = useState(0)
  const [images, setImages] = useState([])
  const [showBuyButton, setShowBuyButton] = useState(true)
  const [leftArmText, setLeftArmText] = useState('')
  const [rightArmText, setRightArmText] = useState('')
  const [size, setSize] = useState('regular')

  const customProperties = { leftArmText, rightArmText, size }
  // methods that need to be passed to the customize component


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

  const [peakingImage, setPeakingImage] = useState({
    image: '',
    overlayColor: 'white',
  })

  useEffect(() => {
    const w = window.innerWidth
    const i = w < 640 ? mobileImages || _images : _images
    setWidth(w)
    setHeight(window.innerHeight)
    setImages(i)
    setPeakingImage(i[0])
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
    onSwipedRight: handlePrevious,
    preventDefaultTouchmoveEvent: false,
    trackMouse: true,
  })

  const [variant, setVariant] = useState(variants[0] || {})

  const checkoutUrl = useCheckoutUrl()

  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem(variant.id, 1)
      openCart()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  const customMethods = {
    ...customProperties,
    setLeftArmText,
    setRightArmText,
    setSize,
    addToCart
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
      {/* TODO: remove the minimum height of innerLayout so there is no overflow in height */}

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
          className="text-white absolute z-50 hover:cursor-pointer"
          sx={{
            marginLeft: '-3.5rem',
            position: 'absolute',
            bottom: '10rem',
            alignSelf: 'flex-end',
            zIndex: 6,
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
            {peakingImageIndex !== 0 && (
              <PreviousButton
                overlayColor={peakingImage?.overlayColor}
                onClick={handlePrevious}
              />
            )}
            {peakingImageIndex !== (images?.length - 1 || 0) && (
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
              className="inline-flex"
              style={{
                marginLeft: `-${margin || width * peakingImageIndex}px`,
                transition: '0.8s all',
              }}
            >
              {images.map((image, idx) => (
                <div
                  style={{ width: width, height: height, position: 'relative' }}
                >
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
          productDescriptionFont={productDescriptionFont}
          detailToggleFont={detailToggleFont}
          detailFont={detailFont}
        />
      </Sidebar>
      {/*CONTENT SECTION*/}
      <div
        className={`w-full ${ checkoutType==='basic' ? 'md:w-3/5 lg:w-1/2 xl:w-2/5' : 'sm:w-144'} text-center md:text-left p-8 md:pl-0 md:pt-0  z-10 absolute fit-content`}
        style={{
          bottom: '0',
          right: '0',
          transition: '0.5s all',
          opacity: showBuyButton ? 100 : 0,
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
          <Customize variant={variant}  {...customMethods} screenWidth={width} />
        ) : (
          <Button
            style={{ width: '100%' }}
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
            icon={<Plus />}
            name="add-to-cart"
            disabled={loading}
            onClick={addToCart}
          >
            <span className="flex flex-row justify-between mr-2">
              <span>Bag {loading && <LoadingDots />}</span>
              {getPrice(variant.priceV2.amount, variant.priceV2.currencyCode)}
            </span>
          </Button>
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
