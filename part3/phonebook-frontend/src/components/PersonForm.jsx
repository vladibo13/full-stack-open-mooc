import React from 'react'

const PersonForm = ({onFormSubmit, newName, onHandleNameChange, newPhone, onHandlePhoneChange}) => {
  return (
    <form onSubmit={onFormSubmit}>
        <div>
            name: <input value={newName} onChange={onHandleNameChange} />
        </div>
        <div>number: <input value={newPhone} onChange={onHandlePhoneChange} /></div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
  )
}

export default PersonForm
