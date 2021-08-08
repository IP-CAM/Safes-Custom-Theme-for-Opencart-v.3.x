const { watch, series } = require('gulp')

const { copy, copyGlobs } = require('./copy')
const { stylesWithBrowserSync } = require('./styles')
const { scripts } = require('./scripts')
const { svgSprites, svgSpritesGlob } = require('./svg-sprites')
const { runDockerContainers, stopDockerContainers } = require('./docker')
const { modifications, modificationsGlob } = require('./modifications')
const { refreshModifications } = require('./refresh-modifications')
const { makeOpencartDirectory } = require('./make-opencart-directory')
const build = require('./build')
const { browserSync, reload } = require('../helpers/browser-sync')
const remove = require('../helpers/remove')

const { srcPath, opencartPort } = require('../../../config')

require('../helpers/windows-sigint')

const browserSyncConfig = {
  proxy: `localhost:${opencartPort}`,
}

function serve(cb) {
  process.on('SIGINT', function() {
    cb()
  })

  browserSync.init(browserSyncConfig)

  watch(copyGlobs, copy)
    .on('unlink', series(remove, reload))

  const stylesGlob = `${srcPath}/catalog/view/theme/theme_slug/stylesheet/**/*.css`
  watch(stylesGlob, stylesWithBrowserSync)

  const scriptsGlob = `${srcPath}/catalog/view/theme/theme_slug/javascript/**/*.js`
  watch(scriptsGlob, series(scripts, reload))

  watch(svgSpritesGlob, svgSprites)

  watch(modificationsGlob, series(modifications))

  watch([
    modificationsGlob,
    `${srcPath}/catalog/view/theme/theme_slug/template/**/*.twig`
  ], refreshModifications)
}

module.exports = series(makeOpencartDirectory, runDockerContainers, build, refreshModifications, serve, stopDockerContainers)
