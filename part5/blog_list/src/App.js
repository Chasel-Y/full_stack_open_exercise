import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { ErrorMessage, NotificationMessage } from './components/Message'
import { CreateBlogForm } from './components/CreateBlogForm'
import { LoginForm } from './components/LoginForm'
import { Togglabel } from './components/Togglabel'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Error: wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setNotificationMessage(`${user.name} logged out.`)
    setUser(null)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const blogFormRef = useRef()

  const handleCreateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      const userId = returnedBlog.user
      returnedBlog.user = {
        username: user.username,
        name: user.name,
        id: userId
      }
      setBlogs(blogs.concat(returnedBlog))
      blogFormRef.current.toggleVisibility()
      setNotificationMessage(`a new blog ${returnedBlog.title} added by ${returnedBlog.author}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Error: cannot create blog, please relogin and try again.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogLike = async (blog) => {
    const updateBlog={
      user: blog.user.id,
      likes: blog.likes + 1,

      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    try {
      const returnedBlog = await blogService.update(blog.id, updateBlog)
      returnedBlog.user = blog.user
      returnedBlog.id = blog.id
      const updatedBlogs = blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog)
      setNotificationMessage(`${blog.title} get a like from ${user.name}`)
      setBlogs(updatedBlogs)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Error: cannot like blog, please relogin and try again.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${user.name}`)) {
      try {
        await blogService.remove(blog.id)
        const updatedBlogs = blogs.filter(initialBlog => initialBlog.id !== blog.id)
        setNotificationMessage(`${blog.title} removed by ${user.name}`)
        setBlogs(updatedBlogs)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      } catch (exception) {
        setErrorMessage('Error: cannot remove blog, please relogin and try again.')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }
  return (
    <div>
      <h2>blogs</h2>
      <NotificationMessage message={notificationMessage} />
      <ErrorMessage message={errorMessage} />
      {!user &&
        <Togglabel buttonLabel='log in' closeLabel='cancel'>
          <LoginForm
            handleLogin={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
        </Togglabel>
      }
      {user &&
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p>{user.name} logged in</p>
            <button style={{ margin: '0 0 0 10px' }} onClick={handleLogout}>logout</button>
          </div>
          <div>
            <Togglabel buttonLabel='create blog' closeLabel='cancel' ref={blogFormRef}>
              <CreateBlogForm handleCreateBlog={handleCreateBlog}/>
            </Togglabel>
          </div>
        </div>
      }
      <ul>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} user={user} handleBlogLike={handleBlogLike} handleDeleteBlog={handleDeleteBlog}/>
        )}
      </ul>
    </div>
  )
}

export default App