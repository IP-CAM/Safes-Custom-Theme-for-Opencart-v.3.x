const { src, dest } = require('gulp')
const concat = require('gulp-concat')
const wrap = require('gulp-wrap')
const prettyData = require('gulp-pretty-data')
const replace = require('gulp-replace')
const { srcPath, destPath, themeSlug, themeName } = require('../../../config')

const modificationsGlob = `${srcPath}/system/modifications/**/*.xml`
const outputPath = `${destPath}/system`

const template = `
  <?xml version="1.0" encoding="utf-8"?>
  <modification>
    <name>${themeName}</name>
    <version>0.0.0</version>
    <code>${themeSlug}</code>
    <%= contents %>
  </modification>
`

function modifications(cb) {
  src(modificationsGlob, { base: srcPath })
    .pipe(replace(/THEME_SLUG/g, themeSlug))
    .pipe(concat(`${themeSlug}.ocmod.xml`))
    .pipe(wrap(template.trim()))
    .pipe(prettyData({
      type: 'prettify',
      preserveComments: false,
    }))
    .pipe(dest(outputPath))
  cb()
}

module.exports = {
  modifications,
  modificationsGlob,
}
