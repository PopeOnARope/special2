import dynamic from 'next/dynamic'
import { Builder } from '@builder.io/react'

const LazyText = dynamic(async () => {
  return (await import(`blocks/Footer/Footer`)).default
})

Builder.registerComponent(LazyText, {
  name: 'Footer',
  inputs: [
    {
      name: 'darkMode',
      type: 'boolean'
    },
    {
      name: 'sections',
      type: 'list',
      defaultValue: [{ title: 'Title' }],
      subFields: [
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'links',
          type: 'list',
          defaultValue: [{ title: 'Title', url: '#' }],
          subFields: [
            {
              name: 'title',
              type: 'string',
              defaultValue: 'Title',
            },
            {
              name: 'url',
              type: 'string',
              defaultValue: '#',
            },
          ],
        },
      ],
    },
    {
      name: 'bottomLinks',
      type: 'list',
      defaultValue: [{ title: 'Title', url: '#' }],
      subFields: [
        {
          name: 'title',
          type: 'string',
          defaultValue: 'Title',
        },
        {
          name: 'url',
          type: 'string',
          defaultValue: '#',
        },
      ],
    },
  ],
})
