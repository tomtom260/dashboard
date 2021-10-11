import React from 'react'
import Home from './Home'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AddService from './add-service'
import Navigation from './components/Navigation'

function App() {
  return (
    <>
      <BrowserRouter>
      <Navigation />
        <Switch>
          <Route path='/add-service' component={AddService} />
          <Route path='/' exact component={Home} />
          {/* <Route path="/" exact component={Home} /> */}
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
