require('dotenv').config()
const mongoUrl = process.env.MONGODB_URL

module.exports = { mongoUrl }
