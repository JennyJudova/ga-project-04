import React from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Auth from '../../lib/Auth'
 
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
 
class UserEditModal extends React.Component {
  constructor() {
    super()
 
    this.state = {
      modalIsOpen: false,
      data: {}, 
      errors: {}
    }
 
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  //React for User Profile Modal Form 
  componentDidMount() {
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState( { data: res.data }))
      .catch(err => console.log(err.config))
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
    this.closeModal()
  }

 
  render() {
    const { data } = this.state    
    return (
      <div>
        {localStorage.token && <button onClick={this.openModal}>Update your information</button>}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <div className='profileWrapper'>
            <form>
              <h3 ref={subtitle => this.subtitle = subtitle}>Update your information</h3>
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
          </div>
          <button type='submit' onClick={this.handleSubmit}>Add Client</button>
        </Modal>
      </div>
    )
  }
}
 
export default UserEditModal