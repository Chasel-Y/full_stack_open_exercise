import { useEffect } from "react";
import blogService from "./services/blogs";
import { NotificationMessage } from "./components/Message";
import { useDispatch, useSelector } from "react-redux";
import Blogs from "./components/Blogs";
import LoginArea from "./components/LoginArea";
import Users from "./components/Users";
import User from "./components/User";
import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch
} from 'react-router-dom'
import axios from "axios";

const Home = () => (
  <div>
    <h2>blogs</h2>
    <NotificationMessage />
    <LoginArea />
    <Blogs />
  </div>
)

const UsersPage = () => (
  <div>
    <h2>blogs</h2>
    <NotificationMessage />
    <LoginArea />
    <Users />
  </div>
)

const UserPage = ({ choosedUser }) => {
  return(
    <div>
      <h2>blogs</h2>
      <NotificationMessage />
      <LoginArea />
      <User choosedUser={choosedUser}/>
    </div>
  )
}


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      dispatch({ type: "setBlogs", payload: { blogs: initialBlogs } });
    });
  }, []);

  useEffect(() => {
    axios.get("/api/users").then((response) => {
      dispatch({ type: "setUsers", payload: { users: response.data } });
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
  const users = useSelector((state) => state.users.allusers);
  const match = useMatch('/users/:id')
  const choosedUser = match
    ? users.find(user => user.id === match.params.id)
    : null

  return (
    <div>
      <Router>
        <div>
          <Link to="/">home</Link>
          <Link to="/users">users</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserPage choosedUser={choosedUser} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
