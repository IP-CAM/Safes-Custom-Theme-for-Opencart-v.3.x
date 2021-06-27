const { src, dest, lastRun } = require('gulp')

const { srcPath, destPath } = require('../../../config')

const copyGlobs = [
  `${srcPath}/**/*`,
  `!${srcPath}/**/{blocks,blocks/**/*.css}`,
  `!${srcPath}/**/{stylesheet,stylesheet/**/*}`,
  `!${srcPath}/**/{javascript,javascript/**/*}`,
  `!${srcPath}/system/{modifications,modifications/**/*}`,
]

function copy() {
  return src(copyGlobs, { base: srcPath, since: lastRun(copy)})
    .pipe(dest(destPath))
}

module.exports = {
  copy,
  copyGlobs,
}
