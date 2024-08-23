import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1231244'
    },
    {
      name: 'Ada Lovelace',
      number: '39-44-5323523'
    },
    {
      name: 'Dan Abramov',
      number: '12-43-234345'
    },
    {
      name: 'Mary Poppendieck',
      number: '39-23-6423122'
    }
  ])
  const [filterStr, setFilterStr] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = event => {
    event.preventDefault()

    if (persons.some(person => person.name == newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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
