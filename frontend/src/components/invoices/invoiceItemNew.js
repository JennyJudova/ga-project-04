import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

class InvoiceItemNew extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        item_description: '',//models.CharField(max_length=200)
        quantity_hrs: 0,//models.FloatField(null=True, default=0)
        unit_price_hrs: 1, //models.FloatField(null=True, default=0)
        total: 0 //MoneyField(max_digits=10, decimal_places=2, null=True, default_currency='GBP')
      }, 
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.sendData = this.sendData.bind(this)
  }

  handleChange(e) {
    let data = { ...this.state.data, [e.target.name]: e.target.value }
    const item_description = data.item_description
    const quantity_hrs = parseFloat(data.quantity_hrs)
    const unit_price_hrs = parseFloat(data.unit_price_hrs)
    const total = quantity_hrs * unit_price_hrs
    data = { ...this.state.data, item_description, quantity_hrs, unit_price_hrs, total }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/invoice-items', this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => console.log(res))
      .catch(err => this.setState({ errors: err.response.data.errors }))
    this.sendData()
  }

  sendData() {
    return this.props.parentCallback(this.state.data)
  }

  render() {
    const { item_description, quantity_hrs, unit_price_hrs, total } = this.state.data
    console.log(this.state.data)
    return (
      <div className='invoiceItem'>
        <div className='invoiceItemWrapper'>
          <div className='invoiceItemForm' onSubmit={this.handleSubmit}>
            <div>
              <label>Item Description<span>*</span></label>
              <textarea
                placeholder='Dog walking'
                name='item_description'
                onChange={this.handleChange}
                value={item_description}
              />
            </div>
            <div className='numbers'>
              <div>
                <label>QTY / HRS<span>*</span></label>
                <textarea
                  placeholder='0'
                  name='quantity_hrs'
                  onChange={this.handleChange}
                  value={quantity_hrs}
                />
              </div>
              <div>
                <label>Unit price</label>
                <textarea
                  placeholder='0'
                  name='unit_price_hrs'
                  onChange={this.handleChange}
                  value={unit_price_hrs}
                />
              </div>
              <div>
                <label>Total</label>
                <textarea
                  disabled
                  placeholder='0'
                  name='total'
                  onChange = {this.handleChange}
                  value={total}
                />
              </div>
            </div>
          </div>
        </div>
        {localStorage.token && <button type='submit' onClick={this.handleSubmit}>Add to invoice</button>}
      </div>
    )
  }
}

export default InvoiceItemNew