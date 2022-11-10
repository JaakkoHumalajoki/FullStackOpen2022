import React from 'react'
import Person from './Person'

const PersonList = ({persons}) => {
  return (
    <>
      {persons.map(person => <Person person={person} key={person.id} />)}
    </>
  )
}

export default PersonList