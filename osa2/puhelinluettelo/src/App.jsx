import { useState, useEffect } from 'react'
import personService from './services/persons'

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return <div style={errorStyle}>{message}</div>
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return <div style={notificationStyle}>{message}</div>
}

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

const Persons = ({ persons, onDelete }) => (
  <>
    {persons.map(person =>
      <div key={person.id}>
        {person.name} {person.number}
        &nbsp;
        <button onClick={() => onDelete(person.id, person.name)}>
          delete
        </button>
      </div>
    )}
  </>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterStr, setFilterStr] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = event => {
    event.preventDefault()

    if (persons.some(person => person.name == newName)) {
      if (confirm(`${newName} is already added to phonebook, ` +
                   `replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const id = person.id
        const changedPerson = { ...person, number: newNumber }

        personService
          .update(id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')

            const name = returnedPerson.name
            const suffix = name.endsWith('s') ? '' : 's'
            setNotification(`Changed ${name}'${suffix} number`)
            setTimeout(() => setNotification(null), 3000)
          })
        .catch(error => {
          setErrorMsg(`Information of ${person.name} has already ` +
                      `been removed from server`)
          setTimeout(() => setErrorMsg(null), 3000)
          setPersons(persons.filter(p => p.id !== id))
        })
      }
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

          setNotification(`Added ${returnedPerson.name}`)
          setTimeout(() => setNotification(null), 3000)
        })
    }
  }

  const deletePerson = (id, name) => {
    if (confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))

          setNotification(`Deleted ${deletedPerson.name}`)
          setTimeout(() => setNotification(null), 3000)
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
      <Error message={errorMsg} />
      <Notification message={notification} />
      <Filter string={filterStr} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson}
                  name={newName} onNameChange={handleNameChange}
                  number={newNumber} onNumChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} onDelete={deletePerson} />
    </>
  )
}

export default App
