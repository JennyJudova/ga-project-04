import React from 'react'
import axios from 'axios'

import InvoiceItemNew from './InvoiceItemNew'
import ClientNew from './ClientNew'


class InvoiceNew extends React.Component {
  constructor() {
    super()

    this.state = {
      // "invoice_number": "test",
      // "issue_date": "2019-11-13",
      // "due_date": "2019-11-21",
      // "vat_registered": true,
      // "subtotal": "10.00",
      // "vat": 10.0,
      // "total": "11.00",
      // "notes": "bla",
      // "terms": "bla",
      // "is_paid": true,
      // "currency": "GBP",
      data: {
        invoice_number: '', //models.CharField(max_length=50, unique=True)
        issue_date: '', //models.DateField(default=date.today)
        due_date: '', //models.DateField(null=True)
        vat_registered: false, //models.BooleanField(default=False)
        subtotal: '', //MoneyField(max_digits=10, decimal_places=2, null=True, default_currency='GBP')
        vat: 0, //models.FloatField(null=True, default=0)
        total: 0, //MoneyField(max_digits=10, decimal_places=2, default_currency='GBP')
        notes: '', //models.CharField(max_length=500, blank=True)
        terms: '', //models.CharField(max_length=500, blank=True)
        is_paid: false, //models.BooleanField(default=False)
        currency: 'GBP', //models.CharField(max_length=50, default='GBP')
        invoice_items: [],
        client: {
          email: 'SamWilson@Avengers.com'
        }
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
    axios.post('/api/invoices', this.state.data, {
      //headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => console.log(res))
      .catch(err => this.setState({ errors: err.response.data.errors }))
    console.log('submitted')
  }

  render() {
    const { invoice_number, issue_date, due_date, subtotal, vat, total, notes, terms } = this.state.data
    console.log(this.state.data)
    return (
      <div className='invoiceWrapper'>
        <h1>New Invoice</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <ClientNew/>
          <div className='invoiceNumber'>
            <label>Invoice Number<span>*</span></label>
            <textarea
              placeholder='invoice_number'
              name='invoice_number'
              onChange={(e) => this.handleChange(e)}
              value={invoice_number}
            />
          </div>
          <div className='invoiceDate'>
            <label>issue_date<span>*</span></label>
            <textarea
              placeholder='2019-11-21'
              name='issue_date'
              onChange={(e) => this.handleChange(e)}
              value={issue_date}
            />
            <label>due_date</label>
            <textarea
              placeholder='2019-11-21'
              name='due_date'
              onChange={(e) => this.handleChange(e)}
              value={due_date}
            />
          </div>
          <InvoiceItemNew/>
          <div className='invoiceSummary'>
            <h3>Invoice Summary</h3>
            <div>
              <label>subtotal</label>
              <textarea
                placeholder='0'
                name='subtotal'
                onChange={(e) => this.handleChange(e)}
                value={subtotal}
              />
            </div>
            <div>
              <label>vat</label>
              <textarea
                placeholder='0'
                name='vat'
                onChange={(e) => this.handleChange(e)}
                value={vat}
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
          </div>
          <div className='notes'>
            <label>notes</label>
            <textarea
              placeholder='notes'
              name='notes'
              onChange={(e) => this.handleChange(e)}
              value={notes}
            />
          </div>
          <div className='notes'>
            <label>terms</label>
            <textarea
              placeholder='terms'
              name='terms'
              onChange={(e) => this.handleChange(e)}
              value={terms}
            />
          </div>
          <button type='submit'>save invoice</button>
        </form>
      </div>
    )
  }
}

export default InvoiceNew
