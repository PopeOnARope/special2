import dynamic from 'next/dynamic'
import { Builder } from '@builder.io/react'

const LazyText = dynamic(async () => {
  return (await import(`blocks/Carousel/Carousel`)).default
})

Builder.registerComponent(LazyText, {
  name: 'Carousel',
  inputs: [
    {
      name: 'slides',
      type: 'list',
      defaultValue: [{ title: 'Collection', buttonLabel: 'View Collection' }],
      subFields: [
        {
          name: 'titleLine1',
          type: 'string',
          defaultValue: 'Collection Name',
        },
        {
          name: 'titleLine2',
          type: 'string',
          defaultValue: 'Collection Name',
        },
        {
          name: 'buttonLabel',
          type: 'string',
          defaultValue: 'View Collection',
        },
        {
          name: 'image',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
        },
        {
          name: 'buttonUrl',
          type: 'string',
          defaultValue: '#',
        },
      ],
    },
  ],
})
