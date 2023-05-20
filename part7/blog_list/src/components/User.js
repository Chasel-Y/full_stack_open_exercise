
const User = ({ choosedUser }) => {
  if (!choosedUser) {
    return null;
  } else {
    return (
      <div className="container">
        <div className="columns">
          <div className="column has-background-info-light custom-column">
            <h2 className="subtitle is-2">{choosedUser.username}</h2>
            <br></br>
            <h3 className="subtitle is-3">added blogs</h3>
            <ul className="bulma-list custom-list">
              {choosedUser.blogs.map((blog) => (
                <li key={blog.id}>{blog.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default User;