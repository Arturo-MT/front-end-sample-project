import React, { useState, useContext } from 'react'
import { UserContext } from '../Context/Context'
import PropTypes from 'prop-types'

function SignUp ({ handleSignUpChange }) {
  SignUp.propTypes = {
    handleSignUpChange: PropTypes.func.isRequired
  }

  const { login } = useContext(UserContext)

  const [user, setUser] = useState({
    id: '',
    username: '',
    password: '',
    passwordConfirm: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem(user.username, JSON.stringify(user))
    login(user.username)
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      id: Math.random().toString(36).substr(2, 9)
    })
  }

  const passwordConfirmation = () => {
    if (user.password === user.passwordConfirm) {
      const btn = document.getElementById('submit')
      btn.disabled = false
      btn.classList.remove('disabled')
      return true
    }
    const btn = document.getElementById('submit')
    btn.disabled = true
    btn.classList.add('disabled')
    return false
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
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
        />
        <input
          type="password"
          className="form-control"
          id="passwordConfirmation"
          placeholder="Confirm Password"
          name="passwordConfirm"
          onChange={handleChange}
          required={true}
        />
        {user.passwordConfirm
          ? (
              passwordConfirmation()
                ? (
            <>
              <h3 className="password-match active" id="password-label">
                Passwords match
              </h3>
              <h3 className="password-error" id="password-label2">
                Passwords don&apos;t match
              </h3>
            </>
                  )
                : (
            <>
              <h3 className="password-match" id="password-label">
                Passwords match
              </h3>
              <h3 className="password-error active" id="password-label2">
                Passwords don&apos;t match
              </h3>
            </>
                  )
            )
          : (
          <>
            <h3 className="password-match default" id="password-label">
              Passwords match
            </h3>
            <h3 className="password-error" id="password-label2">
              Passwords don&apos;t match
            </h3>
          </>
            )}
        <button type="submit" id="submit" className="btn btn-primary disabled">
          Submit
        </button>
        <div className="sign-up">
          <h3>Already have an account?</h3>
          <p onClick={handleSignUpChange}>Sign In</p>
        </div>
      </div>
    </form>
  )
}

export default SignUp
