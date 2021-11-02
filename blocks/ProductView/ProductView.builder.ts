import { Builder, builder } from '@builder.io/react'
import { restrictedRegister } from 'blocks/utils'
import dynamic from 'next/dynamic'
const isDemo = Boolean(process.env.IS_DEMO)
const LazyProductView = dynamic(
  () =>
    isDemo
      ? import(`blocks/ProductView/ProductViewDemo`)
      : import(`blocks/ProductView/ProductView`),
  { ssr: true }
)

restrictedRegister(
  LazyProductView,
  {
    name: 'ProductView',
    inputs: [
      {
        name: 'nameFont',
        type: 'string',
        defaultValue: 'Value Sans Pro',
        enum: ['Value Sans Pro', 'InputMono', 'RayJohnson', 'Nova Stamp Bold'],
      },
      {
        name: 'editionFont',
        type: 'string',
        defaultValue: 'Value Sans Pro',
        enum: ['Value Sans Pro', 'InputMono', 'RayJohnson', 'Nova Stamp Bold'],
      },
      {
        name: 'productDescriptionFont',
        type: 'string',
        defaultValue: 'Value Sans Pro',
        enum: ['Value Sans Pro', 'InputMono', 'RayJohnson', 'Nova Stamp Bold'],
      },
      {
        name: 'productDescriptionFont',
        type: 'string',
        defaultValue: 'Value Sans Pro',
        enum: ['Value Sans Pro', 'InputMono', 'RayJohnson', 'Nova Stamp Bold'],
      },
      {
        name: 'description',
        type: 'richText',
        defaultValue: 'enter a long description of this item here!',
      },
      {
        name: 'detailToggleFont',
        type: 'string',
        defaultValue: 'Value Sans Pro',
        enum: ['Value Sans Pro', 'InputMono', 'RayJohnson', 'Nova Stamp Bold'],
      },
      {
        name: 'detailFont',
        type: 'string',
        defaultValue: 'Value Sans Pro',
        enum: ['Value Sans Pro', 'InputMono', 'RayJohnson', 'Nova Stamp Bold'],
      },
      {
        name: 'details',
        type: 'list',
        defaultValue: [{ title: 'Title' }],
        subFields: [
          {
            name: 'title',
            type: 'string',
          },
          {
            name: 'value',
            type: 'richText',
          },
        ],
      },
      {
        name: 'images',
        type: 'list',
        defaultValue:[{image: '', overlayColor: 'rgba(255,255,255,1)'}],
        subFields: [
          {
            name: 'image',
            type: 'file',
          },
          {
            name: 'altText',
            type: 'text',
          },
          {
            name: 'overlayColor',
            type: 'color',
            defaultValue: 'rgba(255,255,255,1)'
          },
          {
            name: 'backgroundColor',
            type: 'color',
            defaultValue: 'rgba(255,255,255,1)'
          },
          {
            name: 'display',
            type: 'string',
            enum: ['cover', 'contain'],
            defaultValue: 'cover'
          },
        ],
      },
      {
        name: 'mobileImages',
        type: 'list',
        defaultValue:[{image: '', overlayColor: 'rgba(255,255,255,1)'}],
        subFields: [
          {
            name: 'image',
            type: 'file',
          },
          {
            name: 'altText',
            type: 'text',
          },
          {
            name: 'overlayColor',
            type: 'color',
            defaultValue: 'rgba(255,255,255,1)'
          },
          {
            name: 'backgroundColor',
            type: 'color',
            defaultValue: 'rgba(255,255,255,1)'
          },
          {
            name: 'display',
            type: 'string',
            enum: ['cover', 'contain'],
            defaultValue: 'cover'
          },
        ],
      },
      {
        name: 'collection',
        type: 'text',
        defaultValue: 'Collection'
      },
      {
        name: 'title',
        type: 'text',
        defaultValue: 'Title'
      },
      { name: 'edition', type: 'text',
      defaultValue: 'Edition'},
    ],
    image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/inpicture.svg',
    description:
      'Product details, should only be used in product page template, dynamically bind to product in context.',
    defaults: {
      bindings: {
        'component.options.product': 'state.product',
        'component.options.title': 'state.product.title',
        'component.options.description': 'state.product.descriptionHtml',
      },
    },
  },

  ['product-page', 'theme', 'shopify-product']
)

restrictedRegister(
  LazyProductView,
  {
    name: 'ProductBox',
    inputs: [
      {
        name: 'product',
        type: `${isDemo ? 'ShopifyStore' : 'Shopify'}ProductHandle`,
      },
      {
        name: 'description',
        richText: true,
        type: 'html',
        helperText: 'Override product description from shopify',
      },
      {
        name: 'title',
        type: 'text',
        helperText: 'Override product title from shopify',
      },
    ],
    image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/ereader.svg',
    description: 'Choose a product to show its details on page',
  },
  ['page', 'collection-page', 'theme']
)
