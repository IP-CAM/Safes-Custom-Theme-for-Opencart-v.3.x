const { src, dest } = require('gulp')
var compiler = require('webpack')
const webpack = require('webpack-stream')

const { srcPath, destPath, themeSlug } = require('../../../config')

const entryPath = `${srcPath}/catalog/view/theme/theme_slug/javascript/index.js`
const outputPath = `${destPath}/catalog/view/theme/${themeSlug}/javascript/`

function scripts() {
  return src(entryPath)
    .pipe(webpack(require('../../webpack/webpack.config'), compiler))
    .pipe(dest(outputPath))
}

module.exports = {
  scripts,
}
