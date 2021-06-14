const { src, dest } = require('gulp')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const atImport = require('postcss-import')

const { srcPath, destPath, themeSlug } = require('./paths')

const entryPath = `${srcPath}/catalog/view/theme/${themeSlug}/stylesheet/main.css`

function styles(cb) {
  src(entryPath, { base: srcPath })
    .pipe(sourcemaps.init())
    .pipe(postcss([atImport()]))
    .pipe(sourcemaps.write('.'))
    .pipe(rename(function(path) {
      path.basename = 'stylesheet'
    }))
    .pipe(dest(destPath))
  cb()
}

exports.default = styles
