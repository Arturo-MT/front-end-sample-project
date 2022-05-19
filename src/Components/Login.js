import React, { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'

function Login () {
  const [isSignUp, setSignUp] = useState(false)
  const handleSignUpChange = () => {
    setSignUp(!isSignUp)
  }

  return (
    <div className="login">
      {isSignUp
        ? (
        <SignUp handleSignUpChange={handleSignUpChange} />
          )
        : (
        <SignIn handleSignUpChange={handleSignUpChange} />
          )}
    </div>
  )
}

export default Login
