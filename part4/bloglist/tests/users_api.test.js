const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)
const { userTeekkari, getNonexistantId } = require('./users_util')

beforeEach(async () => {
  await User.deleteMany({})
})

describe('GET /api/users', () => {
  test('gets a user from the database', async () => {
    await new User(userTeekkari).save()

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

  test('allows missing name to be saved', async () => {
    const user = { username: 'anonymous', password: 'password1234' }
    await api.post('/api/users').send(user).expect(201)
  })

  test('requests fail with status 400 on faulty inputs', async () => {
    let faultyUser = { ...userTeekkari, username: 'a' }
    await api.post('/api/users').send(faultyUser).expect(400)

    faultyUser = { ...userTeekkari, username: '!"%!%&!=&' }
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

  test('user creation fails with duplicate username', async () => {
    await api.post('/api/users').send(userTeekkari).expect(201)
    const duplicate = { ...userTeekkari, name: 'Tero Teekkari' }
    await api.post('/api/users').send(duplicate).expect(400)

    const databaseEnd = await User.find({})
    expect(databaseEnd.length).toBe(1)
  })
})

describe('DELETE /api/users', () => {
  test('responds with 404 to nonexisting user id', async () => {
    const wrongId = await getNonexistantId()
    await api.delete(`/api/users/${wrongId}`).expect(404)
  })

  test('correctly removes a user from database', async () => {
    const savedUser = await new User(userTeekkari).save()

    await api.delete(`/api/users/${savedUser._id}`).expect(204)

    const users = await User.find({})
    expect(users.length).toBe(0)
  })
})
