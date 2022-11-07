import React from 'react'

const Total = ({ parts }) => {
  const total = parts.reduce((sum, value) => sum + value.exercises, 0)
  
  return (
    <p>Number of exercises {total}</p>
  )
}

export default Total
