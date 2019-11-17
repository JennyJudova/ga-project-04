import React from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

class Login extends React.Component {
  constructor() {
    super()
    
    this.state = {
      data: {
        email: '',
        password: ''
      },
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: { name, value } }) {
    const data = { ...this.state.data, [name]: value }
    const errors = { ...this.state.errors, [name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/login', this.state.data )
      .then(res => { 
        console.log(res.data.token)
        //Auth.setToken(res.data.token)
        //this.props.history.goBack()
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }
  
  render() {
    // console.log('render state Login', this.state)
    // console.log('render errors', this.state.errors)
    // console.log('login props', this.props)
    // console.log('history', this.props.history)
    const { email, password } = this.state.data
    console.log(this.state)
    return (
      <div className='invoiceWrapper'>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email<span>*</span></label>
            <textarea
              placeholder='Email'
              name='email'
              onChange={this.handleChange}
              value={email}
            />
          </div>
          <div>
            <label>Password<span>*</span></label>
            <textarea
              placeholder='Password'
              name='password'
              onChange={this.handleChange}
              value={password}
            />
          </div>
          {!this.state.errors && 
            <p>Oops, something went wrong. please try again</p>}
          <button type='submit'>Login</button>
          <Link to="/register">
            <small>No account yet? Click here to register.</small>
          </Link>
        </form>
      </div>
    )
  }
}

export default Login