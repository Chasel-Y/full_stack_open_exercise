import { useDispatch, useSelector } from "react-redux";
import blogService from "../services/blogs";
import Comments from "./Comments";

const Blog = ({ choosedBlog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

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
      comments: blog.comments,
    };
    if(user){
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
    } else {
      dispatch({
        type: "setError",
        payload: {
          content: "Error: cannot like blog, please login and try again.",
        },
      });
      setTimeout(() => {
        dispatch({ type: "notificationClear" });
      }, 5000);
    }
  };

  if (!choosedBlog) {
    return null;
  }
  return (
    <div className="container">
      <div className="columns">
        <div className="column has-background-info-light custom-column">
          <p><strong>{choosedBlog.title} - {choosedBlog.author}</strong></p>
        </div>
      </div>
      <div className="columns mt-4">
        <div className="column has-background-info-light custom-column">
          <div>
            <a href={choosedBlog.url} >{choosedBlog.url}</a>
          </div>
          <div className="flex-container">
            <p className="mr-2" >{choosedBlog.likes}{" "}likes</p>
            <button onClick={() => handleBlogLike(choosedBlog, user) } id="likeButton" className="button is-danger is-small is-rounded">
              <strong>like</strong>
            </button>
          </div>
          <br></br>
          <div>
            {user && choosedBlog.user.id === user.id && (
              <button onClick={() => handleDeleteBlog(choosedBlog, user)} className="button is-warning is-small is-rounded">
                <strong>Delete</strong>
              </button>
            )}
            <p>added by {choosedBlog.user.username}</p>
          </div>
        </div>
      </div>
      <Comments choosedBlog={choosedBlog} />
    </div>
  );
}

export default Blog;