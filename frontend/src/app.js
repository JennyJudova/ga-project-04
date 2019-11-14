console.log('hello world')
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import InvoicesIndex from './components/invoices/InvoicesIndex'

const App = () => (
  <BrowserRouter>
    <main>
      <Switch>
        <Route path = "/invoices" component={InvoicesIndex} />
      </Switch>
    </main>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)