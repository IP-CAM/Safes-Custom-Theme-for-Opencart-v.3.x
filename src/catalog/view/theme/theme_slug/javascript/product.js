const { logAjaxError } = require('./helpers/log-ajax-error')

$('.product-form').on('submit', function(event) {
  event.preventDefault()

  $.ajax({
    url: 'index.php?route=checkout/cart/add',
    type: 'POST',
    data: $(this).serialize(),
    dataType: 'json',
    success: (response) => {
      if (response.error) {
        if (response.error.option) {
          response.error.option.forEach(item => {
            $(`#input-option${item.replace('_', '-')}`)
              .before(`<p class="message">${response.error.option[item]}</p>`)
          })
        }

        if (response.error.recurring) {
          $('select[name=\'recurring_id\']')
            .after(`<p class="message">${response.error.recurring}</p>`)
        }
      }

      if (response.success) {
        $('.cart-button .button__text').text(response.total);

        $('.cart-snippet').load('index.php?route=common/cart/info .cart-snippet');
      }
    },
    error: logAjaxError,
  });
});
