const webpack = require('webpack')
const { themeSlug } = require('../../config')

module.exports = {
  output: {
    filename: 'bundle.js'
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.DefinePlugin({
      THEME_SLUG: themeSlug,
    })
  ]
}
