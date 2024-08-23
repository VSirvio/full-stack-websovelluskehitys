import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ string, onChange }) => (
      <div>
        filter shown with<input value={string} onChange={onChange} />
      </div>
)

const PersonForm = ({ onSubmit, name, onNameChange, number, onNumChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={name} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={number} onChange={onNumChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ persons }) => (
  <>
    {persons.map(person =>
      <div key={person.name}>{person.name} {person.number}</div>
    )}
  </>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterStr, setFilterStr] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = event => {
    event.preventDefault()

    if (persons.some(person => person.name == newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const personsToShow = persons.filter(person =>
    person.name.match(new RegExp(filterStr, "i"))
  )

  const handleFilterChange = event => setFilterStr(event.target.value)
  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)

  return (
    <>
      <h2>Phonebook</h2>
      <Filter string={filterStr} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson}
                  name={newName} onNameChange={handleNameChange}
                  number={newNumber} onNumChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </>
  )
}

export default App
