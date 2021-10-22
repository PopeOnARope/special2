import dynamic from 'next/dynamic'
import { Builder } from '@builder.io/react'

const LazyText = dynamic(async () => {
  return (await import(`blocks/AccountCreate/AccountCreate`)).default
})

Builder.registerComponent(LazyText, {
  name: 'AccountCreate',
  inputs: [
    { name: 'title', type: 'string' },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'finePrint',
      type: 'richText',
    },
    {
      name: 'declineButtonLabel',
      type: 'string',
    },
    {
      name: 'submitButtonLabel',
      type: 'string',
      defaultValue: 'No thanks I am not interested in sweet deals >'
    },
  ],
})
