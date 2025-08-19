import React from 'react'

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const score = good * 1 + neutral * 0 + bad * -1
  const average = score / all
  const positive = (good / all) * 100
//   const positive = 
  return (
    <div>
        <h5>Statistics</h5>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {average}</p>
        <p>positive {positive}</p>
    </div>
  )
}

export default Statistics