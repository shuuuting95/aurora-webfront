import Head from 'next/head'
import { VFC } from 'react'

export const Favicons: VFC = () => (
  <Head>
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/favicons/apple-touch-icon.png"
    />
    <link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicons/favicon-16x16.png"
    />
    <link rel="manifest" href="/favicons/site.webmanifest" />
    <link
      rel="mask-icon"
      href="/favicons/safari-pinned-tab.svg"
      color="#1b1641"
    />
    <meta name="msapplication-TileColor" content="#1b1641" />
    <meta name="theme-color" content="#ffffff" />
  </Head>
)
