import { useState } from "react"
import Togglable from "./Togglable"

const Blog = ({ blog, user }) => {
  const [view, setView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleView = () => setView(!view)

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
              <li>likes: {blog.likes}</li>
            </ul>
            <button onClick={handleView}>hide</button>
          </div>  
         )}
        

      </div> 
  )
}
  
 


export default Blog