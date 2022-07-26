


//const App = () => {

  // const Header = (props) => {
  //   console.log(props)
  //   return (
  //     <div>
  //       <h1>{props.course}</h1>
  //     </div>
  //   )
  // }
  // const Content = (props) => {
  //   return (
  //     <div>
  //       <Part name={part1} exercises={exercises1} />
  //       <Part name={part2} exercises={exercises2} />
  //       <Part name={part3} exercises={exercises3} />
  //     </div>
  //   )
  // }
  // const Total = (props) => {
  //   return (
  //     <div>
  //       <p>Number of exercises {props.eka+props.toka+props.kolmas}</p>
  //     </div>
  //   )
  // }
  // const Part = (props) => {
  //   return (
  //     <div>
  //       {props.name} {props.exercises}
  //     </div>
  //   )
  // }

  // const course = 'Half Stack application development'
  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14
  const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ]
    }
    const Header = (props) => {
     return (
       <div>
         <h1>{props.course.name}</h1>
       </div>
     )
   }
    const Content = (props) => {
       return (
         <div>
           <p>{props.parts[0].name} {props.parts[0].exercises}</p>
           <p>{props.parts[1].name} {props.parts[1].exercises}</p>
           <p>{props.parts[2].name} {props.parts[2].exercises}</p>
           
           
         </div>
       )
     }
    // const Part = (props) => {
    //  return (
    //    <div>
    //      {props.part.name} {props.part.exercises}
    //    </div>
    //  )
    // }
    const Total = (props) => {
     return (
       <div>
         <p>Number of exercises {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}</p>
       </div>
     )
   }
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  //}
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
  // return (
  //   <div>
  //     <Header course={course} />
  //     <Content/>
  //     <Total eka={exercises1} toka={exercises2} kolmas={exercises3} />
  //   </div>
  // )
}

export default App