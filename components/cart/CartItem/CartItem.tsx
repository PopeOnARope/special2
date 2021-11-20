/** @jsxRuntime classic */
/** @jsx jsx */
import { Themed, jsx, Grid, Button, Input, Text, IconButton } from 'theme-ui'
import React, { ChangeEvent, useEffect, useState } from 'react'
import builderConfig from '@config/builder'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Minus, ArrowLeft } from '@components/icons'
import { getPrice } from '@lib/shopify/storefront-data-hooks/src/utils/product'
import {
  useUpdateItemQuantity,
  useRemoveItemFromCart,
} from '@lib/shopify/storefront-data-hooks'
import {
  BuillderConfig,
  getProduct,
} from '@lib/shopify/storefront-data-hooks/src/api/operations-builder'
import Select from '@components/ui/Form/Select'

function getDetails(config: BuillderConfig, id: string) {
  return getProduct(config, { id }).then((r) => {
    return r.description
  })
}

const CartItem = ({
  item,
  currencyCode,
}: {
  item: /*ShopifyBuy.LineItem todo: check if updated types*/ any
  currencyCode: string
}) => {
  const updateItem = useUpdateItemQuantity()
  const removeItem = useRemoveItemFromCart()
  const [quantity, setQuantity] = useState(item.quantity)
  const [details, setDetails] = useState(false)
  const [removing, setRemoving] = useState(false)
  const updateQuantity = async (quantity: number) => {
    const q = typeof(quantity) === 'number' ? quantity : parseFloat(quantity)
    await updateItem(item.variant.id, q)
  }
  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
    }
  }
  const handleBlur = () => {
    const val = Number(quantity)

    if (val !== item.quantity) {
      updateQuantity(val)
    }
  }
  const increaseQuantity = (n = 1) => {
    const val = Number(quantity) + n

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
      updateQuantity(val)
    }
  }
  const handleRemove = async () => {
    setRemoving(true)

    try {
      // If this action succeeds then there's no need to do `setRemoving(true)`
      // because the component will be removed from the view
      await removeItem(item.variant.id)
    } catch (error) {
      console.error(error)
      setRemoving(false)
    }
  }

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity)
    }
  }, [item.quantity])

  return (
    <div className="flex flex-row justify-between p-2 w-full min-h-8 md:p-4 lg:justify-around lg:justify max-w-4xl">
      <div className="w-1/3 md:w-1/4 relative">
        {item.variant.image &&  item.variant.image.altText &&
        <Image
          layout="fill"
          objectFit='cover'
          objectPosition="center"
          alt={item.variant.image?.altText}
          src={item.variant.image.src}
        />
        }
      </div>
      <div className='px-2'>
        <Themed.div
          as={Link}
          href={`/product/${item.variant.product.handle}/`}
          sx={{ fontSize: 3, m: 0, fontWeight: 700 }}
        >
          <h1
            sx={{
              fontWeight: 700,
              fontSize: '1.2rem',
              fontFamily: 'Value Sans Pro',
            }}
          >
            {item.title}
          </h1>
        </Themed.div>
        <Themed.ul sx={{ fontSize: '0.7rem', color: '#222' }}>
          <li>100% Carbon Offset</li>
          <li>Limited Edition of 200</li>
          <li>Free 2-day Shipping within The United States</li>
        </Themed.ul>
      </div>
      <div className='font-bold'>
        {getPrice(
          item.variant.priceV2.amount,
          item.variant.priceV2.currencyCode || 'USD'
        )}
      </div>
      <div className="p-1 m-1 pt-0 flex flex-col items-center">
          <Select
            options={[0, 1, 2, 3, 4].map((num) => ({
              value: num,
              label: num,
            }))}
            value={quantity}
            onChange={(e)=>{updateQuantity(e.target.value)}}
          />
          <button className='mt-2 text-gray-500' onClick={()=>{updateQuantity(0)}}>remove</button>
      </div>
    </div>
  )
}

/**
 *

 */

export default CartItem
