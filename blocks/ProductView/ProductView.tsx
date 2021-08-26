/** @jsxRuntime classic */
/** @jsx jsx */
//@ts-nocheck
import React, { useMemo, useState, useEffect } from 'react'
import { Themed, jsx } from 'theme-ui'
import { Grid } from '@theme-ui/components'
import Button from '../Button/Button'

import Thumbnail from '@components/common/Thumbnail'
import { ArrowLeft, ChevronUp, Plus } from '../../components/icons'
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
import NoSSR from '@components/common/NoSSR'
import { LoadingDots, Sidebar } from '@components/ui'
import ProductLoader from './ProductLoader'
import ProductDetails from '@components/ProductDetails/ProductDetails'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import styled from 'styled-components'

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
      sx={{
        transform: 'rotate(90deg)',
      }}
      className="hover:pr-20"
    >
      <ChevronUp width="40" height="40" stroke={overlayColor || 'white'} />
    </div>
  </button>
)
const PreviousButton: React.FC<ButtonProps> = ({ onClick, overlayColor }) => (
  <button onClick={onClick} className="focus:outline-none">
    <div sx={{ transform: 'rotate(270deg)' }}>
      <ChevronUp width="40" height="40" stroke={overlayColor || 'white'} />
    </div>
  </button>
)

const ProductBox: React.FC<Props> = ({
  product,
  description,
  details,
  images,
  overlayColor,
  renderSeo = true,
  seoDescription = product.description,
  title = product.title,

  ...rest
}) => {
  console.log({ description, details, images, overlayColor })
  const [loading, setLoading] = useState(false)
  const addItem = useAddItemToCart()
  // const colors: string[] | undefined = product?.options
  //   ?.find((option) => option?.name?.toLowerCase() === 'color')
  //   ?.values?.map((op) => op.value as string)
  //
  // const sizes: string[] | undefined = product?.options
  //   ?.find((option) => option?.name?.toLowerCase() === 'size')
  //   ?.values?.map((op) => op.value as string)
  //
  const variants = useMemo(
    () => prepareVariantsWithOptions(product?.variants),
    [product?.variants]
  )
  // const images = useMemo(() => prepareVariantsImages(variants, 'color'), [
  //   variants,
  // ])

  const {
    openCart,
    toggleProductDetails,
    displayProductDetails,
    closeProductDetails,
  } = useUI()

  const [peakingImage, setPeakingImage] = useState( {image:'', overlayColor: 'white'})

  useEffect(()=>{setPeakingImage(images[0])}, [])

  const [variant, setVariant] = useState(variants[0] || {})
  // const [color, setColor] = useState(variant.color)
  // const [size, setSize] = useState(variant.size)

  function IsJsonString(str) {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }

  // useEffect(() => {
  //   const newVariant = variants.find((variant) => {
  //     return (
  //       (variant.size === size || !size) && (variant.color === color || !color)
  //     )
  //   })
  //
  //   if (variant.id !== newVariant?.id) {
  //     setVariant(newVariant)
  //     setPeakingImage(null)
  //   }
  // }, [size, color, variants, variant.id])

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

  return (
    <React.Fragment>
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
          height: '100vh',
          width: '100vw',
          backgroundColor: 'black',
        }}
        className="type-wrapper"
      >
        <Themed.div
          className="text-white absolute z-50 hover:cursor-pointer"
          sx={{
            marginLeft: '-2rem',
            position: 'absolute',
            bottom: '10rem',
            alignSelf: 'flex-end',
            zIndex: 6,
            ' @media (max-width: 768px)': {
              bottom: '18rem',
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
            className="active:outline-none focus:outline-none"
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
          <div className="flex flex-row justify-between items-start">
            <PreviousButton
              overlayColor={peakingImage?.overlayColor}
              onClick={() => {
                const img = peakingImage || images[0]
                const peakingImageIndex = images
                  .map((_image) => _image.id === img.id)
                  .indexOf(true)
                const newPeakingImageIndex =
                  peakingImageIndex === 0
                    ? images.length - 1
                    : peakingImageIndex - 1
                setPeakingImage(images[newPeakingImageIndex])
              }}
            />
            <NextButton
              overlayColor={peakingImage?.overlayColor}
              onClick={() => {
                const img = peakingImage || images[0]
                const peakingImageIndex = images
                  .map((_image) => _image.id === img.id)
                  .indexOf(true)
                const newPeakingImageIndex =
                  peakingImageIndex === images.length - 1
                    ? 0
                    : peakingImageIndex + 1
                setPeakingImage(images[newPeakingImageIndex])
              }}
            />
          </div>
        </div>
        <div
          sx={{
            border: '1px solid gray',
            padding: 2,
            marginBottom: 2,
            position: 'absolute',
            zIndex: '0',
            width: '100%',
            height: '100%',
            ' .slide-enter': {
              opacity: 0,
            },
            '  .slide-enter-active': {
              opacity: 1,
              transition: 'all 0.3s',
            },
            ' .slide-exit': {
              opacity: 1,
            },
            ' .slide-exit-active': {
              opacity: 0,
              transition: 'all 0.3s',
            },
          }}
        >
          {peakingImage.image && (
            <SwitchTransition mode="out-in">
              <CSSTransition
                key={peakingImage}
                classNames="slide"
                timeout={300}
                mode="in-out"
              >
                <Image
                  src={peakingImage.image}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt={title}
                  priority
                  quality={100}
                  className="object-center object-cover pointer-events-none"
                />
              </CSSTransition>
            </SwitchTransition>
          )}
        </div>
      </div>
      <Sidebar
        open={displayProductDetails}
        onClose={closeProductDetails}
        from="left"
        zIndex={8}
      >
        <ProductDetails
          details={details}
          productDescription={
            product.metafields &&
            product.metafields[0]?.data?.productDescription
          }
        />
      </Sidebar>
      {/*CONTENT SECTION*/}
      <div
        className="w-full md:w-3/5 lg:w-1/2 xl:w-2/5 text-center md:text-left p-8 md:pl-0 md:pt-0  z-10 absolute fit-content"
        style={{ bottom: '0', right: '0' }}
      >
        <div className="justify-center md:justify-start flex flex-row items-end mb-2 items-baseline">
          <h1
            className="mb-0 pb-0 text-4xl mb-0 pb-0 font-extrabold"
            style={{ color: peakingImage?.overlayColor || 'white' }}
          >
            {product.metafields[0]?.data?.collectionName}
          </h1>
          <h2
            className="mb-0 pb-0 text-md"
            style={{ color: peakingImage?.overlayColor || 'white' }}
          >
            __{title}
          </h2>
        </div>

        <Button
          style={{ width: '100%' }}
          sx={{
            background: 'linear-gradient(to left, #000 50%, #FFC391 50%) right',
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
        <p
          className="mt-4"
          style={{ color: peakingImage?.overlayColor || 'white' }}
        >
          {product.metafields[0]?.data?.editionInfo}
        </p>
      </div>
    </React.Fragment>
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
