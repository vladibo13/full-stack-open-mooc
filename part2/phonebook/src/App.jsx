import { useState, useEffect } from 'react'
import Person from './components/Person'
import axios from 'axios'
import pesonsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhoneNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    pesonsService.get()
      .then(persons => setPersons(persons))
  },[])

  const onHandleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const onHandlePhoneChange = (e) => {
    setNewPhoneNumber(e.target.value)
  }

  const onDeletePerson = (id) => {
    pesonsService.del(id)
      .then(res => console.log(res))
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    const nameExist = persons.find(person => person.name === newName)
    if(nameExist) {
      console.log(nameExist)
      const confirm = window.confirm(`${newName} is already added to phonebook
            replace the old number with new one?
        `)
      if(!confirm) return 
      const updatedPerson = pesonsService.update(nameExist.id, {
        ...nameExist,
        number: newPhone
      }).then(person => {
        const newPersons = persons.filter(p => p.id !== person.id)
        setPersons([...newPersons, person])
        setNewName('')
        setNewPhoneNumber('')
      })  

      return
    }

    const newPerson = {
      name: newName,
      number: newPhone
    }

    pesonsService.create(newPerson)
      .then(person => {
        setPersons([...persons, person])

        setNotification(`Added ${newName}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)

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
      <Notification message={notification}/>
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
      <div>debug: {newName} {newPhone}</div>
       ...
      <Persons persons={filteredPersons} onDeletePerson={onDeletePerson} />
    </div>
  )
}

export default App