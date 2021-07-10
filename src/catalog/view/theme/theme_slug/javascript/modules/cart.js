const getURLVar = require('../helpers/get-url-var')
const { logAjaxError } = require('../helpers/log-ajax-error');

const add = (productId, quantity) => {
  $.ajax({
    url: 'index.php?route=checkout/cart/add',
    type: 'POST',
    data: {
      product_id: productId,
      quantity: quantity || 1,
    },
    dataType: 'json',
    success: (response) => {
      if (response.redirect) {
        window.location = response.redirect
      }

      if (response.success) {
        $('.cart-button .button__text').text(response.total);
        $('.cart-snippet').load('index.php?route=common/cart/info .cart-snippet');
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
        $('.cart-button .button__text').text(response.total)
        $('.cart-snippet').load('index.php?route=common/cart/info .cart-snippet');
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
        $('.cart-button .button__text').text(response.total)
        $('#cart > table').load('index.php?route=common/cart/info table')
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
