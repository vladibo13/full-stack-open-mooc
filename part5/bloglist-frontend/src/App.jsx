import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs) 
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return(
      <div>
        <h3>log in to application</h3>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>        
      </div>
    )
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loggedTitle = () => {
    return(
      <div>
        <b>{user.name} is logged in </b>
        <button onClick={logOut}>logg out</button>
      </div>
    )
  }

  const handleAddBlog = async (blog) => {
    console.log('New blog added:', blog)
    // here you can call an API to save it, etc.
    try {
      const savedBlog = await blogService.create(blog)
      setBlogs([...blogs, savedBlog])
      console.log(savedBlog)
      setErrorMessage('Blog created successfully!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage('Failed to create blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
   
  }

  // const createBlog = () => {
  //   return (

  //   )
  // }

  if(user === null) {
    return (
      <>
        {errorMessage}
        {loginForm()}
      </>      
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <BlogForm onAddBlog={handleAddBlog}/>
      {errorMessage}
      {loggedTitle()}
      {blogs.map(blog => <>
        <Blog key={blog.id} blog={blog} />
        </>
      )}
    </div>
  )
}

export default App