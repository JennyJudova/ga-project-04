import React from 'react'
import axios from 'axios'
import TextareaAutosize from 'react-autosize-textarea';

import Auth from '../../lib/Auth'


class InvoiceShow extends React.Component {
  constructor() {
    super()

    this.state = {
      data: null
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const invoiceId = this.props.match.params.id
    axios.get(`/api/invoices/${invoiceId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        this.setState({ data: res.data })
      })
      .catch(err => console.log(err))
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    //const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()
    const invoiceId = this.props.match.params.id
    axios.put(`/api/invoices/${invoiceId}/`, this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => {
        this.props.history.push(`/invoices/${invoiceId}`)
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
    console.log('submitted edited invoice')
  }

  handleDelete(e) {
    e.preventDefault()
    const invoiceId = this.props.match.params.id
    axios.delete(`/api/invoices/${invoiceId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/profile'))
      .catch(err => console.log(err))
  }

  render() {
    if (!this.state.data) return null
    const { invoice_number, issue_date, due_date, subtotal, vat, total, notes, terms, invoice_items, client } = this.state.data
    console.log('state', this.state)
    return (
      <div className='invoiceWrapper'>
        <h1>Invoice {invoice_number}</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='invoiceNumber'>
            <h4>Invoice Number<span>*</span></h4>
            <textarea
              placeholder='Invoice Number'
              name='invoice_number'
              onChange = {this.handleChange}
              value={invoice_number}
            />
          </div>
          <div className='clientNewWrapper'>
            <div>
              <label>Client Information</label>
              <TextareaAutosize className='client'
                // placeholder={client.full_name, client.company_name, client.address, client.email}
                placeholder={`
                  Full Name - ${client.full_name}, 
                  Company Name - ${client.company_name}, 
                  Client Address - ${client.address}, 
                  Client Email - ${client.email}`}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className='invoiceDate'>
            <label>Issue Date<span>*</span></label>
            <textarea
              placeholder='2019-11-21'
              name='Issue Date'
              onChange = {this.handleChange}
              value={issue_date}
            />
            <label>Due Date</label>
            <textarea
              placeholder='2019-11-21'
              name='due_date'
              onChange = {this.handleChange}
              value={due_date}
            />
          </div>
          {
            <div className='invoiceItemWrapperShow'>
              {invoice_items.map(invoice => (
                <div key={invoice.id} className='invoiceItemForm'>
                  <div>
                    <TextareaAutosize 
                      style={{ minHeight: 30 }} 
                      disabled
                      placeholder={invoice.item_description}
                    />
                  </div>
                  <div className='numbers'>
                    <div>
                      <TextareaAutosize 
                        style={{ minHeight: 30 }}
                        disabled
                        value={invoice.quantity_hrs}
                      />
                    </div>
                    <div>
                      <TextareaAutosize  
                        style={{ minHeight: 30 }}
                        disabled
                        value={invoice.unit_price_hrs}
                      />
                    </div>
                    <div>
                      <TextareaAutosize 
                        style={{ minHeight: 30 }}
                        disabled
                        value={invoice.total}
                      />
                    </div>
                  </div>
                </div>
              )
              )}
            </div>
          }
          <div className='invoiceSummary'>
            <h3>Invoice Summary</h3>
            <div>
              <label>Subtotal</label>
              <textarea
                placeholder='0'
                name='subtotal'
                onChange = {this.handleChange}
                value={subtotal}
              />
            </div>
            <div>
              <label>VAT</label>
              <textarea
                placeholder='0'
                name='vat'
                onChange = {this.handleChange}
                value={vat}
              />
            </div>
            <div>
              <label>Total</label>
              <textarea
                placeholder='0'
                name='total'
                onChange = {this.handleChange}
                value={total}
              />
            </div>
          </div>
          <div className='Notes'>
            <label>Notes</label>
            <textarea
              placeholder='Notes'
              name='notes'
              onChange = {this.handleChange}
              value={notes}
            />
          </div>
          <div className='notes'>
            <label>Terms</label>
            <textarea
              placeholder='Terms'
              name='terms'
              onChange = {this.handleChange}
              value={terms}
            />
          </div>
          <div className='inviceshowButtons'>
            <button type='submit' onClick={this.handleSubmit}>Edit invoice</button>
            <button type='submit' onClick={this.handleDelete}>Delete invoice</button>
          </div>
        </form>
      </div>
    )
  }
}

export default InvoiceShow



{/* <div>
<label>Company Name</label>
<textarea
  placeholder='Parabellum'
  name='company_name'
  onChange={this.handleChange}
  value={company_name}
/>
</div>
<div>
<label>Address</label>
<textarea
  placeholder='Continental Hotel, NYC'
  name='address'
  onChange={this.handleChange}
  value={address}
/>
</div>
<div>
<label>Email<span>*</span></label>
<textarea
  placeholder='jw@BabaYaga.co'
  name='email'
  onChange={this.handleChange}
  value={email}
/>
</div> */}