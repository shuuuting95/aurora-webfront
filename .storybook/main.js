const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-viewport'],
  webpackFinal: async (config, { configType }) => {
    config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules']
    return config
  },
}
