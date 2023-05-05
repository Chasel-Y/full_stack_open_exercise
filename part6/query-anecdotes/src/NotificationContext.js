import { createContext, useReducer } from 'react'

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
        return `anecdote '${action.payload}' created`
    case "VOTE":
        return `anecdote '${action.payload.content}' voted`
    case "ERROR":
        return action.payload
    case "CLEAR":
        return ''
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(NotificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext