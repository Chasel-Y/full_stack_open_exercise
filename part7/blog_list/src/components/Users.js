import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";

const Users = () => {
  const allUsers = useSelector((state) => state.users.allusers);
  return(
    <div className="container">
      <div className="columns">
        <div className="column has-background-info-light custom-column">
          <h2 className="subtitle is-2">Users</h2>
          <table className="table is-striped">
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
      </div>
    </div>
  )

}

export default Users;