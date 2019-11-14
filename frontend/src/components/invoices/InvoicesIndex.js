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
    axios.get('api/invoices')
      .then(res => console.log(res))
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





// componentDidMount() {
//   Axios.get('https://cheesebored.herokuapp.com/cheeses')
//     .then(res => this.setState({ cheeses: res.data }))
//     .catch(err => console.log(err))
// }

// render() {
//   console.log(this.state)
//   if (!this.state.cheeses) return null
//   return (
//     <section className="section">
//       <div className="container">
//         <div className="columns is-mobile is-multiline">
//           {this.state.cheeses.map(cheese => (
//             <CheeseCard key={cheese._id} {...cheese} />
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
// }

// export default InvoicesIndex