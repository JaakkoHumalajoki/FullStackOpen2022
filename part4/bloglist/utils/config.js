require('dotenv').config()
const MONGO_URL = process.env.MONGODB_URL
const PORT = process.env.PORT || 3003

module.exports = { MONGO_URL, PORT }
