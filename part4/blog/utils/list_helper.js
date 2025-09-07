const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogsList) => {
    return blogsList.reduce((acc, blog) => acc + blog.likes , 0)
}

const favoriteBlog = (blogList) => {
    if(!blogList.length) return null

    return blogList.reduce((initialBlog, currentBlog) => initialBlog.likes > currentBlog.likes ? initialBlog : currentBlog)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}