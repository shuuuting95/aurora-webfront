const withMDX = require('@next/mdx')()

module.exports = withMDX({
  reactStrictMode: true,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: {
                // see: https://github.com/svg/svgo#what-it-can-do
                removeViewBox: false, // to enable overwriteing width/height by CSS
                moveElemsAttrsToGroup: false, // to prevent attribute destruction for overwriting color}
              },
            },
          },
        },
      ],
    })
    config.module.rules.push({
      test: /\.mdx?$/,
      use: ['babel-loader', '@mdx-js/loader'],
    })
    return config
  },
})
