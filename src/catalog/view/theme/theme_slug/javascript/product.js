const { logAjaxError } = require('./helpers/log-ajax-error')
const { removeFormErrors } = require('./helpers/remove-form-errors');

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
        $('.cart-button .button__text').text(response.total);

        $('.cart-snippet').load('index.php?route=common/cart/info .cart-snippet');
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

module.exports = {
  handleProductOptionErrors,
}
