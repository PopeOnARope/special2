import dynamic from 'next/dynamic'
import { Builder } from '@builder.io/react'

const LazyText = dynamic(async () => {
  return (await import(`blocks/Marquee/Marquee`)).default
})

Builder.registerComponent(LazyText, {
  name: 'Marquee',
  inputs: [
    {
      name: 'speed',
      type: 'number',
      defaultValue: 20
    },
    {
      name: 'links',
      type: 'list',
      defaultValue: [{ title: 'Title', url: '/' }],
      subFields: [
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'url',
          type: 'string',
        },
      ],
    },
  ],
})
