import { openModal, closeModal } from './modals'

const handleMobileMenuButtonClick = (event) => {
  event.stopPropagation()
  openModal('.mobile-menu-modal')
}

$('.mobile-menu-button').on('click', handleMobileMenuButtonClick)
$('.mobile-menu__close').on('click', closeModal)
