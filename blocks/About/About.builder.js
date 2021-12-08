import dynamic from 'next/dynamic'
import { Builder } from '@builder.io/react'

const LazyText = dynamic(async () => {
  return (await import(`blocks/About/About`)).default
})

Builder.registerComponent(LazyText, {
  name: 'About',
  inputs: [
    {
      name: 'toggleFont',
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
      name: 'sections',
      type: 'list',
      subFields: [
        {
          name: 'title',
          type: 'text'
        },
        {
          name: 'content',
          type: 'richText'
        }
      ]
    },

  ],
})
