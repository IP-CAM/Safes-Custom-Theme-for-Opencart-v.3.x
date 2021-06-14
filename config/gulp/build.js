const { series } = require('gulp')

const { copy } = require('./copy')

exports.default = series([copy])
