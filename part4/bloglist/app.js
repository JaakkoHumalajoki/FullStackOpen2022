const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
require('express-async-errors')
const { MONGO_URL } = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const app = express()

mongoose
  .connect(MONGO_URL)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((err) => logger.error('MongoDB error:', err))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
