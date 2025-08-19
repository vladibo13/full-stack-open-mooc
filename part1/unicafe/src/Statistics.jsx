import React from 'react'
import StatisticLine from './StatisticLine'

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const score = good * 1 + neutral * 0 + bad * -1
  const average = score / all
  const positive = (good / all) * 100

  if(all === 0) {
    return (
        <div>No feedback given</div>
    )    
  }

  return (
    <table>
        <tbody>
            <tr>
                <StatisticLine text='good' value={good} />
            </tr>
            <tr>
                <StatisticLine text='neutral' value={neutral} />
            </tr>
            <tr>
                <StatisticLine text='bad' value={bad} />
            </tr>
            <tr>
                <StatisticLine text='all' value={all} />
            </tr>
            <tr>
                <StatisticLine text='average' value={average.toFixed(2)} />
            </tr>
            <tr>
                <StatisticLine text='positive' value={positive + '%'} />
            </tr>
        </tbody>
    </table>
  )
}

export default Statistics