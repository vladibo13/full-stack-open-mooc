import React from 'react'

const LoginForm = ({password,username,handleLogin,handlePassword,handleUserName}) => {
  return (
    <div>
        <h3>log in to application</h3>
        <form onSubmit={handleLogin}>
            <div>
            <label>
                username
                <input
                type="text"
                value={username}
                onChange={handleUserName}
                />
            </label>
            </div>
            <div>
            <label>
                password
                <input
                type="password"
                value={password}
                onChange={handlePassword}
                />
            </label>
            </div>
            <button type="submit">login</button>
        </form>        
    </div>
  )
}

export default LoginForm
