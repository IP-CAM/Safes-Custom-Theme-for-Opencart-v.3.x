import { logAjaxError } from '../helpers/log-ajax-error'
import { openModal, closeModal } from './modals'

const handleLoginDialogLinkClick = event => {
  event.preventDefault()
  event.stopPropagation()

  openModal('.login-dialog-modal')
}

$(document).on('click', '.login-dialog-link', handleLoginDialogLinkClick)
$(document).on('click', '.login-dialog .dialog__close', closeModal)

const handleLoginFormSubmit = function(event) {
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

$('.login-dialog-form').on('submit', handleLoginFormSubmit);
