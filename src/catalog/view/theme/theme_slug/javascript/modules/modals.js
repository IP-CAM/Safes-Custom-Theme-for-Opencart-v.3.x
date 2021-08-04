const { enableBodyScroll, disableBodyScroll } = require('../helpers/body-scroll');

const handleBackdropClick = (event) => {
  if ($(event.target).closest('.modal__window').length > 0) return

  closeModal()
}

export const openModal = (selector) => {
  if (!selector) return

  $(selector).addClass('modal_opened')
  $(document).on('click', handleBackdropClick)
  disableBodyScroll()
}

export const closeModal = () => {
  $('.modal_opened').removeClass('modal_opened')
  $(document).off('click', handleBackdropClick)
  enableBodyScroll()
}
