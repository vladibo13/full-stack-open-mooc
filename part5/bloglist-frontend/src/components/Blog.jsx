import { useState } from "react"
import Togglable from "./Togglable"

const Blog = ({ blog, user, handleLike }) => {
  const [view, setView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleView = () => setView(prev => !prev)

  const handleOnClick = (e) => {
    e.preventDefault()
    
    const blogToUpdate = {
      user: blog.user.id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    }
    console.log('blogToUpdate = ', blogToUpdate)
    handleLike(blogToUpdate)
  }
  console.log(blog)
  return (
      <div style={blogStyle}>
        <span>{blog.title} - {blog.author}</span>
        {!view ? (
          <button onClick={handleView}>view</button>
        )
         :(
          <div>  
            <ul>
              <li>url: {blog.title}</li>
              <li>likes: {blog.likes} <button onClick={handleOnClick}>like</button></li>
            </ul>
            <button onClick={handleView}>hide</button>
          </div>  
         )}
        

      </div> 
  )
}
  
 


export default Blog