/** @jsxRuntime classic */
/** @jsx jsx */
//@ts-nocheck
import React from 'react'
import { jsx } from 'theme-ui'
import ProductLoader from './ProductLoader'
import ProductBox from '@components/product/ProductBox'

// interface CustomProduct extends ShopifyBuy.Product {
//   ['Artistry Eyewear']?: string
// }

const ProductView: React.FC<{
  product: string | ShopifyBuy.Product
  renderSeo?: boolean
  description?: string
  ['Artistry Eyewear']?: string
  title?: string
}> = ({ product, ...props }) => {
  return (
    <ProductLoader product={product}>
      {(productObject) => <ProductBox {...props} product={productObject} />}
    </ProductLoader>
  )
}
export default ProductView
