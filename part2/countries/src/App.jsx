import { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setFilter(event.target.value)
    setSelectedCountry(null)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  const showCountry = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleChange} />
      </div>

      {selectedCountry ? (
        <CountryDetail country={selectedCountry} />
      ) : (
        <CountryList countries={filteredCountries} onShow={showCountry} />
      )}
    </div>
  )
}

const CountryList = ({ countries, onShow }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />
  }

  return (
    <div>
      {countries.map(country => (
        <div key={country.cca3}>
          {country.name.common}
          <button onClick={() => onShow(country)}>show</button>
        </div>
      ))}
    </div>
  )
}

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital?.[0]}</p>
      <p>area {country.area}</p>

      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`flag of ${country.name.common}`}
        width="150"
      />
    </div>
  )
}

export default App