import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Notification from './components/Notification'
import CountriesList from './components/CountriesList'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    countryService.get().then( countries => {
      setCountries(countries)  
      if(filteredCountries.length === 1) {
        console.log('selected')
        setSelected(filteredCountries)
      } else {
        setSelected(null)
      }
    })
  }, [search])

  const onSearchTerm = (e) => {
    setSearch(e.target.value)
  }

  const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))

  console.log('search = ', search)
  console.log('countries = ', countries)
  console.log('filteredCountries = ', filteredCountries)
  console.log('selected ', selected)

  return (
    <>
      <h1>countries</h1>
      find countries: <input value={search} onChange={onSearchTerm} />
      {filteredCountries.length > 10 && <Notification message={`Too many matches, specify anther filter`} />}
      {(filteredCountries.length && filteredCountries.length < 10) && <CountriesList selected={selected} countries={filteredCountries}/>}
    </>
  )
}

export default App
