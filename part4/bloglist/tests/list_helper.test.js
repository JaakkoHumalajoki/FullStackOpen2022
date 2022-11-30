const { dummy, totalLikes } = require('../utils/list_helper')

describe('dummy', () => {
  test('dummy returns 1', () => {
    const blogs = []

    expect(dummy(blogs)).toBe(1)
  })
})

describe('totalLikes', () => {
  const listOfThree = [
    {
      title: 'Moby Dick',
      author: 'Hermal Melville',
      url: 'https://en.wikipedia.org/wiki/Moby-Dick',
      likes: 15,
      id: '63874affcb36b797cd196001'
    },
    {
      title: 'Don QuiXote',
      author: 'Miguel de Cervantes',
      url: 'https://en.wikipedia.org/wiki/Don_Quixote',
      likes: 21,
      id: '63874affcb36b797cd196002'
    },
    {
      title: 'The Art of War',
      author: 'Sun Tzu',
      url: 'https://en.wikipedia.org/wiki/The_Art_of_War',
      likes: 4,
      id: '63874affcb36b797cd196003'
    }
  ]

  test('totalLikes counts correct', () => {
    expect(totalLikes(listOfThree)).toBe(40)
  })

  test('totalLikes returns zero on empty array', () => {
    expect(totalLikes([])).toBe(0)
  })
})