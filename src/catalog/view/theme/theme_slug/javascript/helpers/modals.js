const handleBackdropClick = (event) => {
  if ($(event.target).closest('.modal__window').length > 0) return

  closeModal()
}

export const openModal = (selector) => (event) => {
  if (!selector) return

  event.preventDefault()
  event.stopPropagation()

  $(selector).addClass('modal_opened')
  $(document).on('click', handleBackdropClick)
}

export const closeModal = () => {
  $('.modal_opened').removeClass('modal_opened')
  $(document).off('click', handleBackdropClick)
}
