import React from 'react'
import axios from 'axios'

import Auth from '../../lib/auth'


class InvoiceShow extends React.Component {
  constructor() {
    super()

    this.state = {
      invoices: null
    }
    
  }

  componentDidMount() {
    const invoiceId = this.props.match.params.id
    axios.get(`/api/invoices/${invoiceId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state)
    return (
      <h1>Invoice Page</h1>
    )
  }
}

export default InvoiceShow