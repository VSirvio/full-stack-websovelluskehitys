const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ info }) => <p>{info.name} {info.exercises}</p>

const Content = ({ parts }) => (
  <>
    {parts.map(part =>
      <Part key={part.id} info={part} />
    )}
  </>
)

const Course = ({ course }) => (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App
