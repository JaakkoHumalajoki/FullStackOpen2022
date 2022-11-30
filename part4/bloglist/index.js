const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const { mongoUrl } = require('./utils/config')

mongoose
  .connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB error:', err))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
