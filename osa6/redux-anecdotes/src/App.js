import { useEffect } from 'react'
import NewAnecdote from './components/AnecdoteForm'
import ShowAnecdotes from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes()) 
  }, [dispatch]) 
  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <ShowAnecdotes/>
      <Filter/>
      <h2>create new</h2>
      <NewAnecdote/>
    </div>
  )
}

export default App