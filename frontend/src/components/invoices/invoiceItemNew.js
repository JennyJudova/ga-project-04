import React from 'react'
import axios from 'axios'

class InvoiceItemNew extends React.Component {
  constructor() {
    super()

    this.state = {
      // {
      //   "item_description": "work8",
      //   "quantity_hrs": 40,
      //   "unit_price_hrs": 50,
      //   "total": 200
      // }
      data: {
        item_description: '',//models.CharField(max_length=200)
        quantity_hrs: 0,//models.FloatField(null=True, default=0)
        unit_price_hrs: 0, //models.FloatField(null=True, default=0)
        total: 0 //MoneyField(max_digits=10, decimal_places=2, null=True, default_currency='GBP')
      }, 
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/invoice-items', this.state.data, {
      //headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => console.log(res))
      .catch(err => this.setState({ errors: err.response.data.errors }))
    console.log('submitted')
  }

  render() {
    const { item_description, quantity_hrs, unit_price_hrs, total } = this.state.data
    console.log(this.state.data)
    return (
      <div className='invoiceItemWrapper'>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Item Description<span>*</span></label>
            <textarea
              placeholder='item_description'
              name='item_description'
              onChange={(e) => this.handleChange(e)}
              value={item_description}
            />
          </div>
          <div className='numbers'>
            <div>
              <label>quantity_hrs<span>*</span></label>
              <textarea
                placeholder='0'
                name='quantity_hrs'
                onChange={(e) => this.handleChange(e)}
                value={quantity_hrs}
              />
            </div>
            <div>
              <label>unit_price_hrs</label>
              <textarea
                placeholder='0'
                name='unit_price_hrs'
                onChange={(e) => this.handleChange(e)}
                value={unit_price_hrs}
              />
            </div>
            <div>
              <label>total</label>
              <textarea
                placeholder='0'
                name='total'
                onChange={(e) => this.handleChange(e)}
                value={total}
              />
            </div>
            <button type='submit'>Add Item to my invoice</button>
          </div>
        </form>
      </div>
    )
  }
}

export default InvoiceItemNew