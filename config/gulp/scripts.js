const { src, dest } = require('gulp')
const webpack = require('webpack-stream');

const { srcPath, destPath, themeSlug } = require('./paths')

const entryPath = `${srcPath}/catalog/view/theme/${themeSlug}/javascript/main.js`
const outputPath = `${destPath}/catalog/view/theme/${themeSlug}/javascript/`

function scripts(cb) {
  src(entryPath)
    .pipe(webpack(require('../webpack/webpack.config')))
    .pipe(dest(outputPath))
  cb()
}

exports.default = scripts
