import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const ShowAnecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const anecdotesSorted = anecdotes.slice().sort((a, b) => b.votes - a.votes)
  const filter = useSelector(state => state.filter)

  return (
    <div>
    {anecdotesSorted
        .filter(
          anecdote =>
            filter === 'ALL' ||
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
        ).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() =>{ 
              dispatch(voteAnecdote(anecdote.id))
              dispatch(addNotification(anecdote.content+' voted',10))
              }}>vote</button>
          </div>
        </div>
      )}
      </div>
  )
}

export default ShowAnecdotes

