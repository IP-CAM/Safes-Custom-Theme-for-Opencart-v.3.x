const { src, dest } = require('gulp')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const path = require('path')

const { browserSync } = require('../helpers/browser-sync')
const { srcPath, destPath, themeSlug } = require('../../../config')
const breakpoints = require(path.resolve(`./${srcPath}/catalog/view/theme/theme_slug/stylesheet/breakpoints`))

const entryPath = `${srcPath}/catalog/view/theme/theme_slug/stylesheet/main.css`

function buildStream() {
  return src(entryPath, { base: srcPath })
    .pipe(sourcemaps.init())
    .pipe(postcss([
      require('postcss-nested'),
      require('postcss-easy-import')({
        path: [
          `${srcPath}/catalog/view/theme/theme_slug/blocks`
        ]
      }),
      require('postcss-simple-vars')({
        variables: breakpoints,
      })
    ]))
    .on('error', function(err) {
      console.log(err.toString())
      this.emit('end')
    })
    .pipe(sourcemaps.write('.'))
    .pipe(rename((path) => ({
      dirname: path.dirname.replace('theme_slug', themeSlug),
      basename: path.basename = 'stylesheet',
      extname: path.extname,
    })))
    .pipe(dest(destPath))
}

function styles(cb) {
  buildStream(cb)
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
