import React, { createContext, useContext, useReducer } from 'react'

const NotificationContext = createContext()

const initialState = {
  message: null,
  timeoutId: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.payload.message,
        timeoutId: action.payload.timeoutId
      }
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setNotification = (message, timeout) => {
    const timeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, timeout * 1000)
    dispatch({ type: 'SET_NOTIFICATION', payload: { message, timeoutId } })
  }

  return (
    <NotificationContext.Provider value={{ state, setNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

const Notification = () => {
  const { state } = useNotification()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (!state.message) return null

  return (
    <div style={style}>
      {state.message}
    </div>
  )
}

export default Notification
