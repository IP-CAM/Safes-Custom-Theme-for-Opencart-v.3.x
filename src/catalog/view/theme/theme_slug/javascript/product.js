const { logAjaxError } = require('./helpers/log-ajax-error')
const { removeFormErrors } = require('./helpers/remove-form-errors')
const { refreshCart } = require('./helpers/refresh-cart')
const { pushNotification } = require('./modules/notifications')
const breakpoints = require('../shared/breakpoints')

require('./modules/order-dialog')

const breakpoint = breakpoints['tablet-portrait'].split('px')[0];

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
        pushNotification(response.success)

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
    direction: 'horizontal',
    spaceBetween: 20,
    slidesPerView: 4,
    slideToClickedSlide: true,
    breakpoints: {
      [breakpoint]: {
        direction: 'vertical',
        slidesPerView: 8,
        centeredSlides: true,
      },
    }
  });

  const productPhotoCarousel = new Swiper('.product-photo-carousel', {
    spaceBetween: 20,
    lazy: true,
    thumbs: {
      swiper: productThumbCarousel,
      slideThumbActiveClass: 'product-photo-thumb-carousel__item_current'
    }
  })

  productPhotoCarousel.on('slideChangeTransitionStart', function() {
    productThumbCarousel.slideTo(productPhotoCarousel.activeIndex);
  });
  productThumbCarousel.on('transitionStart', function() {
    productPhotoCarousel.slideTo(productThumbCarousel.activeIndex);
  });
})

module.exports = {
  handleProductOptionErrors,
}
