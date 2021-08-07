let _isBodyScrollDisabled = false

const disableBodyScroll = () => {
  $('html, body').css({
    overflow: 'hidden',
    height: '100%',
  })
  _isBodyScrollDisabled = true
}

const enableBodyScroll = () => {
  $('html, body').css({
    overflow: 'auto',
    height: 'auto',
  })
  _isBodyScrollDisabled = false
}

const isBodyScrollDisabled = () => _isBodyScrollDisabled

module.exports = {
  isBodyScrollDisabled,
  disableBodyScroll,
  enableBodyScroll,
}
