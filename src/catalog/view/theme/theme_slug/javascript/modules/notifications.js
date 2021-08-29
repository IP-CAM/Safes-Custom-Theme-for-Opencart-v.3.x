const NOTIFICATION_TIMEOUT = 4000;

const removeNotification = (node) => () => {
  $(node).remove()
}

const pushNotification = (text) => {
  if (!text) return

  const notification = $(`
    <div class="notification">
      <div class="notification__content raw-markup">
        ${text}
      </div>
      <button
        type="button"
        class="icon-button icon-button_size_s notification__close"
      >
        <svg class="icon-button__icon">
          <use href="#icon-close"/>
        </svg>
        <span class="icon-button__text">
          Закрыть
        </span>
      </button>
    </div>
  `)

  $(notification).find('.notification__close').on('click', removeNotification(notification))

  $('.notifications').prepend(notification)

  setTimeout(removeNotification(notification), NOTIFICATION_TIMEOUT)
}

module.exports = {
  pushNotification,
}
