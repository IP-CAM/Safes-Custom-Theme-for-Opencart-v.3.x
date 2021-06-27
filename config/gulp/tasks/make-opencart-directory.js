const fs = require('fs')

const { destPath } = require('../../../config')

function makeOpencartDirectory(cb) {
  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath)
  }
  cb()
}

module.exports = {
  makeOpencartDirectory,
}
