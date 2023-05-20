import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

const NavigationMenu = () => {
  const user = useSelector((state) => state.users.user);
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
  return(
    <nav className="navbar is-info" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link style={{ padding: '0 1rem', fontSize: '1.5rem' }} to="/" className="navbar-item">Home</Link>
          <Link style={{ padding: '0 1rem', fontSize: '1.5rem' }} to="/users" className="navbar-item">Users</Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {user
                ? <em style={{ padding: '0 1rem', fontSize: '1.2rem' }} className="mr-2">{user.username} logged in</em>
                : <Link to="/login" className="button is-primary">Login</Link>
              }
              {user
                ? <button className="button is-warning is-small is-rounded" style={{ padding: '0 1rem', fontSize: '1.0rem' }}onClick={handleLogout}>
                  <strong>Logout</strong>
                </button>
                : null}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
};

export default NavigationMenu;