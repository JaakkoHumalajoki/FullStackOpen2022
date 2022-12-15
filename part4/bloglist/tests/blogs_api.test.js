const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const {
  listOfThreeBlogs,
  blogMobyDick,
  blogArtOfWar,
  getNonexistantId
} = require('./blogs_util')
const User = require('../models/user')
const { userTeekkari, userSecondary } = require('./users_util')
const app = require('../app')
const api = supertest(app)

let userId = ''
let token = ''
let secondaryUserId = ''
let secondaryToken = ''

beforeAll(async () => {
  await User.deleteMany({})
  const savedUser = await api.post('/api/users').send(userTeekkari)
  userId = savedUser.body.id
  const loggedInUser = await api.post('/api/login').send(userTeekkari)
  token = loggedInUser.body.token
  const savedUser2 = await api.post('/api/users').send(userSecondary)
  secondaryUserId = savedUser2.body.id
  const loggedInUser2 = await api.post('/api/login').send(userSecondary)
  secondaryToken = loggedInUser2.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})
})

describe('Testing pre-requisites', () => {
  test('POST /api/users gave an id', () => {
    expect(userId).toBeDefined()
    expect(secondaryUserId).toBeDefined()
  })

  test('POST /api/login gave a token', () => {
    expect(token).toBeDefined()
    expect(secondaryToken).toBeDefined()
  })
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

  test('Blog includes user info', async () => {
    const newBlog = { ...blogMobyDick, user: userId }
    await new Blog(newBlog).save()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(1)
    const blog = response.body[0]
    expect(blog.user).toBeDefined()
    expect(blog.user.username).toBe(userTeekkari.username)
    expect(blog.user.name).toBe(userTeekkari.name)
    expect(blog.user.id).toBeDefined()
    expect(blog.user.passwordHash).toBe(undefined)
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

describe('GET /api/blogs/:id', () => {
  test('Nonexistant ID returns 404', async () => {
    const id = await getNonexistantId()

    await api.get(`/api/blogs/${id}`).expect(404)
  })

  test('gibberish ID returns 400', async () => {
    const id = 'ThisShouldGiveCastError'

    await api.get(`/api/blogs/${id}`).expect(400)
  })

  test('returns the correct blog by ID', async () => {
    const blogPromises = listOfThreeBlogs.map((blog) => new Blog(blog).save())
    await Promise.all(blogPromises)
    const blogs = await Blog.find({})
    const correctBlog = blogs[1].toJSON()
    correctBlog.id = correctBlog.id.toString()

    const response = await api
      .get(`/api/blogs/${correctBlog.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual(correctBlog)
  })
})

describe('POST /api/blogs', () => {
  test('increases blog count by one', async () => {
    const startingBlogs = await Blog.find({})
    expect(startingBlogs.length).toBe(0)

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(blogArtOfWar)

    const endBlogs = await Blog.find({})
    expect(endBlogs.length).toBe(1)
  })

  test('correctly saves a valid blog', async () => {
    const response = await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
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

  test('missing likes count defaults to zero', async () => {
    const blogMissingLikes = { ...blogArtOfWar }
    delete blogMissingLikes.likes

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(blogMissingLikes)

    const savedBlogs = await Blog.find({})
    expect(savedBlogs.length).toBe(1)
    expect(savedBlogs[0].likes).toBe(0)
  })

  test('should fail with missing title', async () => {
    const blogMissingTitle = { ...blogArtOfWar }
    delete blogMissingTitle.title

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(blogMissingTitle)
      .expect(400)
  })

  test('should fail with missing url', async () => {
    const blogMissingUrl = { ...blogArtOfWar }
    delete blogMissingUrl.url

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(blogMissingUrl)
      .expect(400)
  })

  test('should fail with negative likes count', async () => {
    const blogNegativeLikes = { ...blogArtOfWar, likes: -100 }

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(blogNegativeLikes)
      .expect(400)
  })

  test('returns status 401 on missing token', async () => {
    await api.post('/api/blogs').send(blogMobyDick).expect(401)
  })

  test('returns status 401 on faulty token', async () => {
    await api
      .post('/api/blogs')
      .set('authorization', 'Bearer gibberish')
      .send(blogMobyDick)
      .expect(401)
  })
})

describe('PUT /api/blogs/:id', () => {
  test('fails with 404 with nonexistant id', async () => {
    const id = await getNonexistantId()

    await api
      .put(`/api/blogs/${id}`)
      .set('authorization', `Bearer ${token}`)
      .send({ likes: 100 })
      .expect(404)
  })

  test('gibberish ID returns 400', async () => {
    const id = 'ThisShouldGiveCastError'

    await api
      .put(`/api/blogs/${id}`)
      .set('authorization', `Bearer ${token}`)
      .send({ likes: 100 })
      .expect(400)
  })

  test('updates likes of a blog correctly', async () => {
    const newBlog = { ...blogMobyDick, user: userId }
    await new Blog(newBlog).save()

    let blogs = await Blog.find({})
    const initialBlog = blogs[0].toJSON()
    expect(initialBlog.likes).toBe(15)

    const response = await api
      .put(`/api/blogs/${initialBlog.id}`)
      .set('authorization', `Bearer ${token}`)
      .send({ likes: 100 })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(100)

    blogs = await Blog.find({})
    const endBlog = blogs[0].toJSON()
    expect(initialBlog.title).toBe(endBlog.title)
    expect(endBlog.likes).toBe(100)
  })

  test('can update all fields simultaneously', async () => {
    const newBlog = { ...blogMobyDick, user: userId }
    await new Blog(newBlog).save()

    const blogs = await Blog.find({})
    const initialBlog = blogs[0].toJSON()

    const updates = {
      title: 'Testing PUT',
      author: 'Me',
      url: 'http://localhost:3000',
      likes: 999
    }

    const response = await api
      .put(`/api/blogs/${initialBlog.id}`)
      .set('authorization', `Bearer ${token}`)
      .send(updates)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.title).toBe('Testing PUT')
    expect(response.body.author).toBe('Me')
    expect(response.body.url).toBe('http://localhost:3000')
    expect(response.body.likes).toBe(999)
  })

  test('fails with a faulty likes count', async () => {
    const newBlog = { ...blogMobyDick, user: userId }
    await new Blog(newBlog).save()

    const blogs = await Blog.find({})
    const initialBlog = blogs[0].toJSON()

    await api
      .put(`/api/blogs/${initialBlog.id}`)
      .set('authorization', `Bearer ${token}`)
      .send({ likes: -100 })
      .expect(400)
  })

  test('returns status 401 if missing token', async () => {
    const newBlog = { ...blogMobyDick, user: userId }
    const savedBlog = await new Blog(newBlog).save()
    const blogId = savedBlog._id

    await api.put(`/api/blogs/${blogId}`).send({ likes: 999 }).expect(401)
  })

  test('returns status 401 if wrong user attempts update', async () => {
    const newBlog = { ...blogMobyDick, user: userId }
    const savedBlog = await new Blog(newBlog).save()
    const blogId = savedBlog._id

    await api
      .put(`/api/blogs/${blogId}`)
      .set('authorization', `Bearer ${secondaryToken}`)
      .send({ likes: 999 })
      .expect(401)
  })
})

describe('DELETE /api/blogs/:id', () => {
  test('should fail with 404 using nonexistant id', async () => {
    const id = await getNonexistantId()

    await api
      .delete(`/api/blogs/${id}`)
      .set('authorization', `Bearer ${token}`)
      .expect(404)
  })

  test('gibberish ID returns 400', async () => {
    const id = 'ThisShouldGiveCastError'

    await api
      .delete(`/api/blogs/${id}`)
      .set('authorization', `Bearer ${token}`)
      .expect(400)
  })

  test('removes the correct blog from list', async () => {
    const blogPromises = listOfThreeBlogs.map((blog) => {
      const blogWithUser = { ...blog, user: userId }
      return new Blog(blogWithUser).save()
    })
    await Promise.all(blogPromises)

    const initialBlogs = await Blog.find({})
    expect(initialBlogs.length).toBe(3)
    const targetBlog = initialBlogs[1]

    await api
      .delete(`/api/blogs/${targetBlog.id}`)
      .set('authorization', `Bearer ${token}`)
      .expect(204)

    const endBlogs = await Blog.find({})
    expect(endBlogs.length).toBe(2)
    expect(endBlogs[0]).toEqual(initialBlogs[0])
    expect(endBlogs[1]).toEqual(initialBlogs[2])
  })

  test('returns status 401 if missing token', async () => {
    const newBlog = { ...blogMobyDick, user: userId }
    const savedBlog = await new Blog(newBlog).save()
    const blogId = savedBlog._id

    await api.delete(`/api/blogs/${blogId}`).expect(401)
  })

  test('returns status 401 if wrong user attempts deletion', async () => {
    const newBlog = { ...blogMobyDick, user: userId }
    const savedBlog = await new Blog(newBlog).save()
    const blogId = savedBlog._id

    await api
      .delete(`/api/blogs/${blogId}`)
      .set('authorization', `Bearer ${secondaryToken}`)
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
