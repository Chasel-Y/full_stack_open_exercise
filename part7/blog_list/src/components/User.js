
const User = ({ choosedUser }) => {
  if (!choosedUser) {
    return null;
  } else {
    return (
      <div>
        <h2>{choosedUser.username}</h2>
        <h3>added blogs</h3>
        <ul>
          {choosedUser.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default User;