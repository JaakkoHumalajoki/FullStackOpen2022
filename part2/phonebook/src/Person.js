import React from "react"

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <button
        onClick={() => deletePerson(person.id)}
        style={{ marginLeft: "10px" }}
      >
        delete
      </button>
    </div>
  )
}

export default Person
