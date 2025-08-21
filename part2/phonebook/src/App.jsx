import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '051-2233444' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhoneNumber] = useState('')

  const onHandleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const onHandlePhoneChange = (e) => {
    setNewPhoneNumber(e.target.value)
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    const nameExist = persons.some(person => person.name === newName)
    if(nameExist) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      phoneNumber: newPhone
    }

    setPersons([...persons, newPerson])
    setNewName('')
    setNewPhoneNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onFormSubmit}>
        <div>
          name: <input value={newName} onChange={onHandleNameChange} />
        </div>
        <div>number: <input value={newPhone} onChange={onHandlePhoneChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
      <div>debug: {newName}</div>
      {persons.map(person => <Person key={person.name} person={person} />)}
    </div>
  )
}

export default App