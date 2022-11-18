import React from "react"
import Person from "./Person"

const PersonList = ({ persons, deletePerson }) => {
  return (
    <>
      {persons.map((person) => (
        <Person person={person} deletePerson={deletePerson} key={person.id} />
      ))}
    </>
  )
}

export default PersonList
