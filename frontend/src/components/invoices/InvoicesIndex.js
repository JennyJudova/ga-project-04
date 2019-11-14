import React from 'react'
import axios from 'axios'

class InvoicesIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      invoices: null
    }
    
  }

  componentDidMount() {
    axios.get('/api/invoices')
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state)
    return (
      <h1>Invoices Index Page</h1>
    )
  }
}

export default InvoicesIndex
