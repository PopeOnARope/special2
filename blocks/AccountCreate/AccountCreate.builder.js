import dynamic from 'next/dynamic'
import { Builder } from '@builder.io/react'

const LazyText = dynamic(async () => {
  return (await import(`blocks/AccountCreate/AccountCreate`)).default
})

Builder.registerComponent(LazyText, {
  name: 'AccountCreate',
  inputs: [
    { name: 'title', type: 'richText' },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'secondaryContent',
      type: 'richText',
      defaultValue: 'Spec_ial is special etc...'

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
    {
      name: 'sound',
      type: 'file',
      allowedFileTypes: ['wav', 'mp3']
    }
  ],
})
