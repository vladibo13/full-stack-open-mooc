import React, { useState } from 'react'

const BlogForm = ({ onAddBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Call parent handler with form data
    onAddBlog({
      title,
      author,
      url,
    })

    // Reset fields
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit} className="blog-form">
      <div>
        <label>Title</label><br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          required
        />
      </div>

      <div>
        <label>Author</label><br />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author name"
          required
        />
      </div>

      <div>
        <label>URL</label><br />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter blog URL"
        />
      </div>

      <button type="submit">Add Blog</button>
    </form>
  )
}

export default BlogForm
