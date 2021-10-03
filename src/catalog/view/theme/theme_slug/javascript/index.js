const { Swiper, Pagination, Lazy, Thumbs } = require('swiper')

const cart = require('./modules/cart')

Swiper.use([Pagination, Lazy, Thumbs])

window.cart = cart
window.Swiper = Swiper

require('./modules/cart-dialog')
require('./modules/login-dialog')
require('./modules/catalog-menu')
require('./modules/ajax-search')
require('./modules/legacy')
