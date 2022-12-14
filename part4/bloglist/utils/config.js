require('dotenv').config()

const PORT = process.env.PORT || 3003
const NODE_ENV = process.env.NODE_ENV
const LOGIN_SECRET = process.env.LOGIN_SECRET

let MONGO_URL = ''
switch (NODE_ENV) {
  case 'production':
    MONGO_URL = process.env.MONGO_PROD_URL
    break
  case 'development':
    MONGO_URL = process.env.MONGO_DEV_URL
    break
  case 'test':
    MONGO_URL = process.env.MONGO_TEST_URL
}

module.exports = { MONGO_URL, PORT, NODE_ENV, LOGIN_SECRET }
