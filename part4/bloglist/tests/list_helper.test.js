const { dummy, totalLikes, favouriteBlog } = require('../utils/list_helper')

const emptyList = []

const listOfOne = [
  {
    title: 'Moby Dick',
    author: 'Hermal Melville',
    url: 'https://en.wikipedia.org/wiki/Moby-Dick',
    likes: 15,
    id: '63874affcb36b797cd196001'
  }
]

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

describe('dummy', () => {
  test('dummy returns 1', () => {
    const blogs = []

    expect(dummy(blogs)).toBe(1)
  })
})

describe('totalLikes', () => {
  test('totalLikes counts correct', () => {
    expect(totalLikes(listOfThree)).toBe(40)
  })

  test('totalLikes equals the likes of the only blog in array', () => {
    expect(totalLikes(listOfOne)).toBe(15)
  })

  test('totalLikes returns zero on empty array', () => {
    expect(totalLikes(emptyList)).toBe(0)
  })
})

describe('favouriteBlog', () => {
  test('favouriteBlog returns null on empty array', () => {
    expect(favouriteBlog(emptyList)).toBe(null)
  })
  test('favouriteBlog returns the only blog in list', () => {
    expect(favouriteBlog(listOfOne)).toEqual(listOfOne[0])
  })
  test('favouriteBlog returns the most liked blog in list', () => {
    expect(favouriteBlog(listOfThree)).toEqual(listOfThree[1])
  })
})
