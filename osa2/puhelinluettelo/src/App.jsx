import { useState } from 'react'

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
      <div>
        filter shown with<input value={filterStr}
                                onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <div key={person.name}>{person.name} {person.number}</div>
      )}
    </>
  )
}

export default App
