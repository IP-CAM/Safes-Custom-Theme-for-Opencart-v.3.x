export const loadSVGSprites = (url) => {
  if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) return

  const isLocalStorage = 'localStorage' in window && window['localStorage'] !== null
  let data

  const insertIT = () => {
    document.body.insertAdjacentHTML('afterbegin', data)
  }

  const insert = () => {
    if (document.body) {
      insertIT()
    } else {
      document.addEventListener('DOMContentLoaded', insertIT)
    }
  }

  if (isLocalStorage && localStorage.getItem('sprites')) {
    data = localStorage.getItem('sprites')
    insert()
    return
  }

  try {
    const request = new XMLHttpRequest();

    request.open('GET', url, true)
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const data = request.responseText

        insert()

        if (isLocalStorage) {
          localStorage.setItem('sprites', data)
        }
      }
    }
    request.send()
  }
  catch (e) {

  }
}
