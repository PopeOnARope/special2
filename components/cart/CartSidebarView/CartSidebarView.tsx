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
import Button from '../../../blocks/Button/Button'

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
    <div className="mt-32 flex flex-col w-full">
      {isEmpty ? (
        <>
          <Bag />
          Your cart is empty
        </>
      ) : (
        <div className="flex md:flex-row flex-col justify-center ">
          <div className="flex flex-col justify-center w-full md:w-3/4 lg:w-2/3  max-w-2xl">
            {items.map((item: any) => (
              <CartItem
                key={item.id}
                item={item}
                // todo update types
                currencyCode={item.variant?.priceV2?.currencyCode || 'USD'}
              />
            ))}

            <div className="p-4 md:p-0 ml-0 md:ml-72 md:float-none type-wrapper">
              <table className="w-64 float-right md:float-left">
                <tbody>
                  <tr>
                    <td>Subtotal:</td>
                    <td className="text-right md:text-left">{subTotal}</td>
                  </tr>
                  <tr>
                    <td>Taxes:</td>
                    <td className="text-right md:text-left">{tax}</td>
                  </tr>
                  <tr>
                    <td>Shipping</td>
                    <td className="text-right md:text-left">Free</td>
                  </tr>
                  <tr>
                    <td><strong className="text-right">Total:</strong></td>
                    <td><strong className="text-right md:text-left">{total}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 md:p-0 w-full md:w-1/4 lg:w-1/3 pr-6 mt-10 md:mt-0">
            {' '}
            {checkoutUrl && (
              <Button displayAs="link" href={checkoutUrl!}>
                Checkout
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )

  // return (
  //   <Themed.div
  //     sx={{
  //       height: '100%',
  //       overflow: 'auto',
  //       paddingBottom: 5,
  //       bg: 'text',
  //       display: 'flex',
  //       flexDirection: 'column',
  //       alignItems: 'center',
  //       px: 2,
  //       color: 'black',
  //       background: '#e5e5e5',
  //       ...(isEmpty && { justifyContent: 'center' }),
  //     }}
  //   >
  //     {isEmpty ? (
  //       <>
  //         <Bag />
  //         Your cart is empty
  //       </>
  //     ) : (
  //       <>
  //         {items.map((item: any) => (
  //           <CartItem
  //             key={item.id}
  //             item={item}
  //             // todo update types
  //             currencyCode={item.variant?.priceV2?.currencyCode || 'USD'}
  //           />
  //         ))}
  //         <Card sx={{ marginLeft: 'auto', minWidth: '10rem', paddingLeft: 5 }}>
  //           <Grid gap={1} columns={2} sx={{ my: 3 }}>
  //             <Text>Subtotal:</Text>
  //             <Text sx={{ marginLeft: 'auto' }}>{subTotal}</Text>
  //             <Text>Shipping:</Text>
  //             <Text sx={{ marginLeft: 'auto' }}> - </Text>
  //             <Text>Tax: </Text>
  //             <Text sx={{ marginLeft: 'auto' }}> - </Text>
  //           </Grid>
  //
  //           <Grid gap={1} columns={2}>
  //             <Text variant="bold">Estimated Total:</Text>
  //             <Text variant="bold" sx={{ marginLeft: 'auto' }}>
  //               {total}
  //             </Text>
  //           </Grid>
  //         </Card>
  //         <BuilderComponent content={cartUpsell} model="cart-upsell-sidebar" />
  //         {checkoutUrl && (
  //           <NavLink
  //             variant="nav"
  //             sx={{ width: '100%', m: 2, p: 12, textAlign: 'center' }}
  //             href={checkoutUrl!}
  //           >
  //             Proceed to Checkout
  //           </NavLink>
  //         )}
  //       </>
  //     )}
  //   </Themed.div>
  // )
}

export default CartSidebarView
