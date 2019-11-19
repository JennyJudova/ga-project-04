import React from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Auth from '../../lib/auth'
 
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}
 
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#yourAppElement')
//Modal.setAppElement(ModalTest)
 
class NewClientModal extends React.Component {
  constructor() {
    super()
 
    this.state = {
      modalIsOpen: false,
      data: {
        full_name: '', //models.CharField(max_length=50, blank=True)
        company_name: '', //models.CharField(max_length=50, blank=True)
        address: '', //models.CharField(max_length=100, blank=True)
        email: '' //models.CharField(max_length=50)
      }, 
      errors: {}
    }
 
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.sendData = this.sendData.bind(this)
  }
 
  //Modal handlers
  openModal() {
    this.setState({ modalIsOpen: true })
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#7f7fd5'
  }
 
  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  //React Handlers

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/clients', this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => console.log(res))
      .catch(err => this.setState({ errors: err.response.data.errors }))
    this.sendData()
    console.log('submitted')
    this.closeModal()
  }

  sendData() {
    return this.props.parentCallback(this.state.data)
  }
 
  render() {
    const { full_name, company_name, address, email } = this.state.data
    return (
      <div>
        {localStorage.token && <button onClick={this.openModal}>Add client to invoice</button>}
        {!localStorage.token && <Link to='/login'><button>Login to create a client</button></Link>}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <div className='ModalWrapper'>
            <div className='clientNewForm'>
              <h3 ref={subtitle => this.subtitle = subtitle}>Add Client</h3>
              <div>
                <label>Full Name</label>
                <input
                  placeholder='John Wick'
                  name='full_name'
                  onChange={this.handleChange}
                  value={full_name}
                />
              </div>
              <div>
                <label>Company Name</label>
                <input
                  placeholder='Parabellum'
                  name='company_name'
                  onChange={this.handleChange}
                  value={company_name}
                />
              </div>
              <div>
                <label>Address</label>
                <input
                  placeholder='Continental Hotel, NYC'
                  name='address'
                  onChange={this.handleChange}
                  value={address}
                />
              </div>
              <div>
                <label>Email<span>*</span></label>
                <input
                  placeholder='jw@BabaYaga.co'
                  name='email'
                  onChange={this.handleChange}
                  value={email}
                />
              </div>
              <button type='submit' onClick={this.handleSubmit}>Add Client</button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
 
export default NewClientModal