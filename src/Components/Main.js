import CardsContainer from './CardsContainer'
import Login from './Login'
import NavBar from './NavBar'
import React, { useContext } from 'react'
import { UserContext } from '../Context/Context'

function Main () {
  const { user, logout } = useContext(UserContext)

  return (
    <>
      <NavBar logout={logout} />
      {user.auth ? <></> : <Login />}
      <CardsContainer />
    </>
  )
}

export default Main
