


const App = () => {

  const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }
  const Content = (props) => {
    return (
      <div>
        <Part name={part1} exercises={exercises1} />
        <Part name={part2} exercises={exercises2} />
        <Part name={part3} exercises={exercises3} />
      </div>
    )
  }
  const Total = (props) => {
    return (
      <div>
        <p>Number of exercises {props.eka+props.toka+props.kolmas}</p>
      </div>
    )
  }
  const Part = (props) => {
    return (
      <div>
        {props.name} {props.exercises}
      </div>
    )
  }

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  // return (
  //   <div>
  //     <h1>{course}</h1>
  //     <p>
  //       {part1} {exercises1}
  //     </p>
  //     <p>
  //       {part2} {exercises2}
  //     </p>
  //     <p>
  //       {part3} {exercises3}
  //     </p>
  //     <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
  //   </div>
  // )
  return (
    <div>
      <Header course={course} />
      <Content/>
      <Total eka={exercises1} toka={exercises2} kolmas={exercises3} />
    </div>
  )
}

export default App