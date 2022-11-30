const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const { MONGO_URL, PORT } = require('./utils/config')

mongoose
  .connect(MONGO_URL)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((err) => logger.error('MongoDB error:', err))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
