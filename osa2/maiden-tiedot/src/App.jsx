import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({ label, term, onChange }) => (
  <div>
    {label} <input value={term} onChange={onChange} />
  </div>
)

const Results = ({ content, showCountry, weather, setWeather }) => {
  if (content.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (content.length > 1) {
    return (
      <>
        {content.map(country =>
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => showCountry(country.name.common)}>
              show
            </button>
          </div>
        )}
      </>
    )
  } else if (content.length == 1) {
    const country = content[0]

    if (weather === null || weather.sys.country !== country.cca2) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather` +
             `?q=${country.capital[0]},${country.cca2}&units=metric` +
             `&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
        .then(response => setWeather(response.data))
    }

    const weather_icon = weather
      ? `https://openweathermap.org/img/wn/${weather.weather['0'].icon}@2x.png`
      : ''

    return (
      <>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map(language =>
            <li key={language}>{language}</li>
          )}
        </ul>
        <img src={country.flags.png} />
        <h2>Weather in {country.capital[0]}</h2>
        <div>temperature {weather ? weather.main.temp : '-'} Celcius</div>
        <img src={weather_icon} />
        <div>wind {weather ? weather.wind.speed : '-'} m/s</div>
      </>
    )
  } else {
    return null
  }
}

const App = () => {
  const [countryData, setCountryData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountryData(response.data))
  }, [])

  const search = event => setSearchTerm(event.target.value)

  const results = searchTerm === ''
    ? []
    : countryData.filter(c => c.name.common.match(new RegExp(searchTerm, 'i')))

  const showCountry = name => setSearchTerm(name)

  return (
    <>
      <Search label="find countries"
              term={searchTerm}
              onChange={search} />
      <Results content={results}
               showCountry={showCountry}
               weather={weather}
               setWeather={setWeather} />
    </>
  )
}

export default App
