import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { Togglabel } from "./Togglabel";
import { LoginForm } from "./LoginForm";
import { CreateBlogForm } from "./CreateBlogForm";
import loginService from "../services/login"
import blogService from "../services/blogs";

const LoginArea = () => {
  const blogFormRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch({ type: "setUser", payload: { user: user } });
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch({
        type: "setError",
        payload: { content: "Error: wrong username or password" },
      });
      setTimeout(() => {
        dispatch({ type: "notificationClear" });
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch({
      type: "setNotification",
      payload: { content: `${user.name} logged out.` },
    });
    dispatch({ type: "userClear" });
    setTimeout(() => {
      dispatch({ type: "notificationClear" });
    }, 5000);
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
    return(
      <Togglabel buttonLabel="log in" closeLabel="cancel">
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      </Togglabel>
    )
  } else{
    return(
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>{user.name} logged in</p>
          <button style={{ margin: "0 0 0 10px" }} onClick={handleLogout}>
            logout
          </button>
        </div>
        <div>
          <Togglabel
            buttonLabel="create blog"
            closeLabel="cancel"
            ref={blogFormRef}
          >
            <CreateBlogForm handleCreateBlog={handleCreateBlog} />
          </Togglabel>
        </div>
      </div>
    )
  }
}

export default LoginArea;