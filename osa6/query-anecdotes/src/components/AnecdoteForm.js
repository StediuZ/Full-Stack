import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotification } from './Notification'
const AnecdoteForm = () => {
  const {setNotification} = useNotification()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError:()=>{
      setNotification('too short anecdote, minimum is five characters',5)
    }
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content })
    setNotification( content+' created',5)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default AnecdoteForm
