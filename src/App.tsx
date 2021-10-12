import { Provider } from 'react-redux'

// import app from './firebase'
import store from './store'
import Router from './router'

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default App
