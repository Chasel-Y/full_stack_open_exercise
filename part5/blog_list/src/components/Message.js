const NotificationMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="inform">
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export { ErrorMessage, NotificationMessage }