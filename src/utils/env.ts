import { SITE_SEO_DATA } from 'src/constants/seo'

export const isProd = Boolean(process.env.NEXT_PUBLIC_IS_PROD)
export const IS_STORYBOOK = Boolean(process.env.STORYBOOK)

export const HOSTNAME = isProd
  ? SITE_SEO_DATA.siteDomain
  : process.env.NEXT_PUBLIC_VERCEL_URL || 'dev.auroradao.org'

export const ROOT_URL = `https://${HOSTNAME}`

export const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
  'https://api.studio.thegraph.com/query/8417/auroradao-rinkeby/v1.0.1'

export const POST_API_ENDPOINT =
  process.env.NEXT_PUBLIC_POST_API_ENDPOINT || 'https://api.auroradao-dev.tk'

export const PREVIEW_CARD_ASSETS_ENDPOINT =
  process.env.NEXT_PUBLIC_PREVIEW_CARD_ASSETS_ENDPOINT ||
  'https://perm.auroradao-dev.tk'

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || ''
