import { UserContext } from '../Context/Context'
import React, { useContext } from 'react'
import PropTypes from 'prop-types'

function NavBar ({ logout }) {
  NavBar.propTypes = {
    logout: PropTypes.func.isRequired
  }

  const { user } = useContext(UserContext)
  return (
    <div className="navbar">
      <ul className="nav">
        <li className="nav-item">
          <span className="nav-link">Web Choice Awards</span>
        </li>
        <li>
          <span className="welcome-text">{
            user.auth ? `Welcome ${user.username}!` : 'Welcome Anonymous!'
          }</span>
        </li>
        <li className="nav-item">
          {user.auth
            ? (
            <button className="logout" onClick={logout}>
              Log Out
            </button>
              )
            : (
            <></>
              )}
        </li>
      </ul>
    </div>
  )
}

export default NavBar
