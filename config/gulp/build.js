const { series } = require('gulp')

const { copy } = require('./copy')
const scripts = require('./scripts').default

exports.default = series([copy, scripts])
