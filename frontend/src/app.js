console.log('hello world')
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.scss'

import InvoicesIndex from './components/invoices/InvoicesIndex'
import UserProfile from './components/users/UserProfile'
import InvoiceShow from './components/invoices/InvoiceShow'
import InvoiceNew from './components/invoices/InvoiceNew'

const App = () => (
  <BrowserRouter>
    <main>
      <Switch>
        <Route path = '/invoices/new' component={InvoiceNew} />
        <Route path = '/invoices/:id' component={InvoiceShow} />
        <Route path = '/invoices' component={InvoicesIndex} />
        <Route path = '/profile/:id' component={UserProfile} />
      </Switch>
    </main>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)