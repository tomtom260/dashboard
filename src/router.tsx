import Home from './Pages/Home'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AddService from './Pages/add-service'
import Navigation from './components/Navigation'
import Details from './Pages/Details'
import EditService from './Pages/edit-service'
import InquriesPage from './Pages/inquries-page'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchServices } from './store/actions/services'

function Router() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchServices)
  }, [dispatch])

  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path='/add-service' component={AddService} />
        <Route path='/' exact component={Home} />
        <Route path='/details/:id' exact component={Details} />
        <Route path='/edit/:id' exact component={EditService} />
        <Route path='/inquiry' exact component={InquriesPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
