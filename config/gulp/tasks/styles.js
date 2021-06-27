const { src, dest } = require('gulp')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')

const { browserSync } = require('../helpers/browser-sync')
const { srcPath, destPath, themeSlug } = require('../../../config')

const entryPath = `${srcPath}/catalog/view/theme/${themeSlug}/stylesheet/main.css`

function buildStream() {
  return src(entryPath, { base: srcPath })
    .pipe(sourcemaps.init())
    .pipe(postcss([
      require('postcss-nested'),
      require('postcss-easy-import')({
        path: [
          `${srcPath}/catalog/view/theme/${themeSlug}/blocks`
        ]
      }),
    ]))
    .on('error', function(err) {
      console.log(err.toString())
      this.emit('end')
    })
    .pipe(sourcemaps.write('.'))
    .pipe(rename(function(path) {
      path.basename = 'stylesheet'
    }))
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
