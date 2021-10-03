const { enableBodyScroll, disableBodyScroll, isBodyScrollDisabled } = require('../helpers/body-scroll')
const { debounce } = require('lodash')

const breakpoints = require('../../shared/breakpoints')

const isMobile = () => window.matchMedia(`(max-width: ${breakpoints['tablet-portrait']})`).matches
let isMenuOpen = false

const openMenu = () => {
  $('.catalog-menu').addClass('catalog-menu_visible')
  $('.menu-button').addClass('menu-button_active')
  $(document).on('click', handleOutsideClick)
  $(window).on('resize', handleWindowResizeDebounced)
  if (isMobile()) {
    disableBodyScroll()
  }
  isMenuOpen = true
}

const closeMenu = () => {
  $('.catalog-menu').removeClass('catalog-menu_visible')
  $('.menu-button').removeClass('menu-button_active')
  $(document).off('click', handleOutsideClick)
  $(window).off('resize', handleWindowResizeDebounced)
  if (isBodyScrollDisabled() && isMobile()) {
    enableBodyScroll()
  }
  isMenuOpen = false
}

const handleMenuToggle = () => {
  if (isMenuOpen) {
    closeMenu()
    return
  }

  openMenu()
}

const handleOutsideClick = (event) => {
  if ($(event.target).closest('.catalog-menu').length > 0) return

  closeMenu()
}

const handleWindowResize = () => {
  if (isMobile() && isMenuOpen) {
    disableBodyScroll()
    return
  }

  if (isBodyScrollDisabled) {
    enableBodyScroll()
  }
}

const handleWindowResizeDebounced = debounce(handleWindowResize, 100)

$(document).on('click', '.menu-button', handleMenuToggle)
