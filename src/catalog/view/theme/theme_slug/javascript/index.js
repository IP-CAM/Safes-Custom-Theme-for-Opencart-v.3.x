require('jquery-ui/ui/widgets/autocomplete')

const { Swiper, Pagination, Lazy } = require('swiper')

const loadSVGSprites = require('./modules/svg-sprites')
const cart = require('./modules/cart')
const { search } = require('./modules/search');

const { svgSpritesPath } = require('./constants/paths')

Swiper.use([Pagination, Lazy])

window.cart = cart
window.LiveSearchJs = search
window.Swiper = Swiper

loadSVGSprites(svgSpritesPath)

require('./modules/cart-dialog')
require('./modules/login-dialog')
require('./modules/order-dialog')
require('./modules/legacy')

