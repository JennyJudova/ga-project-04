import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

import InvoiceItemNew from './InvoiceItemNew'
import Auth from '../../lib/auth'
import NewClientModal from './NewClientModal'


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
        client: {}
      }, 
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // componentDidMount() {
  //   const creator = {
  //     id: localStorage.id,
  //     email: localStorage.email,
  //     username: localStorage.username
  //   }
  //   console.log(creator)
  //   this.setState({ data: { ...this.state.data, creator: creator } })
  // }

  componentDidMount() {
    Modal.setAppElement('body')
  }

  //DOUBLE SPREADING HERE
  callbackClientNew = (client) => {
    this.setState({ data: { ...this.state.data, client: client } })
  }

  // //DOUBLE SPREADING & adding into an array
  callbackInvoiceItem = (InvoiceItem) => {
    console.log(InvoiceItem.item_description)
    const currentItems = this.state.data.invoice_items
    const InvoiceItems = currentItems.concat(InvoiceItem)
    this.setState({ data: { ...this.state.data, invoice_items: InvoiceItems } })
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    console.log('data on submit', this.state.data)
    e.preventDefault()
    axios.post('/api/invoices', this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err.response.data.errors))
    console.log('submitted')
  }

  //.catch(err => this.setState({ errors: err.response.data.errors }))

  render() {
    const { invoice_number, issue_date, due_date, subtotal, vat, total, notes, terms, invoice_items } = this.state.data
    console.log(this.state)
    console.log(invoice_items)
    return (
      <div className='invoiceWrapper'>
        <h1>New Invoice</h1>
        <form onSubmit={this.handleSubmit}>
          <NewClientModal parentCallback = {this.callbackClientNew}/>
          <div className='invoiceNumber'>
            <h4>Invoice Number<span>*</span></h4>
            <textarea
              placeholder='CH1 2014'
              name='invoice_number'
              onChange = {this.handleChange}
              value={invoice_number}
            />
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
          <InvoiceItemNew parentCallback = {this.callbackInvoiceItem}/>
          {
            <div className='invoiceItemWrapperCreated'>
              {invoice_items.map(invoice => (
                <div key={invoice.id} className='invoiceItemForm'>
                  <div>
                    <textarea disabled
                      placeholder={invoice.item_description}
                    />
                  </div>
                  <div className='numbers'>
                    <div>
                      <textarea disabled
                        value={invoice.quantity_hrs}
                      />
                    </div>
                    <div>
                      <textarea disabled
                        value={invoice.unit_price_hrs}
                      />
                    </div>
                    <div>
                      <textarea disabled
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
              placeholder='Happy to talk about a discount if you kill me last.'
              name='terms'
              onChange = {this.handleChange}
              value={terms}
            />
          </div>
          {!localStorage.token && <Link to='/login'><button>Login to create an invoice</button></Link>}
          {localStorage.token && <button type='submit'>Save invoice</button>}
        </form>
      </div>
    )
  }
}

export default InvoiceNew


{/* <div key={invoice.id} className='invoiceItemForm'>
<textarea
  value={invoice.item_description}
/>
<div className='num'>
  <textarea
    value={invoice.quantity_hrs}
  />
  <textarea
    value={invoice.unit_price_hrs}
  />
  <textarea
    value={invoice.total}
  />
</div>
</div> */}

{/* <div className='createdInvoiceItemWrapper'>
  {invoice_items.map(invoice => (
    <div key={invoice.id} className='createdinvoiceItemForm'>
      <p>{invoice.item_description}</p>
      <div className='num'>
        <p>{invoice.quantity_hrs}</p>
        <p>{invoice.unit_price_hrs}</p>
        <p>{invoice.total}</p>
      </div>
    </div>
  )
  )}
</div> */}


{/* <div className='invoiceItemWrapper'>
{invoice_items.map(invoice => (
<div key={invoice.id} className='invoiceItemForm'>
  <div>
    <textarea
      value={invoice.item_description}
    />
  </div>
  <div className='numbers'>
    <div>
      <textarea
        value={invoice.quantity_hrs}
      />
    </div>
    <div>
      <label>unit_price_hrs</label>
      <textarea
        value={invoice.unit_price_hrs}
      />
    </div>
    <div>
      <label>total</label>
      <textarea
        value={invoice.total}
      />
    </div>
  </div>
</div>
)
)}
</div> */}