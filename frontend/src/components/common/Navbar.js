import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Auth from '../../lib/Auth'

class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {
      burgerOpen: false
    }
    this.handleLogout = this.handleLogout.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar() {
    this.setState({ burgerOpen: !this.state.burgerOpen })
  }

  handleLogout() {
    Auth.logout()
    this.props.history.push('/')
  }

  render() {
    return (
      <nav className={`${this.state.burgerOpen ? 'burgerOpen' : ''}`}>
        <div>
          <Link to='/'>Home</Link>
          <Link to='/invoices/new'>Add invoice</Link>
          {localStorage.token && <Link to = '/profile'>Profile</Link>}
          {!localStorage.token && <Link to='/register'>Register</Link>}
          {!localStorage.token && <Link to='/login'>Login</Link>}
          {localStorage.token && <a onClick={this.handleLogout}>Logout</a>}
        </div>
        <a 
          className='burgerMenu'
          onClick={this.toggleNavbar}
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </nav>
    )
  }
}

export default withRouter(Navbar)

//<a onClick={this.handleLogout}>Logout</a>

// {Auth.isAuthenticated() && <Link to="/vegetables/new">Post your veg</Link>}

// {!Auth.isAuthenticated() && <Link to="/register">Register</Link>}
// {!Auth.isAuthenticated() && <Link to="/login">Sign in</Link>}
// {Auth.isAuthenticated() && <Link to="/dashboard">Dashboard</Link>}
// {Auth.isAuthenticated() && <a onClick={this.handleLogout}>Logout</a>}