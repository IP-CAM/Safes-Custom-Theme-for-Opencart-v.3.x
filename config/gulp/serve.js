const { watch } = require('gulp')

const { copy, copyGlobs } = require('./copy')
const remove = require('./remove').default
const styles = require('./styles').default
const scripts = require('./scripts').default
const { srcPath, themeSlug} = require('./paths')

function serve() {
  const watcher = watch(copyGlobs, copy)
  watcher.on('unlink', remove)

  const stylesGlob = `${srcPath}/catalog/view/theme/${themeSlug}/stylesheet/**/*.css`
  watch(stylesGlob, styles)

  const scriptsGlob = `${srcPath}/catalog/view/theme/${themeSlug}/javascript/**/*.js`
  watch(scriptsGlob, scripts)
}

exports.default = serve
