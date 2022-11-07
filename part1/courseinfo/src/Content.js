import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part =>
        <Part name={part.name} number={part.exercises} key={part.name} />
      )}
    </>
  )
}

export default Content
