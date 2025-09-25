import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      console.log(action.payload)
      return action.payload
    },
    clearNotification(state) {
      return ''
    }
  }
})

export const setNotification = (message, timer) => {
  return async dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timer * 1000)
  }
}
export const { showNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer