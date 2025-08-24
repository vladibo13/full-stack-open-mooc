import React from 'react'
import Country from './Country'

const CountriesList = ({countries, selected}) => {
  return (
    <div>
      {countries.map(country => <Country 
        key={country.area} 
        country={country}
        selected={selected}
        />)}
    </div>
  )
}

export default CountriesList
