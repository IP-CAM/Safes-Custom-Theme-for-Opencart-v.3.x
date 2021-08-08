const { src, dest } = require('gulp')
const svgstore = require('gulp-svgstore')
const rename = require('gulp-rename')
const { srcPath, destPath, themeSlug } = require('../../../config')

const svgSpritesGlob = `${srcPath}/catalog/view/theme/theme_slug/image/svg-sprites/**/*.svg`
const outputPath = `${destPath}/catalog/view/theme/${themeSlug}/image`

function svgSprites(cb) {
  src(svgSpritesGlob)
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(dest(outputPath))
  cb()
}

module.exports = {
  svgSpritesGlob,
  svgSprites,
}
