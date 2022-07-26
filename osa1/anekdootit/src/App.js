import { useState } from 'react'
const points = new Uint8Array(8)
let max = 0;
let maxIndex = 0; 
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  
  
  const [selected, setSelected] = useState(0)
  
  const copy = [...points]
  max = Math.max(...copy)
  maxIndex = points.indexOf(Math.max(...copy))

  return (
    
    <div>
      <h1>anecdote of the day</h1>
      {anecdotes[selected]}
      <p></p>
      <button onClick={() => setSelected(Math.floor(Math.random() * 7))}>
      next anecdote
      </button>
      <button onClick={() => points[selected]+=1}>
      vote
      </button>
      <p>has {points[selected]} votes</p>
      <h1>anecdote with most votes</h1>
      {anecdotes[maxIndex]}
      <p>with {points[maxIndex]} votes</p>
    </div>
  )
}

export default App