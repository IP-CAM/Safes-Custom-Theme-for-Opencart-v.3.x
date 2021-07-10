import { openModal, closeModal } from '../helpers/modals'

$('.cart-button').on('click', openModal('.cart-dialog-modal'))
$('.cart-dialog__close').on('click', closeModal)
