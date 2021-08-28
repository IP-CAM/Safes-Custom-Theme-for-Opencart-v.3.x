require('jquery-ui/ui/widgets/autocomplete')

const { Swiper, Pagination, Lazy, Thumbs } = require('swiper')

const cart = require('./modules/cart')
const { search } = require('./modules/search')

Swiper.use([Pagination, Lazy, Thumbs])

window.cart = cart
window.LiveSearchJs = search
window.Swiper = Swiper

require('./modules/cart-dialog')
require('./modules/login-dialog')
require('./modules/menu')
require('./modules/legacy')

