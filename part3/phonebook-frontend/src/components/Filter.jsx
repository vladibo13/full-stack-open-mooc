import React from 'react'

const Filter = ({search, onSearchTerm}) => {
  return (
    <div>
        <input value={search} onChange={onSearchTerm}/>
    </div>
  )
}

export default Filter
