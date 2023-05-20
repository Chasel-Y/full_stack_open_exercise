import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { LoginForm } from "./LoginForm";
import loginService from "../services/login"
import blogService from "../services/blogs";

const LoginArea = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate()

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
      navigate('/')
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

  if (user === null) {
    return(
      <LoginForm
        handleLogin={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
      />
    )
  } else{
    return(
      <div className="flex-container">
        <p className="mr-2">{user.username} logged in</p>
        <button className="button is-warning" onClick={handleLogout}>
          logout
        </button>
      </div>
    )
  }
}

export default LoginArea;