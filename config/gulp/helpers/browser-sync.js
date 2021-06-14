const browserSync = require('browser-sync').create()

const reload = function(cb) {
  browserSync.reload()
  cb()
}

module.exports = {
  browserSync,
  reload,
}
