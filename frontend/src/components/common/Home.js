import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <div className='homeWrapper'>
    <main className='hero'>
      <h1 className='homeTitle'>Invoicer</h1>
      <div className='about'>
        <h5>Take control of your finaces.</h5>
        <h6>Create your invoice.</h6>
      </div>
      <div className='homeButtons'>
        {!localStorage.token && <Link to='/login'><button>Login</button></Link>}
        {!localStorage.token && <Link to='/register'><button>Register</button></Link>}
        {localStorage.token && <Link to='/invoices/new'><button>Create you Invoice</button></Link>}
      </div>
    </main>
  </div>
)

export default Home