import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({ label, term, onChange }) => (
  <div>
    {label} <input value={term} onChange={onChange} />
  </div>
)

const Results = ({ content }) => {
  if (content.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (content.length > 1) {
    return (
      <>
        {content.map(country =>
          <div key={country.name.common}>{country.name.common}</div>
        )}
      </>
    )
  } else if (content.length == 1) {
    const country = content[0]
    return (
      <>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map(l =>
            <li key={l}>{l}</li>
          )}
        </ul>
        <img src={country.flags.png} />
      </>
    )
  } else {
    return null
  }
}

const App = () => {
  const [countryData, setCountryData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountryData(response.data))
  }, [])

  const search = event => setSearchTerm(event.target.value)

  const results = searchTerm === ''
    ? []
    : countryData.filter(c => c.name.common.match(new RegExp(searchTerm, 'i')))

  return (
    <>
      <Search label="find countries" term={searchTerm} onChange={search} />
      <Results content={results} />
    </>
  )
}

export default App
