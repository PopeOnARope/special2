import React from 'react'
import Marquee from 'react-fast-marquee'

const MarqueeComponent = ({ links, speed, background, color }) => (
  <Marquee
    speed={speed || 40}
    style={{ background: background || '#FFC391', marginTop: '0px' }}
    gradient={false}
  >
    {links.map((link) => (
      <a
        style={{
          color: color || 'white',
          padding: '0.5rem',
          fontFamily: 'Value Sans Pro',
          fontSize: '18px',
          fontWeight: '700',
        }}
        href={link.url}
      >
        {link.image ? <img src={link.image} style={{height:'3rem'}} /> : link.title}
      </a>
    ))}
  </Marquee>
)

export default MarqueeComponent
