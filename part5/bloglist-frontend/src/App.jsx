import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFromRef = useRef()

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
    try {
      blogFromRef.current.toggleVisibility()
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

  if(user === null) {
    return (
      <>
        {errorMessage}
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUserName={({ target }) => setUsername(target.value)}
          handlePassword={({ target }) => setPassword(target.value)}
        />
      </>      
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel="create new blog" ref={blogFromRef}>
        <BlogForm onAddBlog={handleAddBlog}/>
      </Togglable>
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