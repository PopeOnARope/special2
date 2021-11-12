import dynamic from 'next/dynamic'
import { Builder } from '@builder.io/react'

const LazyVideo = dynamic(async () => {
  return (await import(`blocks/Video/Video`)).default
})

Builder.registerComponent(LazyVideo, {
  name: 'Video',
  inputs: [
    {
      name: 'video',
      type: 'file',
      allowedFileTypes: ['mp4', 'mov']
    },
    {
      name: 'autoPlay',
      type: 'boolean'
    }
  ],
})
