const { src, dest } = require('gulp')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const atImport = require('postcss-import')

const { browserSync } = require('./helpers/browser-sync')
const { srcPath, destPath, themeSlug } = require('./paths')

const entryPath = `${srcPath}/catalog/view/theme/${themeSlug}/stylesheet/main.css`

const buildStream = () => {
  return src(entryPath, { base: srcPath })
    .pipe(sourcemaps.init())
    .pipe(postcss([atImport()]))
    .pipe(sourcemaps.write('.'))
    .pipe(rename(function(path) {
      path.basename = 'stylesheet'
    }))
    .pipe(dest(destPath))
}

function styles(cb) {
  buildStream()
  cb()
}

function stylesWithBrowserSync(cb) {
  buildStream()
    .pipe(browserSync.reload({ stream: true }))
  cb()
}

module.exports = {
  styles,
  stylesWithBrowserSync,
}
