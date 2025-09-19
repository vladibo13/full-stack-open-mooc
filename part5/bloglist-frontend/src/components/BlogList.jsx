import React from 'react'
import Blog from './Blog'

const BlogList = ({blogs, handleLike, handleDelete}) => {
  return (
    <div>
     {blogs
     .slice()
     .sort((a, b) => b.likes - a.likes)
     .map(blog => <Blog 
      key={blog.id} 
      blog={blog} 
      handleLike={handleLike}
      handleDelete={handleDelete}
      />)}
    </div>
  )
}

export default BlogList