import { useEffect } from "react";
import blogService from "./services/blogs";
import { NotificationMessage } from "./components/Message";
import { useDispatch, useSelector } from "react-redux";
import Blogs from "./components/Blogs";
import LoginArea from "./components/LoginArea";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import NavigationMenu from "./components/NavigationMenu";
import {
  Routes, Route, useMatch
} from 'react-router-dom'
import axios from "axios";
import { CreateBlogForm } from "./components/CreateBlogForm";

const Home = () => (
  <div className="container">
    <h1 className="title is-1">blogs</h1>
    <NotificationMessage />
    <CreateBlogForm />
    <Blogs />
  </div>
)

const UsersPage = () => (
  <div className="container">
    <h1 className="title is-1">blogs</h1>
    <NotificationMessage />
    <Users />
  </div>
)

const UserPage = ({ choosedUser }) => {
  return(
    <div className="container">
      <h1 className="title is-1">blogs</h1>
      <NotificationMessage />
      <User choosedUser={choosedUser}/>
    </div>
  )
}

const BlogPage = ({ choosedBlog }) => {
  return(
    <div className="container">
      <h1 className="title is-1">blogs</h1>
      <NotificationMessage />
      <Blog choosedBlog={choosedBlog}/>
    </div>
  )
}

const LoginPage = () => (
  <div className="container">
    <h1 className="title is-1">blogs</h1>
    <NotificationMessage />
    <LoginArea />
  </div>
)


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      dispatch({ type: "setBlogs", payload: { blogs: initialBlogs } });
    });
  }, []);

  useEffect(() => {
    axios.get("/api/users").then((response) => {
      dispatch({ type: "setAllUsers", payload: { users: response.data } });
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
  const matchUser = useMatch('/users/:id')
  const choosedUser = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const blogs = useSelector((state) => state.blogs);
  const matchBlog = useMatch('/blogs/:id')
  const choosedBlog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  return (
    <div>
      <NavigationMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserPage choosedUser={choosedUser} />} />
        <Route path="/blogs/:id" element={<BlogPage choosedBlog={choosedBlog} />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
