import React from 'react'
import { Grid } from '@theme-ui/components'

import { LoadingDots } from '@components/ui'
import { jsx } from 'theme-ui'
import Button from 'blocks/Button/Button'

const PurchaseButton = ({
  colors = null,
  sizes = null,
  title = 'Product_Title',
  loading = false,
  variant = null,
  addToCart,
  getPrice,
}) => {
  return (
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
          },
        }}
        name="add-to-cart"
        disabled={loading}
        onClick={addToCart}
      >
        <span className="flex flex-row justify-between mr-2">
          <span>Bag {loading && <LoadingDots />}</span>
          {/* {getPrice(variant?.priceV2?.amount, variant?.priceV2?.currencyCode)} */}
        </span>
      </Button>
    </div>
  )
}

export default PurchaseButton
