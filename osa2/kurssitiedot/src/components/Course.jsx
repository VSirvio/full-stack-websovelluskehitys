const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ info }) => <p>{info.name} {info.exercises}</p>

const Content = ({ parts }) => (
  <>
    {parts.map(part =>
      <Part key={part.id} info={part} />
    )}
  </>
)

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <b>total of {total} exercises</b>
}

const Course = ({ course }) => (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
)

export default Course
