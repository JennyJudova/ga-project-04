import React from 'react'
import axios from 'axios'

class UserProfile extends React.Component {
  constructor() {
    super()

    this.state = {
      profile: null
    }
    
  }

  componentDidMount() {
    const profileId = this.props.match.params.id
    axios.get(`/api/profile/${profileId}`)
      .then(res => console.log(res))
      .catch(err => console.log(err.config))
  }

  render() {
    console.log(this.state)
    return (
      <h1>Profile Page</h1>
    )
  }
}

export default UserProfile