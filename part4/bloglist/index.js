const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const { mongoUrl } = require('./utils/config')

mongoose
  .connect(mongoUrl)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((err) => logger.error('MongoDB error:', err))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
