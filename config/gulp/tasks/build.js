const { series } = require('gulp')

const { copy } = require('./copy')
const { scripts } = require('./scripts')
const { styles } = require('./styles')
const { modifications } = require('./modifications')

module.exports = series([copy, styles, scripts, modifications])
