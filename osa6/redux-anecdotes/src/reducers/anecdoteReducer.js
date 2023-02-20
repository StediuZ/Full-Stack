import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'
/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}*/


//const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      return state.map(anecdote => {
        if (anecdote.id !== action.payload) {
          return anecdote
        }
        return {
        ...anecdote,
        votes: anecdote.votes + 1
        }
      })
    },
    appendAnecdote(state, action) {
    state.push(action.payload)
    },
    setAnecdotes(state, action) {
    return action.payload
    }
  },
})
  
  export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
  
  export const initializeAnecdotes = () => {
    return async dispatch => {
      const anecdotes = await anecdoteService.getAll()
      dispatch(setAnecdotes(anecdotes))
    }
  }
  
  export const createAnecdote = (content) => {
    return async dispatch => {
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(appendAnecdote(newAnecdote))
    }
  }
  
  export const voteAnecdote = (id) => {
    return async dispatch => {
      await anecdoteService.voteFor(id)
      dispatch(vote(id))
    }
  }
  
  export default anecdoteSlice.reducer
  
  
  
  
/*const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const anecdoteToChange = state.find(anecdote => anecdote.id === action.id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== action.id ? anecdote : changedAnecdote
      )
    case 'CREATE':
      const anecdote = asObject(action.content)
      return [...state,anecdote]
    default:
      return state
  }
}
export default reducer

export const vote = (id) => {
  console.log('vote', id)
  return{
    type:'VOTE',
    id:id
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'CREATE',
    content: content
  }
}

createAnecdote: (state, action) => {
      //const newAnecdote = asObject(action.payload)
      //return [...state, newAnecdote]
      state.push(action.payload)
    },
*/