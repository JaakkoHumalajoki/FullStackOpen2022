const { dummy } = require('../utils/list_helper')

describe('dummy', () => {
  test('dummy returns 1', () => {
    const blogs = []

    expect(dummy(blogs)).toBe(1)
  })
})
