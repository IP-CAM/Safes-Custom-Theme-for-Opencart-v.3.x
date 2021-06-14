const rollup = require('rollup');

const { srcPath, destPath, themeSlug } = require('./paths')

const entryPath = `${srcPath}/catalog/view/theme/${themeSlug}/javascript/main.js`
const outputPath = `${destPath}/catalog/view/theme/${themeSlug}/javascript/bundle.js`

function scripts(cb) {
  rollup.rollup({
    input: entryPath,
  }).then(function(bundle) {
    return bundle.write({
      file: outputPath,
      sourcemap: true,
    })
  })
  cb()
}

exports.default = scripts
