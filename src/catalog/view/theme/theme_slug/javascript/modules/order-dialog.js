import { logAjaxError } from '../helpers/log-ajax-error'
import { openModal, closeModal } from './modals'

const handleOrderDialogButtonClick = () => {
  $.ajax({
    url: 'index.php?route=product/ajax/order_dialog/validate',
    type: 'POST',
    data: $('.product-form').serialize(),
    dataType: 'json',
    success: response => {
      if (response.error) {
        if (response.error.option) {
          // for (const optionId in response['error']['option']) {
          //   $(`#input-option${optionId.replace('_', '-')}`).before(`<span>${response.error.option[optionId]}</span>`)
          // }
        }
      } else {
        openModal('.order-dialog-modal')
      }
    },
    error: logAjaxError,
  })
}

$('.order-dialog-button').on('click', handleOrderDialogButtonClick)
$('.order-dialog .dialog__close').on('click', closeModal)

const handleOrderDialogFormSubmit = event => {
  event.preventDefault()

  $.ajax({
    url: 'index.php?route=product/ajax/order_dialog/checkout',
    type: 'POST',
    data: $('.product-form, .order-dialog-form').serialize(),
    dataType: 'json',
    success: () => {
      window.location = 'index.php?route=checkout/success';
    },
    error: logAjaxError,
  })
}

$('.order-dialog-form').on('submit', handleOrderDialogFormSubmit);
