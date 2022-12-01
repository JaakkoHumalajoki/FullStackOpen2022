const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const { listOfThreeBlogs, blogMobyDick } = require('./blogs_util')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
})

describe('GET /api/blogs', () => {
  test('returns empty array on empty database', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(0)
  })

  test('returns one saved blog correctly', async () => {
    await new Blog(blogMobyDick).save()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(1)
    const blog = response.body[0]
    expect(blog.title).toBe('Moby Dick')
    expect(blog.author).toBe('Hermal Melville')
    expect(blog.url).toBe('https://en.wikipedia.org/wiki/Moby-Dick')
    expect(blog.likes).toBe(15)
  })

  test('returns a list of 3 blogs', async () => {
    const blogPromises = listOfThreeBlogs.map((blog) => new Blog(blog).save())
    await Promise.all(blogPromises)

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(3)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
