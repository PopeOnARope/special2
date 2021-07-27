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
          name:'useBackgroundVideo',
          type:'boolean',
          defaultValue: true
        },
        {
          name: 'videos',
          type: 'object',
          subFields: [
            { name: 'model1Name', type: 'string', defaultValue: 'model1Name' },
            { name: 'model2Name', type: 'string', defaultValue: 'model2Name' },

            {
              name: 'model1Night',
              type: 'file',
              allowedFileTypes: ['mp4', 'mov'],
            },
            {
              name: 'model1Dusk',
              type: 'file',
              allowedFileTypes: ['mp4', 'mov'],
            },
            {
              name: 'model1Day',
              type: 'file',
              allowedFileTypes: ['mp4', 'mov'],
            },
            {
              name: 'model1Dawn',
              type: 'file',
              allowedFileTypes: ['mp4', 'mov'],
            },
            {
              name: 'model2Night',
              type: 'file',
              allowedFileTypes: ['mp4', 'mov'],
            },
            {
              name: 'model2Dusk',
              type: 'file',
              allowedFileTypes: ['mp4', 'mov'],
            },
            {
              name: 'model2Day',
              type: 'file',
              allowedFileTypes: ['mp4', 'mov'],
            },
            {
              name: 'model2Dawn',
              type: 'file',
              allowedFileTypes: ['mp4', 'mov'],
            },
          ],
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
