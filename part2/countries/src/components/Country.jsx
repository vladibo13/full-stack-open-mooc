import React from 'react'

const Country = ({country, selected}) => {
  if(selected) {
    return(
        <>
            <h4>{country.name.common}</h4>
            <p>{country.capital.map(c => c)} {country.area}</p>
            <h5>Languages</h5>
            <ul>
                {Object.values(country.languages).map(value => <li>{value}</li>)}
            </ul>                          
            <img src={country.flags.png} />            
        </>
    )
  }  
  return (
    <>
      <h4>{country.name.common}</h4>
    </>
  )
}

export default Country
