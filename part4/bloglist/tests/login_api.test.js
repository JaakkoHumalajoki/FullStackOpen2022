const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)
const { userTeekkari } = require('./users_util')
const { username, password, name } = userTeekkari
const { LOGIN_SECRET } = require('../utils/config')

beforeAll(async () => {
  await User.deleteMany({})
  await api.post('/api/users').send(userTeekkari)
})

describe('POST /api/login', () => {
  test('returns status 400 on faulty requests', async () => {
    let faultyLogin = { username: 'WrongAccount', password }
    await api.post('/api/login').send(faultyLogin).expect(400)

    faultyLogin = { username, password: 'WrongPassword' }
    await api.post('/api/login').send(faultyLogin).expect(400)

    faultyLogin = { username }
    await api.post('/api/login').send(faultyLogin).expect(400)

    faultyLogin = { password }
    await api.post('/api/login').send(faultyLogin).expect(400)
  })

  test('returns a valid token on successful login', async () => {
    const credentials = { username, password }
    const response = await api
      .post('/api/login')
      .send(credentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toBeDefined()
    expect(response.body.token).toBeDefined()
    expect(response.body.username).toBe(username)
    expect(response.body.name).toBe(name)

    const token = jwt.verify(response.body.token, LOGIN_SECRET)
    expect(token.id).toBeDefined()
    expect(token.username).toBe(username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
