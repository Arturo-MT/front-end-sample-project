import React, { useState, useContext } from 'react'
import { UserContext } from '../Context/Context'
import PropTypes from 'prop-types'

function SignIn ({ handleSignUpChange }) {
  SignIn.propTypes = {
    handleSignUpChange: PropTypes.func.isRequired
  }

  const { login } = useContext(UserContext)

  const [userData, setUserData] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const userInfo = JSON.parse(localStorage.getItem(`${userData.username}`))
      if (userInfo.password === userData.password) {
        login(userData.username)
      } else {
        alert('Incorrect password')
      }
    } catch (error) {
      if (
        error.message === "Cannot read properties of null (reading 'password')"
      ) {
        alert('Incorrect username')
      }
    }
  }

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }
  const voidInputs = () => {
    if (userData.password && userData.username) {
      return true
    }
    return false
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          required={true}
        />
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          required={true}
          autoComplete="off"
        />
        {voidInputs()
          ? (
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
            )
          : (
          <button
            type="submit"
            className="btn btn-primary disabled"
            id="submit"
          >
            Submit
          </button>
            )}
        <div className="sign-up">
          <h3>You don&apos;t have an account?</h3>
          <p onClick={handleSignUpChange}>Sign up</p>
        </div>
      </div>
    </form>
  )
}

export default SignIn
