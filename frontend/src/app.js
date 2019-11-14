console.log('hello world')
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import InvoicesIndex from './components/invoices/InvoicesIndex'
import UserProfile from './components/users/UserProfile'
import InvoiceShow from './components/invoices/InvoiceShow'

const App = () => (
  <BrowserRouter>
    <main>
      <Switch>
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