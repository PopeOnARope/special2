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
    console.log({ r })
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
    console.log({quantity})
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
    <div className="flex flex-row p-2 w-full">
      <div className="w-2/5">
        <Image
          height={123}
          width={286}
          unoptimized
          alt={item.variant.image.altText}
          src={item.variant.image.src}
        />
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
          <li>Shipped in Recycled Packaging</li>
          <li>Free Shipping in 2 - 4 Business Days</li>
        </Themed.ul>
      </div>
      <div className='font-bold'>
        {getPrice(
          item.variant.priceV2.amount,
          item.variant.priceV2.currencyCode || 'USD'
        )}
      </div>
      <div className="p-1 m-1 pt-0">
        <label>
          <Select
            options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => ({
              value: num,
              label: num,
            }))}
            value={quantity}
            onChange={(e)=>{updateQuantity(e.target.value)}}
          />
        </label>
      </div>
    </div>
  )

  return (
    <div >
      <div
        sx={{
          padding: 1,
          border: '1px solid gray',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          height={130}
          width={130}
          unoptimized
          alt={item.variant.image.altText}
          src={item.variant.image.src}
        />
      </div>
      <div>
        <Themed.div
          as={Link}
          href={`/product/${item.variant.product.handle}/`}
          sx={{ fontSize: 3, m: 0, fontWeight: 700 }}
        >
          <>
            {item.title}
            <Text
              sx={{
                fontSize: 4,
                fontWeight: 700,
                display: 'block',
                marginLeft: 'auto',
              }}
            >
              {getPrice(
                item.variant.priceV2.amount,
                item.variant.priceV2.currencyCode || 'USD'
              )}
            </Text>
          </>
        </Themed.div>
        <Themed.ul sx={{ mt: 2, mb: 0, padding: 0, listStyle: 'none' }}>
          <li>
            <div sx={{ display: 'flex', justifyItems: 'center' }}>
              <IconButton onClick={() => increaseQuantity(-1)}>
                <Minus width={18} height={18} />
              </IconButton>

              <label>
                <Input
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                  }}
                  type="number"
                  max={99}
                  min={0}
                  value={quantity}
                  onChange={handleQuantity}
                  onBlur={handleBlur}
                />
              </label>
              <IconButton onClick={() => increaseQuantity(1)}>
                <Plus width={18} height={18} />
              </IconButton>
            </div>
          </li>
          {item.variant.selectedOptions.map((option: any) => (
            <li key={option.value}>
              {option.name}:{option.value}
            </li>
          ))}
        </Themed.ul>
      </div>
    </div>
  )
}

/**
 *

 */

export default CartItem
