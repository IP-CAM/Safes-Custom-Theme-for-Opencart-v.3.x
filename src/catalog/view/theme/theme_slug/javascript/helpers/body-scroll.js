const disableBodyScroll = () => {
  $('html, body').css({
    overflow: 'hidden',
    height: '100%',
  })
}

const enableBodyScroll = () => {
  $('html, body').css({
    overflow: 'auto',
    height: 'auto',
  })
}

module.exports = {
  disableBodyScroll,
  enableBodyScroll,
}
