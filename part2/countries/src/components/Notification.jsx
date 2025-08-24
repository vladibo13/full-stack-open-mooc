import React from 'react'

const Notification = ({message}) => {

  if(message === null) {
    return null
  }  
  console.log(message)  
  const isError = message.toLowerCase().includes("error")

  return (
    <div className={`notification ${isError ? "error" : "success"}`}>
      {message}
    </div>
  )
}

export default Notification
