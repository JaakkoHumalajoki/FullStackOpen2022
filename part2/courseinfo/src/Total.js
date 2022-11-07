import React from 'react'

const Total = ({ parts }) => {
  const total = parts.reduce((sum, value) => sum + value.exercises, 0)

  return (
    <p style={{ fontWeight: "bold" }}>
      total of {total} exercises
    </p>
  )
}

export default Total
