import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Anecdote = ({ text, votes }) => (
  <>
    <div>{text}</div>
    <div>has {votes} votes</div>
  </>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [mostPopular, setMostPopular] = useState(0)

  const pickRandomAnecdote = () => {
    let randNum = Math.floor(Math.random() * (anecdotes.length - 1))
    if (randNum >= selected) {
      randNum++
    }
    setSelected(randNum)
  }

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected]++
    setPoints(copy)

    if (copy[selected] > copy[mostPopular]) {
      setMostPopular(selected)
    }
  }

  return (
    <>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={points[selected]} />
      <Button handleClick={voteAnecdote} text="vote" />
      <Button handleClick={pickRandomAnecdote} text="next anecdote" />

      <Header text="Anecdote with most votes" />
      <Anecdote text={anecdotes[mostPopular]} votes={points[mostPopular]} />
    </>
  )
}

export default App
