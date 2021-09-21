import { openModal, closeModal } from './modals'

const handleCartDialogButtonClick = event => {
  event.preventDefault()

  openModal('.cart-dialog-modal', false)
}

$(document).on('click', '.cart-button', handleCartDialogButtonClick)
$(document).on('click', '.cart-dialog__close', closeModal)
