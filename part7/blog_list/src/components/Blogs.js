import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  return(
    <div className="container mt-4">
      <div className="columns">
        <div className="column has-background-info-light custom-column">
          <ul className="bulma-list custom-list">
            {blogs.sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <li key={blog.id}>
                  <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}


export default Blogs