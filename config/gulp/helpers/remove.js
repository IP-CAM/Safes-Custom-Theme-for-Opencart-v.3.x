const del = require('del')
const path = require('path')

const { srcPath, destPath } = require('../../settings')

function remove(filePath) {
  const filePathFromSrc = path.relative(path.resolve(srcPath), filePath)
  const destFilePath = path.resolve(destPath, filePathFromSrc)

  del.sync(destFilePath)
}

module.exports = remove
