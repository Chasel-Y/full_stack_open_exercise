import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

const NavigationMenu = () => {
  const user = useSelector((state) => state.users.user);
  const padding = {
    padding: 5
  }
  const dispatch = useDispatch();

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
  const navigationMenuStyle = {
    backgroundColor: "lightgrey",
    padding: 10,
    margin: "0 0 10px 0",
  };
  return (
    <div style={navigationMenuStyle}>
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/users">users</Link>
      {user
        ? <em> {user.username} logged in</em>
        : <Link style={padding} to="/login">login</Link>
      }
      {user
        ? <button style={{ margin: "0 0 0 10px" }} onClick={handleLogout}>
            logout
        </button>
        : null}
    </div>
  );
};

export default NavigationMenu;