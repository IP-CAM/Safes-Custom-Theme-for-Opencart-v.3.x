const { watch, series } = require('gulp')
const { spawn } = require('child_process')

const { copy, copyGlobs } = require('./copy')
const remove = require('./remove').default
const styles = require('./styles').default
const scripts = require('./scripts').default
const { srcPath, themeSlug} = require('./paths')

require('./utils/windows-sigint')

function serve(cb) {
  process.on('SIGINT', function() {
    cb()
  })

  const watcher = watch(copyGlobs, copy)
  watcher.on('unlink', remove)

  const stylesGlob = `${srcPath}/catalog/view/theme/${themeSlug}/stylesheet/**/*.css`
  watch(stylesGlob, styles)

  const scriptsGlob = `${srcPath}/catalog/view/theme/${themeSlug}/javascript/**/*.js`
  watch(scriptsGlob, scripts)
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
