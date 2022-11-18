import { useState, useEffect } from "react"
import personService from "./personService"
import Filter from "./Filter"
import PersonForm from "./PersonForm"
import PersonList from "./PersonList"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    personService
      .getAll()
      .then((data) => setPersons(data))
      .catch((error) => console.log(error))
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
    if (!newName) {
      alert("Name cannot be empty")
      return
    }
    if (persons.find((person) => person.name === newName)) {
      alert(`Person named ${newName} already exists in the phonebook`)
      return
    }

    const person = { name: newName, number: newNumber }
    personService.create(person).then((savedPerson) => {
      setPersons(persons.concat(savedPerson))
    })

    setNewName("")
    setNewNumber("")
  }

  const personsFiltered = persons.filter((person) => {
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
