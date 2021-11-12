import dynamic from 'next/dynamic'
import { Builder } from '@builder.io/react'

const LazyText = dynamic(async () => {
  return (await import(`blocks/Signup/Signup`)).default
})

Builder.registerComponent(LazyText, {
  name: 'Signup',
  inputs: [
    {
      name: 'content',
      type: 'richText'
    }
  ],
})
