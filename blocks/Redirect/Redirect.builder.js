import dynamic from 'next/dynamic'
import { Builder } from '@builder.io/react'

const Redirect = dynamic(async () => {
  return (await import(`blocks/Redirect/Redirect`)).default
})

Builder.registerComponent(Redirect, {
  name: 'Redirect',
  inputs: [

  ],
})
