const { enableBodyScroll, disableBodyScroll, isBodyScrollDisabled } = require('../helpers/body-scroll')

const handleBackdropClick = (event) => {
  if ($(event.target).closest('.modal__window').length > 0) return

  closeModal()
}

export const openModal = (selector, disableScroll = true) => {
  if (!selector) return

  $(selector).addClass('modal_opened')
  $(document).on('click', handleBackdropClick)

  if (disableScroll) {
    disableBodyScroll()
  }
}

export const closeModal = () => {
  $('.modal_opened').removeClass('modal_opened')
  $(document).off('click', handleBackdropClick)

  if (isBodyScrollDisabled()) {
    enableBodyScroll()
  }
}
