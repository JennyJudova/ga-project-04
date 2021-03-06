import React from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'

class UserProfile extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {},
      errors: {}, 
      storageSet: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setId = this.setId.bind(this)
  }

  // componentDidMount() {
  //   const profileId = this.props.match.params.id
  //   axios.get(`/api/profile/${profileId}`)
  //     .then(res => this.setState( { data: res.data }))
  //     .catch(err => console.log(err.config))
  // }

  // componentDidMount() {
  //   axios.get('/api/profile', { 
  //     headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //   })
  //     .then(res => {
  //       const displayStatus = {}
  //       res.data.listingHistory.forEach(listing => {
  //         displayStatus[listing._id] = false 
  //       })
  //       this.setState({ data: res.data, displayStatus })
  //     })
  //     .then(() => this.interval = setInterval(() => this.getUserInfo(), 1000))
  //     .catch(err => console.log(err.message))
  // }

  componentDidMount() {
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState( { data: res.data }))
      .catch(err => console.log(err.config))
  }

  componentDidUpdate() {
    if (this.state.storageSet === false) {
      this.setId()
      this.setState( { storageSet: true } )
    }
  }

  setId() {
    const id = this.state.data.id
    const username = this.state.data.username
    const email = this.state.data.email
    localStorage.setItem('id', id)
    localStorage.setItem('username', username)
    localStorage.setItem('email', email)
  } 

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    //const profileId = this.state.data.id
    axios.put('/api/profile', this.state.data, 
      { headers: { Authorization: `Bearer ${Auth.getToken()}` } 
      })
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data.errors ))
    console.log('submitted')
  }

  //this.setState({ errors: err.response.data.errors })
  //    axios.put(`/api/profile/${profileId}`, this.state.data, {
  //   headers: { Authorization: `Bearer ${Auth.getToken()}` }
  // })

  render() {
    const { data } = this.state
    console.log('state', this.state.data.id)
    console.log('props', this.props)
    console.log('localStorage', localStorage)
    return (
      <div className='profileWrapper'>
        { data &&
        <form onSubmit={this.handleSubmit}>
          <h1>Hello {data.username}</h1>
          <div className='profileForm'>
            <div>
              <label>Full Name</label>
              <textarea
                placeholder='Full Name'
                name='username'
                onChange={this.handleChange}
                value={data.username}
              />
            </div>
            <div>
              <label>Company Name</label>
              <textarea
                placeholder='Company Name'
                name='company_name'
                onChange={this.handleChange}
                value={data.company_name}
              />
            </div>
            <div>
              <label>Email</label>
              <textarea
                placeholder='Email'
                name='email'
                onChange={this.handleChange}
                value={data.email}
              />
            </div>
            <div>
              <label>Address</label>
              <textarea
                placeholder='Address'
                name='address'
                onChange={this.handleChange}
                value={data.address}
              />
            </div>
            <div>
              <label>Phone Number</label>
              <textarea
                placeholder='Phone Number'
                name='phone_num'
                onChange={this.handleChange}
                value={data.phone_num}
              />
            </div>
            <div>
              <label>Tax Registration Number</label>
              <textarea
                placeholder='Tax Registration Number'
                name='tax_reg'
                onChange={this.handleChange}
                value={data.tax_reg}
              />
            </div>
            <button type='submit'>Update your profile</button>
          </div>
        </form>
        }
        {data.invoices && data.invoices.length > 0 &&
        <div className='invoices'>
          <h2>My Invoices</h2>
          <h4>Invoice Number - Due Date - Total</h4>
          <div className='invoiceindex'>
            {data.invoices.map(invoice => (
              <div key={invoice.id} className='invoiceid'>
                <Link to={`/invoices/${invoice.id}`}>
                  <h4>{invoice.invoice_number}:</h4>
                  <p>Invoice Due Date - {invoice.due_date}</p>
                  <p>Invoice Total - {invoice.total}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        }
      </div>
    )
  }
}

export default UserProfile

// client: {id: 4, full_name: "Samuel Thomas Wilson", company_name: "Falcon", address: "Washington DC", email: "SamWilson@Avengers.com"}
// creator: {id: 2, username: "fixer", email: "fixer@marveldc.com", logo_image: "", tax_reg: "", …}
// currency: "GBP"
// due_date: "2019-11-28"
// id: 1
// invoice_items: [{…}]
// invoice_number: "Cap#117"
// is_paid: false
// issue_date: "2019-11-13"
// notes: ""
// subtotal: "450.00"
// terms: ""
// total: "450.00"
// vat: 0
// vat_registered: false


{/* <div>
<label>Logo</label>
<textarea
  placeholder='Logo'
  name='logo_image'
  onChange={this.handleChange}
  value={data.logo_image}
/>
</div> */}