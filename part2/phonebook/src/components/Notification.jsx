import React from 'react'

const Notification = ({message}) => {

  if(message === null) {
    return null
  }  
  console.log(message)  
  return (
    <div className='notification'>
      {message}
    </div>
  )
}

export default Notification
