import { useState } from 'react'

const Blog = ({ blog, user, handleBlogLike, handleDeleteBlog }) => {
  const [viewDetails, setViewDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return(
    <div style = {blogStyle} className='blog'>
      <div>
        <li>
          {blog.title} - {blog.author}
          <button onClick={
            () => {
              setViewDetails(!viewDetails)
            }
          } id='viewButton'>{viewDetails? 'hide':'view'}</button>
        </li>
      </div>
      <div style={{ display: (viewDetails? '': 'none') }} className='urlAndLike' >
        {blog.url}
        <br></br>
        likes {blog.likes} <button onClick={() => handleBlogLike(blog)} id='likeButton'>like</button>
        <br></br>
        {user && blog.user.name}
        <br></br>
        {user && (blog.user.id === user.id) &&
        <button onClick={() => handleDeleteBlog(blog)}>remove</button>}
      </div>
    </div>
  )
}

export default Blog