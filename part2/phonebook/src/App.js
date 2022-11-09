import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const changeInput = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      // Name used as array key, thus needs to be unique
      alert(`Person named ${newName} already exists in the phonebook`)
      return;
    }
    setPersons(persons.concat({ name: newName }))
    setNewName("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={changeInput} />
        </div>
        <div>
          <button type="submit" onClick={onSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name}</div>)}
    </div>
  )
}

export default App