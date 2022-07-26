import { useState } from 'react'
// oikea paikka komponentin määrittelyyn
const Statistics = (props) => {
  const all = props.good+props.neutral+props.bad
  const average = (props.good-props.bad)/all
  const positive = (props.good/all)*100
  if (all==0) {
    return(
      <h1>No feedback given</h1>
    )
  } else {
    return(
      <div>
      <h1>statistics</h1>
      <table>
      <StatisticLine text={"good"} value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value ={average} />
      <StatisticLine text="positive" value ={positive} />
      </table>
      </div>
    )
  } 
}

const StatisticLine = (props) => {
  return(
  <thead>
  <tr><td>{props.text}</td><td>{props.value}</td></tr>
  </thead>
  )
} 

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>
      good
    </button>
    <button onClick={() => setNeutral(neutral + 1)}>
      neutral
    </button>
    <button onClick={() => setBad(bad + 1)}>
      bad
    </button>
    <Statistics good={good} neutral = {neutral} bad={bad}  />
    </div>
  )
  }
export default App