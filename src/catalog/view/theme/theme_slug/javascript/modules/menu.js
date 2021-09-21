let isMenuOpen = false;

const openMenu = () => {
  $('.menu').addClass('menu_visible')
  $('.menu-button').addClass('menu-button_active')
  $(document).on('click', handleOutsideClick)
  isMenuOpen = true;
}

const closeMenu = () => {
  $('.menu').removeClass('menu_visible')
  $('.menu-button').removeClass('menu-button_active')
  $(document).off('click', handleOutsideClick)
  isMenuOpen = false;
}

const handleMenuToggle = (event) => {
  if (isMenuOpen) {
    closeMenu()
    return
  }

  openMenu()
}

const handleOutsideClick = (event) => {
  if ($(event.target).closest('.menu').length > 0) return

  closeMenu()
}

$(document).on('click', '.menu-button', handleMenuToggle)
