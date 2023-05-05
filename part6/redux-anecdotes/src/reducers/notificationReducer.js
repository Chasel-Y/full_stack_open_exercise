import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    giveNotification(state, action){
      return action.payload
    },
    removeNotification(state, action){
      return ''
    }
  }
})

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(giveNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export const { giveNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer