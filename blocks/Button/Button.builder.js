import dynamic from 'next/dynamic'
import { Builder } from '@builder.io/react'

const LazyText = dynamic(async () => {return (await import(`blocks/Button/Button`)).default})


Builder.registerComponent(LazyText, {
  name: 'Button Element',
  inputs: [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Carousel Label'
    },
    {
      name: 'icon',
      type: 'string',
    },
    {
      name: 'background',
      type: 'color',
      defaultValue: 'black'
    },
    {
      name: 'text color',
      type: 'color',
      defaultValue: 'white'
    }
  ]
})
