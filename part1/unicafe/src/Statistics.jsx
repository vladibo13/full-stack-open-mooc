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
            <StatisticLine text='good' value={good} />                        
            <StatisticLine text='neutral' value={neutral} />            
            <StatisticLine text='bad' value={bad} />  
            <StatisticLine text='all' value={all} />
            <StatisticLine text='average' value={average.toFixed(2)} /> 
            <StatisticLine text='positive' value={positive + '%'} />  
        </tbody>
    </table>
  )
}

export default Statistics