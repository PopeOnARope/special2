import { FC } from 'react'
import NextHead from 'next/head'
import { DefaultSeo } from 'next-seo'

const Head: FC<{ seoInfo: any }> = (props) => {
  return (
    <>
      {/*<DefaultSeo {...props.seoInfo} />*/}
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
        <link
          rel="icon"
          type="image/png"
          href="https://cdn.builder.io/api/v1/image/assets%2Fd58e15993bf84115968f2dd035ee71a4%2F14580646b40e449aab23634dda0c7787"
        />
        <meta property="og:title" content="Spec_ial" />
        <meta property="og:description" content="Spec_ial upends traditional eyewear with provocative exploration. Crafted in micro-micro  — with ranging influences from art to astrology – our pieces cross over from accessory into sculpture. Conceptualized between New York, Los Angeles and Edinburgh, Spec_ial’s eyewear ignores boundaries, leaving you ... Spec_ial." />
        <meta property="og:url" content="https://spec-ial.com" />
        {/*<meta property="og:image" content="https://ahrefs.com/blog/wp-content/uploads/2019/12/fb-how-to-become-an-seo-expert.png" />*/}
      </NextHead>
    </>
  )
}

export default Head
