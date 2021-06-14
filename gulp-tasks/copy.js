const { src, dest, lastRun } = require('gulp')

const { srcPath, destPath } = require('./paths')

const copyGlobs = [
  `${srcPath}/**/*`,
  `!${srcPath}/**/{stylesheet,stylesheet/*}`,
  `!${srcPath}/**/{javascript,javascript/*}`,
]

function copy() {
  return src(copyGlobs, { base: srcPath, since: lastRun(copy)})
    .pipe(dest(destPath))
}

module.exports = {
  copy,
  copyGlobs,
}
