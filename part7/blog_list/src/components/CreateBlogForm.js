import { useState, useRef } from "react";
import { Togglabel } from "./Togglabel";
import { useDispatch, useSelector } from "react-redux";
import blogService from "../services/blogs";

const CreateBlogForm = ( ) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const blogFormRef = useRef();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };
    await handleCreateBlog(blogObject);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const handleCreateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      const userId = returnedBlog.user;
      returnedBlog.user = {
        username: user.username,
        name: user.name,
        id: userId,
      };
      dispatch({ type: "createBlog", payload: { blog: returnedBlog } });
      blogFormRef.current.toggleVisibility();
      dispatch({
        type: "setNotification",
        payload: {
          content: `a new blog ${returnedBlog.title} added by ${returnedBlog.author}`,
        },
      });
      setTimeout(() => {
        dispatch({ type: "notificationClear" });
      }, 5000);
    } catch (exception) {
      dispatch({
        type: "setError",
        payload: {
          content: "Error: cannot create blog, please relogin and try again.",
        },
      });
      setTimeout(() => {
        dispatch({ type: "notificationClear" });
      }, 5000);
    }
  };
  if (user === null) {
    return null;
  } else{
    return (
      <div className="container">
        <div className="columns">
          <div className="column has-background-info-light custom-column">
            <Togglabel
              buttonLabel="Create Blog"
              closeLabel="Cancel"
              ref={blogFormRef}
            >
              <div>
                <form onSubmit={handleSubmit}>
                  <h2 className="subtitle is-2">create new</h2>
                  <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                      <input
                        type="text"
                        value={title}
                        name="title"
                        id="title"
                        onChange={({ target }) => setTitle(target.value)}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Author</label>
                    <div className="control">
                      <input
                        type="text"
                        value={author}
                        name="author"
                        id="author"
                        onChange={({ target }) => setAuthor(target.value)}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Url</label>
                    <div className="control">
                      <input
                        type="text"
                        value={url}
                        name="url"
                        id="url"
                        onChange={({ target }) => setUrl(target.value)}
                      />
                    </div>
                  </div>

                  <button type="submit" id="blogSubmit" className="button is-info">
                    Create
                  </button>
                </form>
              </div>
            </Togglabel>
          </div>
        </div>
      </div>
    );
  }
};

export { CreateBlogForm };
