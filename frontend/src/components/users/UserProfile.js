import React from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

class UserProfile extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const profileId = this.props.match.params.id
    axios.get(`/api/profile/${profileId}`)
      .then(res => this.setState( { data: res.data }))
      .catch(err => console.log(err.config))
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit() {
    //e.preventDefault()
    const profileId = this.props.match.params.id
    axios.put(`/api/profile/${profileId}/edit`, this.state.data)
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
    console.log(this.state)
    return (
      <div className='profileWrapper'>
        { data &&
        <form>
          <h1>Hello {data.username}</h1>
          <div className='profileForm'>
            <div>
              <label>Full Name</label>
              <textarea
                placeholder='Full Name'
                name='username'
                onChange={this.handleChange}
                onBlur={this.handleSubmit}
                value={data.username}
              />
            </div>
            <div>
              <label>Company Name</label>
              <textarea
                placeholder='Company Name'
                name='company_name'
                onChange={this.handleChange}
                onBlur={this.handleSubmit}
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
              <label>Logo</label>
              <textarea
                placeholder='Logo'
                name='logo_image'
                onChange={this.handleChange}
                value={data.logo_image}
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
          </div>
        </form>
        }
        {data.invoices && data.invoices.length > 0 &&
        <div className='invoices'>
          <h2>My Invoices</h2>
          <h4>Invoice Number - Due Date - Total</h4>
          <ul>
            {data.invoices.map(invoice => (
              <li key={invoice.id} className='invoiceid'>
                <Link to={`/invoices/${invoice.id}`}>
                  {invoice.invoice_number}:
                </Link>
                <ul>
                  <li>Invoice Due Date - {invoice.due_date}</li>
                  <li>Invoice Total - {invoice.total}</li>
                </ul>
              </li>
            ))}
          </ul>
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
