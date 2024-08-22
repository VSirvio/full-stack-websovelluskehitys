import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad > 0) {
    return (
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{good + neutral + bad}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{(good - bad) / (good + neutral + bad)}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{good / (good + neutral + bad) * 100} %</td>
          </tr>
        </tbody>
      </table>
    )
  }
  return <>No feedback given</>
}

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
