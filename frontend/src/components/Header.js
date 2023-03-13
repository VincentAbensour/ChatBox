import {React, useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {

  let {user, logout} = useContext(AuthContext)

  return (

    <nav className='nav-bar'>
      <div className='nav-title'>
        { user ? <p>Hi {user.username}</p> : <p>Hi, Bel Incconu</p>}
      </div>
      <div className='nav-items-container'>
        <div className='nav-item-separator'>
          |
        </div>
        <Link className='nav-item' to="/">Home</Link>
        { user ? <p className='nav-item' onClick={logout}>Logout</p> : <Link className='nav-item' to="/login">Login</Link>}
        <Link  className='nav-item' to="/register">Register</Link>
      </div>
    </nav>
  )
}

export default Header

