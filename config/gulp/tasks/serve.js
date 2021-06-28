const { watch, series } = require('gulp')

const { copy, copyGlobs } = require('./copy')
const { stylesWithBrowserSync } = require('./styles')
const { scripts } = require('./scripts')
const { runDockerContainers, stopDockerContainers } = require('./docker')
const { modifications, modificationsGlob } = require('./modifications')
const { refreshModifications } = require('./refresh-modifications')
const { makeOpencartDirectory } = require('./make-opencart-directory')
const build = require('./build')
const { browserSync, reload } = require('../helpers/browser-sync')
const remove = require('../helpers/remove')

const { srcPath, themeSlug, opencartPort } = require('../../../config')

require('../helpers/windows-sigint')

const browserSyncConfig = {
  proxy: `localhost:${opencartPort}`,
}

function serve(cb) {
  process.on('SIGINT', function() {
    cb()
  })

  browserSync.init(browserSyncConfig)

  const watcher = watch(copyGlobs, copy)
  watcher.on('unlink', series(remove, reload))

  const stylesGlobs = [
    `${srcPath}/catalog/view/theme/${themeSlug}/stylesheet/**/*.css`,
    `${srcPath}/catalog/view/theme/${themeSlug}/blocks/**/*.css`,
  ]
  watch(stylesGlobs, stylesWithBrowserSync)

  const scriptsGlob = `${srcPath}/catalog/view/theme/${themeSlug}/javascript/**/*.js`
  watch(scriptsGlob, series(scripts, reload))

  watch(modificationsGlob, series(modifications))

  watch([
    modificationsGlob,
    `${srcPath}/catalog/view/theme/${themeSlug}/template/**/*.twig`
  ], refreshModifications)
}

module.exports = series(makeOpencartDirectory, runDockerContainers, build, serve, stopDockerContainers)
