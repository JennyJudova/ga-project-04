import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        username: '',
        email: '',
        password: '', 
        password_confirmation: ''
      },
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/register', this.state.data)
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err.data))
    console.log('submitted', this.state.data)
  }

  render() {
    const { username, email, password, password_confirmation } = this.state.data
    console.log(this.state)
    return (
      <div className='invoiceWrapper'>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username<span>*</span></label>
            <textarea
              placeholder='Username'
              name='username'
              onChange={this.handleChange}
              value={username}
            />
          </div>
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
          <div>
            <label>Password Confirmation<span>*</span></label>
            <textarea
              placeholder='Password Confirmation'
              name='password_confirmation'
              onChange={this.handleChange}
              value={password_confirmation}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    )
  }
}

export default Register