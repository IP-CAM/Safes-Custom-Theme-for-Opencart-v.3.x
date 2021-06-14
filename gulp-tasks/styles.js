const { src, dest } = require('gulp')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')

function styles(cb) {
  src('upload/catalog/view/theme/safes/stylesheet/main.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([]))
    .pipe(sourcemaps.write('.'))
    .pipe(rename(function(path) {
      path.basename = 'stylesheet'
    }))
    .pipe(dest('upload/catalog/view/theme/safes/stylesheet'))
  cb()
}

exports.default = styles
