import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import blogService from "../services/blogs";

const Blogs = () => {
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const handleDeleteBlog = async (blog, user) => {
    if (window.confirm(`Remove blog ${blog.title} by ${user.name}`)) {
      try {
        await blogService.remove(blog.id);
        dispatch({ type: "deleteBlog", payload: { blog: blog } });
        dispatch({
          type: "setNotification",
          payload: { content: `${blog.title} removed by ${user.name}` },
        });
        setTimeout(() => {
          dispatch({ type: "notificationClear" });
        }, 5000);
      } catch (exception) {
        dispatch({
          type: "setError",
          payload: {
            content: "Error: cannot remove blog, please relogin and try again.",
          },
        });
        setTimeout(() => {
          dispatch({ type: "notificationClear" });
        }, 5000);
      }
    }
  };

  const handleBlogLike = async (blog, user) => {
    const updateBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    try {
      const returnedBlog = await blogService.update(blog.id, updateBlog);
      returnedBlog.user = blog.user;
      returnedBlog.id = blog.id;
      dispatch({ type: "updateBlog", payload: { blog: returnedBlog } });
      dispatch({
        type: "setNotification",
        payload: {
          content: `${returnedBlog.title} get a like from ${user.name}`,
        },
      });
      setTimeout(() => {
        dispatch({ type: "notificationClear" });
      }, 5000);
    } catch (exception) {
      dispatch({
        type: "setError",
        payload: {
          content: "Error: cannot like blog, please relogin and try again.",
        },
      });
      setTimeout(() => {
        dispatch({ type: "notificationClear" });
      }, 5000);
    }
  };

  return(
    <ul>
      {blogs.sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleBlogLike={handleBlogLike}
            handleDeleteBlog={handleDeleteBlog}
          />
        ))
      }
    </ul>
  )
}

const Blog = ({ blog, user, handleBlogLike, handleDeleteBlog }) => {
  const [viewDetails, setViewDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle} className="blog">
      <div>
        <li>
          {blog.title} - {blog.author}
          <button
            onClick={() => {
              setViewDetails(!viewDetails);
            }}
            id="viewButton"
          >
            {viewDetails ? "hide" : "view"}
          </button>
        </li>
      </div>
      <div
        style={{ display: viewDetails ? "" : "none" }}
        className="urlAndLike"
      >
        {blog.url}
        <br></br>
        likes {blog.likes}{" "}
        <button onClick={() => handleBlogLike(blog, user)} id="likeButton">
          like
        </button>
        <br></br>
        {user && blog.user.name}
        <br></br>
        {user && blog.user.id === user.id && (
          <button onClick={() => handleDeleteBlog(blog, user)}>remove</button>
        )}
      </div>
    </div>
  );
};


export default Blogs