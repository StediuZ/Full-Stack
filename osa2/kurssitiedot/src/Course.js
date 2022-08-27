const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <h3>Number of exercises {sum}</h3>

const Part = ({ part }) =>{
  console.log(part)
  return(
  <p>
    {part.name} {part.exercises}
  </p>
  )
}
const Content = ({ parts }) => {
  return(
  parts.map(osa => <Part part={osa}/>)
  )
  }


    
const Course = ({course}) => {
  const total = course.parts.reduce( (s, p) => {
    return s +p.exercises;
  },0)
	return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={total} />
      </>
  )
}
export default Course