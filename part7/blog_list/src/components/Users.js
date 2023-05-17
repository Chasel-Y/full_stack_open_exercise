import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";

const Users = () => {
  const allUsers = useSelector((state) => state.users.allusers);
  return(
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}

export default Users;