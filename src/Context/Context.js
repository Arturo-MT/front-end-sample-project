import React from 'react'
import PropTypes from 'prop-types'

export const UserContext = React.createContext('Anonymous')

export const UserProvider = ({ children }) => {
  UserProvider.propTypes = {
    children: PropTypes.node.isRequired
  }

  const [user, setUser] = React.useState({
    username: 'Anonymous',
    auth: false
  })
  const login = (name) => {
    setUser({
      username: name,
      auth: true
    })
  }
  const logout = () => {
    setUser({
      username: 'Anonymous',
      auth: false
    })
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
