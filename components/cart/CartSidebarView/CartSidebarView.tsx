/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { Themed, jsx, Text, Card, Grid, Divider, NavLink } from 'theme-ui'
import { FC, useEffect, useState } from 'react'
import { ArrowLeft, Bag } from '@components/icons'
import { useCart, useCheckoutUrl } from '@lib/shopify/storefront-data-hooks'
import CartItem from '../CartItem'
import { BuilderComponent, builder } from '@builder.io/react'
import env from '@config/env'
import { getProduct } from '@lib/shopify/storefront-data-hooks/src/api/operations-builder'
import builderConfig from '@config/builder'
import Button from '../../../blocks/Button/Button'
import { getPrice } from '@lib/shopify/storefront-data-hooks/src/utils/product'
import { useUI } from '@components/ui/context'

const Totals = ({ total, subTotal, tax }) => (
  <div className="p-4">
    <table className="w-64 float-right">
      <tbody>
        <tr>
          <td className="w-80">Subtotal:</td>
          <td className="text-right md:text-left">
            {getPrice(subTotal, 'USD')}
          </td>
        </tr>
        <tr>
          <td>Taxes:</td>
          <td className="text-right md:text-left">Calculated at checkout</td>
        </tr>

        <tr>
          <td>
            <strong className="text-right">Total:</strong>
          </td>
          <td>
            <strong className="text-right md:text-left" style={{width: '75rem'}}>{getPrice(subTotal, 'USD')}</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
)

const CartSidebarView: FC = () => {
  const checkoutUrl = useCheckoutUrl()
  const {toggleCart} = useUI()
  const cart = useCart()
  const subTotal = cart?.subtotalPrice
  const tax = cart?.totalTax
  const total = cart?.totalPrice

  const items = cart?.lineItems ?? []
  const isEmpty = items.length === 0
  const [cartUpsell, setCartUpsell] = useState()

  useEffect(() => {
    async function fetchContent() {
      const items = cart?.lineItems || []
      const cartUpsellContent = await builder
        .get('cart-upsell-sidebar', {
          cachebust: env.isDev,
          userAttributes: {
            itemInCart: items.map((item: any) => item.variant.product.handle),
          } as any,
        })
        .toPromise()
      setCartUpsell(cartUpsellContent)
    }
    fetchContent()
  }, [cart?.lineItems])

  return (
    <div className="mt-32 flex flex-col w-full p-4">
      {isEmpty ? (
        <>
          Your cart is empty
        </>
      ) : (
        <div className='type-wrapper'>
          <div className="w-full"><button onClick={toggleCart} className='flex flex-row items-center'><ArrowLeft orientation='left'/> Keep Shopping</button></div>
          <div className="flex flex-col justify-center lg:flex-row lg:justify-end w-full">
            <div className='flex-grow max-w-4xl'>
              {items.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  // todo update types
                  currencyCode={item.variant?.priceV2?.currencyCode || 'USD'}
                />
              ))}
              <Totals tax={tax} total={total} subTotal={subTotal} />
            </div>

            <div className="mt-6">
              {' '}
              {checkoutUrl && (
                <Button
                  displayAs="link"
                  href={checkoutUrl!}
                  styles={{ width: 'inherit' }}
                >
                  Checkout
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartSidebarView
