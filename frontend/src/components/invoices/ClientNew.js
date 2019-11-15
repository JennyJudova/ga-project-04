import React from 'react'
import axios from 'axios'

class ClientNew extends React.Component {
  constructor() {
    super()

    this.state = {
      // {
      //   "full_name": "client4",
      //   "company_name": "",
      //   "address": "",
      //   "email": "client4@email.com"
      // }
      data: {
        full_name: '', //models.CharField(max_length=50, blank=True)
        company_name: '', //models.CharField(max_length=50, blank=True)
        address: '', //models.CharField(max_length=100, blank=True)
        email: '' //models.CharField(max_length=50)
      }, 
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.sendData = this.sendData.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/clients', this.state.data, {
      //headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => console.log(res))
      .catch(err => this.setState({ errors: err.response.data.errors }))
    this.sendData()
    console.log('submitted')
  }

  sendData() {
    return this.props.parentCallback(this.state.data)
  }

  render() {
    const { full_name, company_name, address, email } = this.state.data
    console.log(this.state.data)
    return (
      <div className='clientNewWrapper'>
        <div className='clientNewForm' onSubmit={this.handleSubmit}>
          <h3>Add Client</h3>
          <div>
            <label>Full Name</label>
            <textarea
              placeholder='full_name'
              name='full_name'
              onChange={(e) => this.handleChange(e)}
              value={full_name}
            />
          </div>
          <div>
            <label>company_name</label>
            <textarea
              placeholder='company_name'
              name='company_name'
              onChange={(e) => this.handleChange(e)}
              value={company_name}
            />
          </div>
          <div>
            <label>address</label>
            <textarea
              placeholder='address'
              name='address'
              onChange={(e) => this.handleChange(e)}
              value={address}
            />
          </div>
          <div>
            <label>email<span>*</span></label>
            <textarea
              placeholder='email'
              name='email'
              onChange={(e) => this.handleChange(e)}
              value={email}
            />
          </div>
          <button type='submit' onClick={this.handleSubmit}>Add new client</button>
        </div>
      </div>
    )
  }
}

export default ClientNew