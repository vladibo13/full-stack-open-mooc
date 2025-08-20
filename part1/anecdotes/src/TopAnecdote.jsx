import React from 'react'

const TopAnecdote = ({topAnecdote}) => {
  if(!topAnecdote) {
    return(
        <p>no votes</p>
    )
  }
  
  return (
    <p>{topAnecdote}</p>
  )
}

export default TopAnecdote