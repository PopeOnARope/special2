/** @jsxRuntime classic */
/** @jsx jsx */
import { Themed, jsx } from 'theme-ui'
import Image from 'next/image'
import { Card, Text } from '@theme-ui/components'
import { Link } from '@components/ui'
import { getPrice } from '@lib/shopify/storefront-data-hooks/src/utils/product'
import { useState } from 'react'
import NoSSR from './NoSSR'

export interface ProductCardProps {
  className?: string
  product: ShopifyBuy.Product
  imgWidth: number | string
  imgHeight: number | string
  imgLayout?: 'fixed' | 'intrinsic' | 'responsive' | undefined
  imgPriority?: boolean
  imgLoading?: 'eager' | 'lazy'
  imgSizes?: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  imgWidth,
  imgHeight,
  imgPriority,
  imgLoading,
  imgSizes,
  imgLayout = 'responsive',
}) => {
  const [showAlternate, setShowAlternate] = useState(false)
  const src =
    product.images[0]?.src ||
    `https://via.placeholder.com/${imgWidth}x${imgHeight}`
  const handle = (product as any).handle
  const productVariant: any = product.variants[0]
  const price = getPrice(
    productVariant.priceV2.amount,
    productVariant.priceV2.currencyCode
  )
  const alternateImage = product.images[1]?.src

  return (
    <Card
      sx={{
        // maxWidth: [761, imgWidth || 761],
        p: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseOut={() => setShowAlternate(false)}
      onMouseOver={() => setShowAlternate(true)}
    >
      <Link href={`/product/${handle}/`}>
        <div>
          <Themed.h2 sx={{ mt: 4, mb: 0, fontSize: 16, fontFamily: 'Value Sans Pro' }}>
            {product.title}
          </Themed.h2>
          <Text sx={{ fontSize: 16, mb: 2, fontFamily: 'Value Sans Pro' }}>{price}</Text>
        </div>
        <div className='transform transition duration-700 hover:scale-105'>
            <Image
              quality="100"
              src={src}
              alt={product.title}
              width={761}
              sizes={imgSizes}
              height={329}
              layout={imgLayout}
              loading={imgLoading}
              priority={imgPriority}
            />

        </div>
      </Link>
    </Card>
  )
}

export default ProductCard
