import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const changeNameInput = (event) => {
    setNewName(event.target.value)
  }

  const changeNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const changeFilterInput = (event) => {
    setFilter(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      // Name used as array key, thus needs to be unique
      alert(`Person named ${newName} already exists in the phonebook`)
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNumber }))
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
      <div>
        filter shown with <input value={filter} onChange={changeFilterInput} />
      </div>
      <form>
        <h2>Add a new</h2>
        <div>
          name: <input value={newName} onChange={changeNameInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={changeNumberInput} />
        </div>
        <div>
          <button type="submit" onClick={onSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsFiltered.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App