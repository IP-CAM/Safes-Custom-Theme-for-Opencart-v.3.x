import { logAjaxError } from '../helpers/log-ajax-error';
import { openModal, closeModal } from '../helpers/modals'

$('.login-dialog-link').on('click', openModal('.login-dialog-modal'))
$('.login-dialog .dialog__close').on('click', closeModal)

const ajaxLogin = function(event) {
  const removeMessages = () => {
    $(this).find('.form__message').remove();
  }

  const pushMessage = (message) => {
    $(this).prepend(`<p class="form__message">${message}</p>`)
  }

  event.preventDefault()

  $.ajax({
    url: 'index.php?route=account/ajax/login/login',
    type: 'POST',
    data: $(this).serialize(),
    dataType: 'json',
    beforeSend: removeMessages,
    success: (response) => {
      if (response.status === 'ok') {
        window.location.reload()
        return
      }

      pushMessage(response.result)
    },
    error: logAjaxError,
  });
}

$('.login-dialog-form').on('submit', ajaxLogin);
