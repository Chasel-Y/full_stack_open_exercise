import { useEffect } from "react";
import blogService from "./services/blogs";
import { NotificationMessage } from "./components/Message";
import { useDispatch } from "react-redux";
import Blogs from "./components/Blogs";
import LoginArea from "./components/LoginArea";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      dispatch({ type: "setBlogs", payload: { blogs: initialBlogs } });
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch({ type: "setUser", payload: { user: user } });
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      <NotificationMessage />
      <LoginArea />
      <Blogs />
    </div>
  );
};

export default App;
