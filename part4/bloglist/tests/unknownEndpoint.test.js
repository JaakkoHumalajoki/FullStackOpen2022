const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('unknownEndpoint', () => {
  test('should return status 404', async () => {
    await api.get('/nonsensicalAddress').expect(404)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
