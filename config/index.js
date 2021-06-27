require('dotenv').config()
const settings = require('./settings')

module.exports = {
  port: process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  ...settings,
}
