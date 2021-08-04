import { openModal, closeModal } from './modals'

const handleCartDialogButtonClick = event => {
  event.preventDefault()
  event.stopPropagation()

  openModal('.cart-dialog-modal')
}

$('.cart-button').on('click', handleCartDialogButtonClick)
$('.cart-dialog__close').on('click', closeModal)
