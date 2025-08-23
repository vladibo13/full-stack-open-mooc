import React from 'react'

const Person = ({person, onDeletePerson}) => {
  return (
    <>
      <p>{person.name} {person.number}</p>
      <button onClick={() => onDeletePerson(person.id)}>delete</button>
    </>
  )
}

export default Person
