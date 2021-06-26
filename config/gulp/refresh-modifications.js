/**
 * Используем node-fetch, у axios проблема с axios-cookiejar-support, отправкой формы и редиректами:
 * https://github.com/3846masa/axios-cookiejar-support/issues/196
 */

const nodeFetch = require('node-fetch')
const fetch = require('fetch-cookie/node-fetch')(nodeFetch)
const FormData = require('form-data')
const qs = require('qs')

const credentials = {
  username: 'admin',
  password: 'admin',
}

function getToken() {
  const loginFormData = new FormData()

  loginFormData.append('username', credentials.username)
  loginFormData.append('password', credentials.password)

  return new Promise((resolve) => {
    fetch('http://localhost/admin/index.php?route=common/login', {
      method: 'POST',
      headers: loginFormData.getHeaders(),
      body: loginFormData,
      credentials: 'include',
    })
      .then((response) => {
        const token = qs.parse(response.url).user_token

        resolve(token)
      })
  })
}

function refreshModificationsRequest(token) {
  return new Promise((resolve) => {
    fetch(`http://localhost/admin/index.php?route=marketplace/modification/refresh&user_token=${token}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(resolve)
  })
}

async function refreshModifications() {
  await getToken()
    .then(refreshModificationsRequest)
}

module.exports = {
  refreshModifications,
}
