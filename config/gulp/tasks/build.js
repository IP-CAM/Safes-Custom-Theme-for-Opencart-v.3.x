const { series } = require('gulp')

const { copy } = require('./copy')
const { scripts } = require('./scripts')
const { styles } = require('./styles')
const { svgSprites } = require('./svg-sprites')
const { modifications } = require('./modifications')

module.exports = series([copy, styles, scripts, svgSprites, modifications])
