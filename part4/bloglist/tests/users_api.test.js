const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)
const { userTeekkari } = require('./users_util')

beforeEach(async () => {
  await User.deleteMany({})
})

describe('GET /api/users', () => {
  test('gets a user from the database', async () => {
    const user = new User(userTeekkari)
    const savedUser = await user.save()
    console.log(savedUser)

    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(1)
    const serverUser = response.body[0]
    expect(serverUser.username).toBe(userTeekkari.username)
    expect(serverUser.name).toBe(userTeekkari.name)
    expect(serverUser.id).toBeDefined()
  })
})

describe('POST /api/users', () => {
  test('successfully posts a valid user', async () => {
    const databaseStart = await User.find({})
    expect(databaseStart.length).toBe(0)

    const response = await api
      .post('/api/users')
      .send(userTeekkari)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const savedUser = response.body
    expect(savedUser.id).toBeDefined()
    expect(savedUser.passwordHash).toBe(undefined)
    expect(savedUser.username).toBe(userTeekkari.username)
    expect(savedUser.name).toBe(userTeekkari.name)

    const databaseEnd = await User.find({})
    expect(databaseEnd.length).toBe(1)
  })

  test('requests fail with status 400 on faulty inputs', async () => {
    let faultyUser = { ...userTeekkari, username: 'a' }
    await api.post('/api/users').send(faultyUser).expect(400)

    faultyUser = { ...userTeekkari, username: '!"%!%&!=&' }
    await api.post('/api/users').send(faultyUser).expect(400)

    faultyUser = { ...userTeekkari, name: 'b' }
    await api.post('/api/users').send(faultyUser).expect(400)

    faultyUser = { ...userTeekkari, password: undefined }
    await api.post('/api/users').send(faultyUser).expect(400)

    faultyUser = { ...userTeekkari, password: 'short1' }
    await api.post('/api/users').send(faultyUser).expect(400)

    faultyUser = { ...userTeekkari, password: 'lackingNumber' }
    await api.post('/api/users').send(faultyUser).expect(400)

    faultyUser = { ...userTeekkari, password: '¤&!25afd%=adf##%' }
    await api.post('/api/users').send(faultyUser).expect(400)

    const databaseEnd = await User.find({})
    expect(databaseEnd.length).toBe(0)
  })
})
