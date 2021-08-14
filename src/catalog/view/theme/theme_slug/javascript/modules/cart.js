const getURLVar = require('../helpers/get-url-var')
const { logAjaxError } = require('../helpers/log-ajax-error')
const { refreshCart } = require('../helpers/refresh-cart')

const add = (productId, quantity) => {
  $.ajax({
    url: 'index.php?route=checkout/cart/add',
    type: 'POST',
    data: {
      product_id: productId,
      quantity: quantity ? quantity : 1,
    },
    dataType: 'json',
    success: (response) => {
      if (response.redirect) {
        location = response['redirect'];
      }

      if (response.success) {
        console.log(response.success);

        refreshCart(response)
      }
    },
    error: logAjaxError,
  })
}

const remove = (key) => {
  $.ajax({
    url: 'index.php?route=checkout/cart/remove',
    type: 'POST',
    data: {
      key,
    },
    dataType: 'json',
    success: (response) => {
      if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
        window.location = 'index.php?route=checkout/cart'

        return
      } else {
        refreshCart(response)
      }
    },
    error: logAjaxError,
  })
}

const update = (key, quantity) => {
  $.ajax({
    url: 'index.php?route=checkout/cart/edit',
    type: 'POST',
    data: {
      key,
      quantity: quantity || 1,
    },
    dataType: 'json',
    success: (response) => {
      if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
        window.location = 'index.php?route=checkout/cart'

        return
      } else {
        refreshCart(response)
      }
    },
    error: logAjaxError,
  })
}

module.exports = {
  add,
  update,
  remove,
}
