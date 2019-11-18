console.log('hello world')
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.scss'

import Navbar from './components/common/Navbar'
import InvoicesIndex from './components/invoices/InvoicesIndex'
import UserProfile from './components/users/UserProfile'
import InvoiceShow from './components/invoices/InvoiceShow'
import InvoiceNew from './components/invoices/InvoiceNew'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

const App = () => (
  <BrowserRouter>
    <main>
      <Navbar/>
      <Switch>
        <Route path = '/invoices/new' component={InvoiceNew} />
        <Route path = '/invoices/:id' component={InvoiceShow} />
        <Route path = '/invoices' component={InvoicesIndex} />
        <Route path = '/profile' component={UserProfile} />
        <Route path = '/register' component={Register} />
        <Route path = '/login' component={Login} />
      </Switch>
    </main>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)