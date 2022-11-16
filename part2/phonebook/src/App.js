import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import PersonList from './PersonList'
let idCounter = 5;

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
    .then(res => {
      if (res.status !== 200) {
        console.log("Axios error:", res)
        return
      }
      setPersons(res.data)
    })
    .catch(error => console.log("Axios error:", error))
  }, [])

  const changeNameInput = (event) => {
    setNewName(event.target.value)
  }

  const changeNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const changeFilterInput = (event) => {
    setFilter(event.target.value)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`Person named ${newName} already exists in the phonebook`)
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNumber, id: idCounter }))
    idCounter += 1
    setNewName('')
    setNewNumber('')
  }

  const personsFiltered = persons.filter(person => {
    const lowcaseName = person.name.toLowerCase()
    const lowcaseFilter = filter.toLowerCase()
    return lowcaseName.includes(lowcaseFilter)
  })

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filter} onChange={changeFilterInput} />
      <h2>Add a new</h2>
      <PersonForm 
        name={newName}
        onChangeName={changeNameInput}
        number={newNumber}
        onChangeNumber={changeNumberInput}
        onSubmit={onFormSubmit}
      />
      <h2>Numbers</h2>
      <PersonList persons={personsFiltered} />
    </div>
  )
}

export default App