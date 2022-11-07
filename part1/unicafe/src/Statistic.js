import React from 'react'

const Statistic = ({ text, number, percentage = false }) => {
  if (percentage) {
    return (
      <tr>
        <td>{text}</td><td>{number} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{text}</td><td>{number}</td>
    </tr>
  )
}

export default Statistic
