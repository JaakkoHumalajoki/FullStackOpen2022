const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const { listOfThreeBlogs, blogMobyDick, blogArtOfWar } = require('./blogs_util')
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

  test('returns one saved blog correctly with an ID field', async () => {
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
    expect(blog.id).toBeDefined()
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

describe('POST /api/blogs', () => {
  test('increases blog count by one', async () => {
    const startingBlogs = await Blog.find({})
    expect(startingBlogs.length).toBe(0)

    await api.post('/api/blogs').send(blogArtOfWar)

    const endBlogs = await Blog.find({})
    expect(endBlogs.length).toBe(1)
  })

  test('correctly saves a valid blog', async () => {
    const response = await api
      .post('/api/blogs')
      .send(blogArtOfWar)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const savedBlog = response.body
    expect(savedBlog.title).toBe('The Art of War')
    expect(savedBlog.author).toBe('Sun Tzu')
    expect(savedBlog.url).toBe('https://en.wikipedia.org/wiki/The_Art_of_War')
    expect(savedBlog.likes).toBe(4)
    expect(savedBlog.id).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})
