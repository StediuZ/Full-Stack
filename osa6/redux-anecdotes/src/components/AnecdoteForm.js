import { useDispatch } from 'react-redux'
import { createAnecdote} from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))
    dispatch(addNotification(content+' created',5))
    //const newAnecdote = await anecdoteService.createNew(content)
    //dispatch(createAnecdote(newAnecdote))
    //setTimeout(()=>{dispatch(removeNotification())},5000)
    event.target.anecdote.value = ''

  }

  return (
    <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
  )
}

export default NewAnecdote

