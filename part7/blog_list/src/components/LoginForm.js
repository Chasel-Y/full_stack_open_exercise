import PropTypes from "prop-types";

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <div className="container">
        <div className="columns">
          <div className="column has-background-info-light custom-column">
            <h3 className="subtitle is-3">Log in to application</h3>
            <form onSubmit={handleLogin}>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    type="text"
                    value={username}
                    id="username"
                    onChange={handleUsernameChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    value={password}
                    id="password"
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>

              <button type="submit" id="login-button" className="button is-info">
                login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export { LoginForm };
