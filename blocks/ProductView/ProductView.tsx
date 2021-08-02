/** @jsxRuntime classic */
/** @jsx jsx */
//@ts-nocheck
import React, { useMemo, useState, useEffect } from 'react'
import { Themed, jsx } from 'theme-ui'
import { Grid } from '@theme-ui/components'
import Button from '../Button/Button'

import Thumbnail from '@components/common/Thumbnail'
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
import NoSSR from '@components/common/NoSSR'
import { LoadingDots, Sidebar } from '@components/ui'
import ProductLoader from './ProductLoader'
import ProductDetails from '@components/ProductDetails/ProductDetails'

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
}
const NextButton: React.FC<ButtonProps> = ({ onClick }) => (
  <button onClick={onClick} className='focus:outline-none'>
    <div sx={{ color: 'white', transform: 'rotate(90deg)' }} className='hover:pr-20'>
      <ChevronUp />
    </div>
  </button>
)
const PreviousButton: React.FC<ButtonProps> = ({ onClick }) => (
  <button onClick={onClick} className='focus:outline-none'>
    <div sx={{ color: 'white', transform: 'rotate(270deg)' }}>
      <ChevronUp />
    </div>
  </button>
)

const ProductBox: React.FC<Props> = ({
  product,
  renderSeo = true,
  description = product.description,
  title = product.title,
}) => {
  const [loading, setLoading] = useState(false)
  const addItem = useAddItemToCart()
  const colors: string[] | undefined = product?.options
    ?.find((option) => option?.name?.toLowerCase() === 'color')
    ?.values?.map((op) => op.value as string)

  const sizes: string[] | undefined = product?.options
    ?.find((option) => option?.name?.toLowerCase() === 'size')
    ?.values?.map((op) => op.value as string)

  const variants = useMemo(
    () => prepareVariantsWithOptions(product?.variants),
    [product?.variants]
  )
  const images = useMemo(() => prepareVariantsImages(variants, 'color'), [
    variants,
  ])

  const { openCart, toggleProductDetails, displayProductDetails, closeProductDetails } = useUI()
  const [peakingImage, setPeakingImage] = useState(
    null as { src: string } | null
  )

  const [variant, setVariant] = useState(variants[0] || {})
  const [color, setColor] = useState(variant.color)
  const [size, setSize] = useState(variant.size)

  function IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
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

  console.log({ product })

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
                url: product.images?.[0]?.src!,
                width: 800,
                height: 600,
                alt: title,
              },
            ],
          }}
        />
      )}
      <div sx={{ position: 'relative', height: 902 }} className="type-wrapper">
        <div className='text-white absolute z-50 mt-1/3 rotate-90' style={{ marginLeft: '-2rem' }} >
          <button style={{ transform: 'rotate(90deg)', display: 'inline-flex' }} onClick={toggleProductDetails}>Details and Specs <ArrowLeft orientation='down' marginTop='0' /></button>
        </div>
        <div
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

          <div className="flex flex-row justify-between items-start w-full h-1/2">
            <PreviousButton
              onClick={() => {
                const img = peakingImage || variant.image
                const peakingImageIndex = product.images.indexOf(img)
                const newPeakingImageIndex =
                  peakingImageIndex === 0
                    ? product.images.length - 1
                    : peakingImageIndex - 1
                setPeakingImage(product.images[newPeakingImageIndex])
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
              }}
            />
          </div>
          <div>
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
                background: 'linear-gradient(to left, #000 50%, #FFC391 50%) right',
                transition: '.5s ease-out',
                backgroundSize: '200%',
                ' &:hover': {
                  boxShadow: '6px 5px 10px rgba(0,0,0,0.2)',
                  color: '#000',
                  backgroundPosition: 'left',
                }
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
          }}
        >
          {variant.image && (
            <Image
              src={peakingImage?.src || variant.image.src}
              layout="fill"
              //width={700}
              //height={400}

              objectFit="cover"
              objectPosition="center"
              alt={title}
              priority
              quality={100}
              className="object-center object-cover pointer-events-none"
            />
          )}
        </div>
      </div>
      <Sidebar
        open={displayProductDetails}
        onClose={closeProductDetails}
        from="left"
      >
        <ProductDetails details={IsJsonString(product.description) ? JSON.parse(product.description) : {}} />
      </Sidebar>
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
