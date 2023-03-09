import {React, useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {

  let {user, logout} = useContext(AuthContext)

  return (
    <nav className='nav-bar'>
      <div className='nav-items-container'>
      <div className='nav-title'>
        { user ? <p>Hi {user.username}</p> : <p>Hi, Bel Incconu</p>}
      </div>
      </div>
      <div className='nav-items-container'>
        <div className='nav-item'>
          <Link to="/">Home</Link>
        </div>
        <div className='nav-item'>
          { user ? <p onClick={logout} style={{display: "inline"}}>Logout</p> : <Link to="/login">Login</Link> }
        </div>
        <div className='nav-item'>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </nav>
  )
}

export default Header
