const rollup = require('rollup')
const commonjs = require('@rollup/plugin-commonjs')
const nodeResolve = require('@rollup/plugin-node-resolve').default

const { srcPath, destPath, themeSlug } = require('./paths')

const entryPath = `${srcPath}/catalog/view/theme/${themeSlug}/javascript/main.js`
const outputPath = `${destPath}/catalog/view/theme/${themeSlug}/javascript/bundle.js`

function scripts(cb) {
  rollup.rollup({
    input: entryPath,
    plugins: [
      commonjs(),
      nodeResolve(),
    ],
    external: ['jquery'],
  }).then(function(bundle) {
    return bundle.write({
      file: outputPath,
      format: 'iife',
      sourcemap: true,
      globals: {
        jquery: '$'
      },
    })
  })
  cb()
}

exports.default = scripts