import type { AppProps } from 'next/app'
import Head from 'next/head'
import { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import 'src/styles/fonts.css'
import { GlobalStyles } from 'src/styles/global-styles'
import 'src/styles/globals.css'
import 'src/styles/reset.css'
import { ROOT_URL } from 'src/utils/env'

const MyApp: VFC<AppProps> = ({ Component, pageProps, router: { asPath } }) => {
  const pageUrl = `${ROOT_URL}${asPath}`
  return (
    <>
      <RecoilRoot>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta property="og:url" content={pageUrl} />
          <link rel="canonical" href={pageUrl} />
          {asPath.startsWith('app') && <meta name="robots" content="noindex" />}
        </Head>
        <GlobalStyles />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  )
}

export default MyApp
