import React from 'react'
import Statistic from './Statistic'

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  const average = (good - bad) / all 
  const positive = good / all * 100

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <Statistic text="good" number={good} />
          <Statistic text="neutral" number={neutral} />
          <Statistic text="bad" number={bad} />
          <Statistic text="all" number={all} />
          <Statistic text="average" number={average} />
          <Statistic text="positive" number={positive} percentage />
        </tbody>
      </table>
      
    </div>
  )
}

export default Statistics
