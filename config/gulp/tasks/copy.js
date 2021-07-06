const { src, dest, lastRun, parallel } = require('gulp')
const replace = require('gulp-replace')
const rename = require('gulp-rename')
const debug = require('gulp-debug')

const { toPascalCase } = require('../helpers/to-pascal-case')

const { srcPath, destPath, themeSlug, themeName } = require('../../../config')

const themeControllerGlob = `${srcPath}/admin/controller/extension/theme/theme_slug.php`

function copyThemeController(cb) {
  src(themeControllerGlob, { base: srcPath, since: lastRun(copyThemeController) })
    .pipe(replace(/ThemeTHEME_SLUG/g, `Theme${toPascalCase(themeSlug)}`))
    .pipe(replace(/THEME_SLUG/g, themeSlug))
    .pipe(rename((path) => ({
      dirname: path.dirname.replace(/theme_slug/, themeSlug),
      basename: path.basename.replace(/theme_slug/, themeSlug),
      extname: path.extname,
    })))
    .pipe(dest(destPath))
  cb()
}

const themeLanguageGlob = `${srcPath}/admin/language/**/extension/theme/theme_slug.php`

function copyThemeLanguage(cb) {
  src(themeLanguageGlob, { base: srcPath, since: lastRun(copyThemeLanguage) })
    .pipe(replace(/THEME_NAME/g, themeName))
    .pipe(rename((path) => ({
      dirname: path.dirname.replace(/theme_slug/, themeSlug),
      basename: path.basename.replace(/theme_slug/, themeSlug),
      extname: path.extname,
    })))
    .pipe(dest(destPath))
  cb()
}

const restGlobs = [
  `${srcPath}/**/*`,
  `!${srcPath}/**/{stylesheet,stylesheet/**/*}`,
  `!${srcPath}/**/{javascript,javascript/**/*}`,
  `!${srcPath}/system/{modifications,modifications/**/*}`,
  `!${themeControllerGlob}`,
  `!${themeLanguageGlob}`,
]

function copyRest(cb) {
  src(restGlobs, { base: srcPath, since: lastRun(copyRest)})
    .pipe(replace(/THEME_SLUG/g, themeSlug))
    .pipe(rename((path) => ({
      dirname: path.dirname.replace(/theme_slug/, themeSlug),
      basename: path.basename.replace(/theme_slug/, themeSlug),
      extname: path.extname,
    })))
    .pipe(debug())
    .pipe(dest(destPath))
  cb()
}

const copy = parallel(copyThemeController, copyThemeLanguage, copyRest)

const copyGlobs = restGlobs.filter((path) => path !== `!${themeControllerGlob}` && path !== `!${themeLanguageGlob}`)

module.exports = {
  copy,
  copyGlobs,
}
