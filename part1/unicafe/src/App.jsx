import { useState } from 'react'
import Header from './Header'
import Button from './Button'
import Statistics from './Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onGoodClick = () => {
    setGood(prev => prev + 1)
  }
  const onNeutralClick = () => {
    setNeutral(prev => prev + 1)
  }
  const onBadClick = () => {
    setBad(prev => prev + 1)
  }
  return (
    <div>
      <Header />
      <Button onClick={onGoodClick} title="good" />
      <Button onClick={onNeutralClick} title="neutral" />
      <Button onClick={onBadClick} title="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App