const {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
} = require('../utils/list_helper')

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

const longListWithDuplicates = [
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
  },
  {
    title: 'Moby Dick',
    author: 'Hermal Melville',
    url: 'https://en.wikipedia.org/wiki/Moby-Dick',
    likes: 15,
    id: '63874affcb36b797cd196001'
  },
  {
    title: 'The Art of War',
    author: 'Sun Tzu',
    url: 'https://en.wikipedia.org/wiki/The_Art_of_War',
    likes: 4,
    id: '63874affcb36b797cd196003'
  },
  {
    title: 'The Art of War',
    author: 'Sun Tzu',
    url: 'https://en.wikipedia.org/wiki/The_Art_of_War',
    likes: 4,
    id: '63874affcb36b797cd196003'
  }
]

const listWithMissingAuthors = [
  {
    title: 'Moby Dick',
    url: 'https://en.wikipedia.org/wiki/Moby-Dick',
    likes: 15,
    id: '63874affcb36b797cd196001'
  },
  {
    title: 'Don QuiXote',
    url: 'https://en.wikipedia.org/wiki/Don_Quixote',
    likes: 21,
    id: '63874affcb36b797cd196002'
  },
  {
    title: 'The Art of War',
    url: 'https://en.wikipedia.org/wiki/The_Art_of_War',
    likes: 4,
    id: '63874affcb36b797cd196003'
  }
]

describe('dummy', () => {
  test('always returns 1', () => {
    const blogs = []

    expect(dummy(blogs)).toBe(1)
  })
})

describe('totalLikes', () => {
  test('counts correct', () => {
    expect(totalLikes(listOfThree)).toBe(40)
  })

  test('equals the likes of the only blog in array', () => {
    expect(totalLikes(listOfOne)).toBe(15)
  })

  test('returns zero on empty array', () => {
    expect(totalLikes(emptyList)).toBe(0)
  })
})

describe('favouriteBlog', () => {
  test('returns null on empty array', () => {
    expect(favouriteBlog(emptyList)).toBe(null)
  })
  test('returns the only blog in list', () => {
    expect(favouriteBlog(listOfOne)).toEqual(listOfOne[0])
  })
  test('returns the most liked blog in list', () => {
    expect(favouriteBlog(listOfThree)).toEqual(listOfThree[1])
  })
})

describe('mostBlogs', () => {
  test('returns null on empty list', () => {
    expect(mostBlogs(emptyList)).toBe(null)
  })
  test('returns the author of single item list', () => {
    expect(mostBlogs(listOfOne)).toEqual({ author: 'Hermal Melville', blogs: 1 })
  })
  test('returns the author with most blogs', () => {
    expect(mostBlogs(longListWithDuplicates)).toEqual({ author: 'Sun Tzu', blogs: 3 })
  })
  test('returns null if all author names missing', () => {
    expect(mostBlogs(listWithMissingAuthors)).toEqual(null)
  })
})
