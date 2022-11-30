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

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return null

  const blogsByAuthor = {}

  blogs.forEach((blog) => {
    const author = blog.author
    if (!author) return
    if (!blogsByAuthor[author]) blogsByAuthor[author] = 0
    blogsByAuthor[author] += 1
  })

  const authors = Object.keys(blogsByAuthor)
  // In case list has no defined authors
  if (authors.length === 0) return null

  let topBlogger = authors[0]
  let topBlogCount = blogsByAuthor[topBlogger]

  authors.forEach((author) => {
    const authorBlogCount = blogsByAuthor[author]
    if (authorBlogCount > topBlogCount) {
      topBlogger = author
      topBlogCount = authorBlogCount
    }
  })

  return { author: topBlogger, blogs: topBlogCount }
}
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}
