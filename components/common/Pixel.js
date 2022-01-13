import React from 'react'
import env from '@config/env'
import facebook from '@config/facebook'

const Pixel = () =>(
    <React.Fragment>

      <script
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', ${facebook.facebookPixelId});`,
        }}
      />
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=${facebook.facebookPixelId}&ev=PageView&noscript=1" />`,
        }}
      />
    </React.Fragment>
  )

export default Pixel
