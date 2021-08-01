import React from 'react'
import Marquee from 'react-fast-marquee'


const MarqueeComponent = ({ links }) => (
  <Marquee speed={20} style={{background: '#FFC391', marginTop: '0px'}} gradient={false}>
    {links.map((link) => (
      <a style={{color: 'white', padding: '8px', fontFamily: 'Value Sans Pro', fontSize: '18px', fontWeight: '700'}} href={link.url}>{link.title}</a>
    ))}
  </Marquee>
)

export default MarqueeComponent
