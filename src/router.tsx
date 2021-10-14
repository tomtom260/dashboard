import Home from './Pages/Home'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AddService from './Pages/add-service'
import Navigation from './components/Navigation'
import Details from './Pages/Details'
import EditService from './Pages/edit-service'
import InquriesPage from './Pages/inquries-page'
import NotFoundPage from './Pages/not-found_page'
import SignUp from './Pages/signup'
import SignIn from './Pages/signin'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Footer from './components/Footer'
import { useContext, useEffect } from 'react'
import { UIContext } from './utils/UIProvider'
import { fetchInquiries } from './store/actions/inquiries'
import { AuthContext } from './utils/AuthProvider'

function Router() {
  const { toggleLoadingState, incCountInquiries } = useContext(UIContext)
  const { user } = useContext(AuthContext)

  const dispatch = useDispatch()
  useEffect(() => {
    if (user) {
      toggleLoadingState(true)
      dispatch(fetchInquiries(user!, incCountInquiries))
      toggleLoadingState(false)
    }
  }, [user])

  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <PrivateRoute path='/add-service' component={AddService} />
        <PrivateRoute path='/' exact component={Home} />
        <PrivateRoute path='/details/:id' exact component={Details} />
        <PrivateRoute path='/edit/:id' exact component={EditService} />
        <PrivateRoute path='/inquiry' exact component={InquriesPage} />
        <PublicRoute path='/signup' exact component={SignUp} />
        <PublicRoute path='/signin' exact component={SignIn} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default Router
