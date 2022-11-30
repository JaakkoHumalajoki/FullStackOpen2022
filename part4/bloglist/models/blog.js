const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: String,
  likes: {
    type: Number,
    min: 0
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
