const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>{props.info.name} {props.info.exercises}</p>
)

const Content = (props) => (
  <>
    <Part info={props.parts[0]} />
    <Part info={props.parts[1]} />
    <Part info={props.parts[2]} />
  </>
)

const Total = (props) => {
  const parts = props.parts
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises
  return (
    <p>Number of exercises {total}</p>
  )
}

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

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default App
