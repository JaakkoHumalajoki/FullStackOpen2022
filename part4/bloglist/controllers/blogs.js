const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', (_req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
})

blogsRouter.post('/', (req, res, next) => {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  })

  blog
    .save()
    .then((result) => {
      res.status(201).json(result)
    })
    .catch((err) => {
      logger.error(err.message)
      next(err)
    })
})

module.exports = blogsRouter
