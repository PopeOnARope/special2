import dynamic from 'next/dynamic'
import { Builder } from '@builder.io/react'

const LazyText = dynamic(async () => {
  return (await import(`blocks/Carousel/BasicVideoSlide`)).default
})

Builder.registerComponent(LazyText, {
  name: 'BasicVideoSlide',
  inputs: [
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
      name: 'buttonUrl',
      type: 'string',
      defaultValue: '#',
    },
    {
      name: 'image',
      type: 'file',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
    },

    {
      name: 'video',
      type: 'file',
      allowedFileTypes: ['mp4', 'mov'],
    },
    {
      name: 'image',
      type: 'file',
      allowedFileTypes: ['jpg', 'jpeg', 'png'],
    },
  ],
})
