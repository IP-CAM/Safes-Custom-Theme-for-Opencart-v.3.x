require('jquery-ui/ui/widgets/autocomplete')

const loadSVGSprites = require('./modules/svg-sprites')
const cart = require('./modules/cart')

const { svgSpritesPath } = require('./constants/paths')

window.cart = cart
loadSVGSprites(svgSpritesPath)

require('./modules/ui')
