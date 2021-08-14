const refreshCart = (response) => {
  const {
    total: description,
    product_count: productCount
  } = response

  $('.cart-button').prop('title', description)

  if (!productCount) {
    $('.cart-button .badge__dot').detach()
  } else {
    if ($('.cart-button .badge__dot').length) {
      $('.cart-button .badge__dot').text(productCount)
    } else {
      $('.cart-button .badge').append(`
        <span class="badge__dot">
          ${productCount}
        </span>`
      )
    }
  }

  setTimeout(() => {
    $('.cart-snippet').load('index.php?route=common/cart/info .cart-snippet');
  }, 100);
}

module.exports = {
  refreshCart,
}
