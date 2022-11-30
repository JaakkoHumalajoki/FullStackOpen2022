const dummy = (_blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) return null
  if (blogs.length === 1) return blogs[0]

  const favBlog = blogs.reduce((fav, blog) => {
    if (fav.likes < blog.likes) {
      return blog
    } else {
      return fav
    }
  }, blogs[0])

  return favBlog
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}
