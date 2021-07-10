require('jquery-ui/ui/widgets/autocomplete')

const { Swiper, Pagination, Lazy } = require('swiper')

const loadSVGSprites = require('./modules/svg-sprites')
const cart = require('./modules/cart')

const { svgSpritesPath } = require('./constants/paths')

Swiper.use([Pagination, Lazy])

window.cart = cart
window.Swiper = Swiper

loadSVGSprites(svgSpritesPath)

require('./modules/cart-dialog')
require('./modules/login-dialog')
require('./modules/legacy')
