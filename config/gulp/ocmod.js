const { src, dest } = require('gulp')
const concat = require('gulp-concat')
const wrap = require('gulp-wrap')
const prettyData = require('gulp-pretty-data')
const { srcPath, destPath, themeSlug } = require('./paths')

const ocmodGlob = [
  `${srcPath}/system/ocmod/**/*.xml`,
]

const template = `
  <?xml version="1.0" encoding="utf-8"?>
  <modification>
    <name>${themeSlug}</name>
    <version>1.0.0</version>
    <code>${themeSlug}</code>
    <%= contents %>
  </modification>
`

function ocmod(cb) {
  src(ocmodGlob, { base: srcPath })
    .pipe(concat(`${themeSlug}.ocmod.xml`))
    .pipe(wrap(template.trim()))
    .pipe(prettyData({
      type: 'prettify',
      preserveComments: false,
    }))
    .pipe(dest(`${destPath}/system`))
  cb()
}

module.exports = {
  ocmod,
  ocmodGlob,
}
