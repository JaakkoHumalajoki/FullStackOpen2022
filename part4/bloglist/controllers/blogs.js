const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (_req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id)
  if (!blog) return res.status(404).end()
  res.status(200).json(blog)
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0
  })

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const foundBlog = await Blog.findById(id)
  if (!foundBlog) return res.status(404).end()

  await Blog.findByIdAndRemove(id)
  res.status(204).end()
})

module.exports = blogsRouter
