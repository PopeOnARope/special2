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
      name: 'titleFont',
      type: 'string',
      enum: ['Value Sans Pro', 'InputMono', 'RayJohnson', 'Nova Stamp Bold'],
    },
    {
      name: 'content',
      type: 'string',
    },
    {
      name: 'contentFont',
      type: 'string',
      enum: ['Value Sans Pro', 'InputMono', 'RayJohnson', 'Nova Stamp Bold'],
    },
    {
      name: 'secondaryContent',
      type: 'string',
      defaultValue: 'Spec_ial is special etc...',
    },
    {
      name: 'secondaryContentFont',
      type: 'string',
      enum: ['Value Sans Pro', 'InputMono', 'RayJohnson', 'Nova Stamp Bold'],
    },
    {
      name: 'finePrint',
      type: 'string',
    },
    {
      name: 'finePrintFont',
      type: 'string',
      enum: ['Value Sans Pro', 'InputMono', 'RayJohnson', 'Nova Stamp Bold'],
    },
    {
      name: 'declineButtonLabel',
      type: 'string',
    },
    {
      name: 'submitButtonLabel',
      type: 'string',
      defaultValue: 'No thanks I am not interested in sweet deals >',
    },
    {
      name: 'sound',
      type: 'file',
      allowedFileTypes: ['wav', 'mp3'],
    },
  ],
})
