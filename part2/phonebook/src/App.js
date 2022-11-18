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
    const existingPerson = persons.find((person) => person.name === newName)
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} already exists in the phonebook, replace old number with a new one?`
        )
      ) {
        const updatedPerson = {
          id: existingPerson.id,
          name: existingPerson.name,
          number: newNumber,
        }
        personService
          .update(updatedPerson)
          .then((data) => {
            setPersons(persons.map((p) => (p.id === data.id ? data : p)))
          })
          .catch((error) => console.log(error))
      }
      return
    }

    const person = { name: newName, number: newNumber }
    personService.create(person).then((savedPerson) => {
      setPersons(persons.concat(savedPerson))
    })

    setNewName("")
    setNewNumber("")
  }

  const handleDeletePerson = (person) => {
    const { id, name } = person
    if (!window.confirm(`Delete ${name}?`)) return
    personService.delete(id)
    setPersons(persons.filter((p) => p.id !== id))
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
      <PersonList persons={personsFiltered} deletePerson={handleDeletePerson} />
    </div>
  )
}

export default App
