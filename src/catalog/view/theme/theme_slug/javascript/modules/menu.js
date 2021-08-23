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
  event.stopPropagation();

  if (isMenuOpen) {
    closeMenu()
  } else {
    openMenu()
  }
}

const handleOutsideClick = (event) => {
  if ($(event.target).closest('.menu').length > 0) return

  console.log($(event.target))

  closeMenu()
}

$('.menu-button').on('click', handleMenuToggle)
