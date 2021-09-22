import dynamic from 'next/dynamic'
import { Builder } from '@builder.io/react'

const LazyText = dynamic(async () => {return (await import(`./Text`)).default})


Builder.registerComponent(LazyText, {
  name: 'Text Element',
  inputs: [
    {
      name: 'content',
      type: 'richText',
      defaultValue: 'Edit your text here...'
    },

  ]
})
