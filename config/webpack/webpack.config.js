const path = require('path')
const webpack = require('webpack')
const { themeSlug, srcPath } = require('../../config')

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(`${srcPath}/catalog/view/theme/theme_slug/javascript/index.js`),
    product: path.resolve(`${srcPath}/catalog/view/theme/theme_slug/javascript/product.js`),
  },
  output: {
    filename: '[name].js'
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
      THEME_SLUG: JSON.stringify(themeSlug),
    })
  ]
}
