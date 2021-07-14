/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { Themed, jsx, Text, Card, Grid, Divider, NavLink } from 'theme-ui'
import { FC, useEffect, useState } from 'react'
import { Bag } from '@components/icons'
import { useCart, useCheckoutUrl } from '@lib/shopify/storefront-data-hooks'
import CartItem from '../CartItem'
import { BuilderComponent, builder } from '@builder.io/react'
import env from '@config/env'
import { getProduct } from '@lib/shopify/storefront-data-hooks/src/api/operations-builder'
import builderConfig from '@config/builder'

const CartSidebarView: FC = () => {
  const checkoutUrl = useCheckoutUrl()
  const cart = useCart()
  const subTotal = cart?.subtotalPrice
  const tax = cart?.totalTax
  const total = cart?.totalPrice
  console.log({ cart })

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
    <Themed.div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '127px',
        alignItems: 'center',
        alignContent: 'center',
        height: '100%',
        fontFamily: 'Value Sans Pro',
      }}
    >
      {isEmpty ? (
        <>
          <Bag />
          Your cart is empty
        </>
      ) : (
        <div className="border-black border-1">
          <div >
            {items.map((item: any) => (
              <CartItem
                key={item.id}
                item={item}
                // todo update types
                currencyCode={item.variant?.priceV2?.currencyCode || 'USD'}
              />
            ))}
          </div>
          <div>
            <Card
              sx={{ marginLeft: '14rem', minWidth: '10rem', paddingLeft: 5 }}
            >
              <Grid gap={1} columns={2} sx={{ my: 3, width: '26rem' }}>
                <Text>Subtotal:</Text>
                <Text >{subTotal}</Text>
                <Text>Taxes: </Text>
                <Text > {tax} </Text>
                <Text>Shipping:</Text>
                <Text > Free </Text>
              </Grid>

              <Grid gap={1} columns={2} sx={{width: '26rem'}}>
                <Text sx={{ fontWeight: 'bold' }}>Total:</Text>
                <Text
                  variant="bold"
                  sx={{  fontWeight: 'bold' }}
                >
                  {total}
                </Text>
              </Grid>
            </Card>
          <div>
            hey
          </div>
          </div>
        </div>
      )}
    </Themed.div>
  )

  return (
    <Themed.div
      sx={{
        height: '100%',
        overflow: 'auto',
        paddingBottom: 5,
        bg: 'text',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 2,
        color: 'black',
        background: '#e5e5e5',
        ...(isEmpty && { justifyContent: 'center' }),
      }}
    >
      {isEmpty ? (
        <>
          <Bag />
          Your cart is empty
        </>
      ) : (
        <>
          {items.map((item: any) => (
            <CartItem
              key={item.id}
              item={item}
              // todo update types
              currencyCode={item.variant?.priceV2?.currencyCode || 'USD'}
            />
          ))}
          <Card sx={{ marginLeft: 'auto', minWidth: '10rem', paddingLeft: 5 }}>
            <Grid gap={1} columns={2} sx={{ my: 3 }}>
              <Text>Subtotal:</Text>
              <Text sx={{ marginLeft: 'auto' }}>{subTotal}</Text>
              <Text>Shipping:</Text>
              <Text sx={{ marginLeft: 'auto' }}> - </Text>
              <Text>Tax: </Text>
              <Text sx={{ marginLeft: 'auto' }}> - </Text>
            </Grid>

            <Grid gap={1} columns={2}>
              <Text variant="bold">Estimated Total:</Text>
              <Text variant="bold" sx={{ marginLeft: 'auto' }}>
                {total}
              </Text>
            </Grid>
          </Card>
          <BuilderComponent content={cartUpsell} model="cart-upsell-sidebar" />
          {checkoutUrl && (
            <NavLink
              variant="nav"
              sx={{ width: '100%', m: 2, p: 12, textAlign: 'center' }}
              href={checkoutUrl!}
            >
              Proceed to Checkout
            </NavLink>
          )}
        </>
      )}
    </Themed.div>
  )
}

export default CartSidebarView
