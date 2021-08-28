const { logAjaxError } = require('./helpers/log-ajax-error')
const { removeFormErrors } = require('./helpers/remove-form-errors')
const { refreshCart } = require('./helpers/refresh-cart')


require('./modules/order-dialog')

$('.product-form').on('submit', function(event) {
  event.preventDefault()
  event.stopImmediatePropagation()

  $.ajax({
    url: 'index.php?route=checkout/cart/add',
    type: 'POST',
    data: $(this).serialize(),
    dataType: 'json',
    beforeSend: () => {
      removeFormErrors(this)
    },
    success: (response) => {
      if (response.error) {
        if (response.error.option) {
          handleProductOptionErrors(response.error.option)
        }

        // if (response.error.recurring) {
        //   $('select[name=\'recurring_id\']')
        //     .after(`<p class="message">${response.error.recurring}</p>`)
        // }
      }

      if (response.success) {
        console.log(response.success)

        refreshCart(response)
      }
    },
    error: logAjaxError,
  });
});

const handleProductOptionErrors = (errors) => {
  for (const optionId in errors) {
    $(`#input-option${optionId.replace('_', '-')}`)
      .closest('.form-field')
      .append(`
        <p class="form-field__error">
          ${errors[optionId]}
        </p>
      `)
  }
}

$(() => {
  const productThumbCarousel = new Swiper('.product-photo-thumb-carousel', {
    spaceBetween: 20,
    slidesPerView: 4,
    breakpoints: {
      768: {
        slidesPerView: 6,
      },
      992: {
        slidesPerView: 8,
      }
    }
  });

  new Swiper('.product-photo-carousel', {
    spaceBetween: 20,
    lazy: true,
    thumbs: {
      swiper: productThumbCarousel,
      slideThumbActiveClass: 'product-photo-thumb-carousel__item_current'
    }
  })
})

module.exports = {
  handleProductOptionErrors,
}
