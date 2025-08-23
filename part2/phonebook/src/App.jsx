import { useState, useEffect } from 'react'
import Person from './components/Person'
import axios from 'axios'
import pesonsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhoneNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    pesonsService.get()
      .then(res => setPersons(res.data))
  },[])

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
      number: newPhone
    }

    pesonsService.create(newPerson)
      .then(res => {
        setPersons([...persons, newPerson])
        setNewName('')
        setNewPhoneNumber('')
      })
  }

  const onSearchTerm = (e) => {
    setSearch(e.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onSearchTerm={onSearchTerm}/>
      <h2>add new</h2>
      <PersonForm
        onFormSubmit={onFormSubmit}
        onHandleNameChange={onHandleNameChange}
        onHandlePhoneChange={onHandlePhoneChange}
        newName={newName}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      ...
      <div>debug: {newName}</div>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App