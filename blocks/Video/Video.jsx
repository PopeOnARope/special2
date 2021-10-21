import React from 'react'
import { isMobile } from '../../lib/isMobile'

const Video = ({ video, autoPlay }) => {

const [_isMobile, setIsmobile] = React.useState(false)

  React.useEffect(()=>{
    setIsmobile(isMobile())
  })
  if (_isMobile) {
    return (
      <img
        src={video}

        autoPlay={autoPlay}
        muted
        playsInline
        loop
      ></img>
    )
  }
  return (
    <video
      src={video}
      className="w-full"
      autoPlay={autoPlay}
      muted
      playsInline
      loop
      style={{maxWidth: '768px'}}
    ></video>
  )
}

export default Video
