import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Display = ({ label, value, unit }) => {
  if (unit) {
    return (
      <div>{label} {value} {unit}</div>
    )
  }
  return (
    <div>{label} {value}</div>
  )
}

const Statistics = ({ good, neutral, bad }) => (
  <>
    <Display label="good" value={good} />
    <Display label="neutral" value={neutral} />
    <Display label="bad" value={bad} />
    <Display label="all" value={good + neutral + bad} />
    <Display label="average" value={(good - bad) / (good + neutral + bad)} />
    <Display label="positive"
             value={good / (good + neutral + bad) * 100}
             unit="%" />
  </>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
