import { useState, useEffect } from "react"
import personService from "./personService"
import Filter from "./Filter"
import PersonForm from "./PersonForm"
import PersonList from "./PersonList"
import Notification from "./Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [message, setMessage] = useState({ text: null, error: false })

  useEffect(() => {
    personService
      .getAll()
      .then((data) => setPersons(data))
      .catch((error) => {
        sendErrorNotification("Couldn't load data from server")
        console.log("Database error:", error)
      })
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

  const sendNotification = (message) => {
    setMessage({ text: message, error: false })
    setTimeout(() => {
      setMessage({ text: null, error: false })
    }, 5000)
  }

  const sendErrorNotification = (message) => {
    setMessage({ text: message, error: true })
    setTimeout(() => {
      setMessage({ text: null, error: false })
    }, 5000)
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
            sendNotification(`Updated ${updatedPerson.name}'s number`)
            setNewName("")
            setNewNumber("")
          })
          .catch((error) => {
            if (error.response?.status === 404) {
              sendErrorNotification(
                `${updatedPerson.name} has vanished from the server`
              )
              setPersons(persons.filter((p) => p.id !== updatedPerson.id))
            } else if (error.response?.data?.error) {
              sendErrorNotification(error.response.data.error)
            } else {
              sendErrorNotification("Unknown error")
              console.log("Unknown error:", error)
            }
          })
      }
      return
    }

    const person = { name: newName, number: newNumber }
    personService
      .create(person)
      .then((savedPerson) => {
        setPersons(persons.concat(savedPerson))
        sendNotification(`Added ${newName}`)
        setNewName("")
        setNewNumber("")
      })
      .catch((error) => {
        if (error.response?.data?.error) {
          sendErrorNotification(error.response.data.error)
        } else {
          sendErrorNotification("Unknown error")
          console.log("Unknown error:", error)
        }
      })
  }

  const handleDeletePerson = (person) => {
    const { id, name } = person
    if (!window.confirm(`Delete ${name}?`)) return
    personService.delete(id)
    setPersons(persons.filter((p) => p.id !== id))
    sendNotification(`${person.name} removed`)
  }

  const personsFiltered = persons.filter((person) => {
    const lowcaseName = person.name.toLowerCase()
    const lowcaseFilter = filter.toLowerCase()
    return lowcaseName.includes(lowcaseFilter)
  })

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
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
