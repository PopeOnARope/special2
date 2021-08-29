import dynamic from 'next/dynamic'
import { Builder } from '@builder.io/react'

const LazyText = dynamic(async () => {
  return (await import(`blocks/About/About`)).default
})

Builder.registerComponent(LazyText, {
  name: 'About',
  inputs: [
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
          type: 'longText'
        }
      ]
    },

  ],
})
