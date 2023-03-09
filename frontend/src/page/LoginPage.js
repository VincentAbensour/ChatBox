import {React, useContext} from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
  let loginUser = useContext(AuthContext)
  return (
    <div className="log-page login">
      <h2 align="center">Sign in</h2>
      <form className="login-form" onSubmit={loginUser.loginUser}>
        <div>
          <input className="log-input" type="text" name="email" placeholder='Enter email'/>
        </div>
        <div>
          <input className="log-input" type="password" name="password" placeholder='Enter password'/>
        </div>
        <input className="submit-button" type="submit"/>
      </form>
    </div>
  )


}

export default LoginPage