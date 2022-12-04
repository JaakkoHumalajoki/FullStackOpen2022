const Blog = require('../models/blog')

const blogMobyDick = {
  title: 'Moby Dick',
  author: 'Hermal Melville',
  url: 'https://en.wikipedia.org/wiki/Moby-Dick',
  likes: 15
}

const blogArtOfWar = {
  title: 'The Art of War',
  author: 'Sun Tzu',
  url: 'https://en.wikipedia.org/wiki/The_Art_of_War',
  likes: 4
}

const listOfThreeBlogs = [
  {
    title: 'Moby Dick',
    author: 'Hermal Melville',
    url: 'https://en.wikipedia.org/wiki/Moby-Dick',
    likes: 15
  },
  {
    title: 'Don QuiXote',
    author: 'Miguel de Cervantes',
    url: 'https://en.wikipedia.org/wiki/Don_Quixote',
    likes: 21
  },
  {
    title: 'The Art of War',
    author: 'Sun Tzu',
    url: 'https://en.wikipedia.org/wiki/The_Art_of_War',
    likes: 4
  }
]

const getNonexistantId = async () => {
  const blog = new Blog(blogMobyDick)
  await blog.save()
  await blog.remove()
  return blog._id
}

module.exports = { listOfThreeBlogs, blogMobyDick, blogArtOfWar, getNonexistantId }
