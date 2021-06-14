const { watch, series } = require('gulp')
const { spawn } = require('child_process')

const { copy, copyGlobs } = require('./copy')
const { stylesWithBrowserSync } = require('./styles')

const scripts = require('./scripts').default
const remove = require('./helpers/remove').default
const { browserSync, reload } = require('./helpers/browser-sync')
const { srcPath, themeSlug} = require('./paths')

require('./helpers/windows-sigint')

const browserSyncConfig = {
  proxy: 'localhost',
}

function serve(cb) {
  process.on('SIGINT', function() {
    cb()
  })

  browserSync.init(browserSyncConfig)

  const watcher = watch(copyGlobs, copy)
  watcher.on('unlink', series(remove, reload))

  const stylesGlob = `${srcPath}/catalog/view/theme/${themeSlug}/stylesheet/**/*.css`
  watch(stylesGlob, stylesWithBrowserSync)

  const scriptsGlob = `${srcPath}/catalog/view/theme/${themeSlug}/javascript/**/*.js`
  watch(scriptsGlob, series(scripts, reload))
}

function runDockerContainers(cb) {
  spawn('docker', ['compose', 'up', '-d'], { stdio: 'inherit' })
    .on('close', cb)
}

function stopDockerContainers(cb) {
  spawn('docker', ['compose', 'down'], { stdio: 'inherit' })
    .on('close', function() {
      cb()
      process.exit()
    })
}

exports.default = series(runDockerContainers, serve, stopDockerContainers)
