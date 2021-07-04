require('dotenv').config()
const settings = require('./settings')

module.exports = {
  srcPath: 'src',
  destPath: '.opencart',
  opencartPort: process.env.OPENCART_PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  ...settings,
}
