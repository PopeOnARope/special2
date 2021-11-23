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
      name: 'consent',
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
      name: 'sound',
      type: 'file',
      allowedFileTypes: ['wav', 'mp3'],
    },
  ],
})
