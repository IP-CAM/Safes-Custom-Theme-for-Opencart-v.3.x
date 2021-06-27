const { series } = require('gulp')

const { copy } = require('./copy')
const scripts = require('./scripts').default
const { styles } = require('./styles')

module.exports = series([copy, styles, scripts])
