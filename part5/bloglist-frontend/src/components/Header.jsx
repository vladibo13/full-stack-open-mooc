import React from 'react'

const Header = ({name, logOut}) => {
    return(
      <div>
        <b>{name} is logged in </b>
        <button onClick={logOut}>logg out</button>
      </div>
    )
}

export default Header
