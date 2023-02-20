import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notification: "",
    timeout: 0,
  },
  reducers: {
    setNotification: (state, action) => {
        console.log(action)
      state.notification = action.payload[0]
      state.timeout = action.payload[1]
    },
    removeNotification: (state) => {
      state.notification = ""
      state.timeout = 0
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const addNotification = (notification, timeout) => {
    return (dispatch) => {
        console.log(timeout)
      dispatch(notificationSlice.actions.setNotification([notification, timeout]));
      setTimeout(() => {
        dispatch(removeNotification())
      }, timeout * 1000)
    }
  }

export default notificationSlice.reducer